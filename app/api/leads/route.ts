import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAuth } from '@/lib/auth';

const ALLOWED_STATUSES = ['NEW', 'CONTACTED', 'INTERESTED', 'NEGOTIATION', 'CLOSED'];
const ALLOWED_ACTIONS = ['CALL', 'MESSAGE', 'CLOSE'];

export async function POST(req: NextRequest) {
  try {
    // 1. Verify User Authentication
    const authResult = await verifyAuth(req);
    
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = authResult;

    // 2. Read Request Body
    const body = await req.json();
    const { name, phone, status, notes, followUpDate, preferredAction, leadSource } = body;

    // 3. Validation Logic
    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: true, message: 'Name is required' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json(
        { error: true, message: 'Phone is required' },
        { status: 400 }
      );
    }

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: true, message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    if (!followUpDate) {
      return NextResponse.json(
        { error: true, message: 'Follow-up date is required' },
        { status: 400 }
      );
    }
    
    if (preferredAction && !ALLOWED_ACTIONS.includes(preferredAction)) {
      return NextResponse.json(
        { error: true, message: `Preferred action must be one of: ${ALLOWED_ACTIONS.join(', ')}` },
        { status: 400 }
      );
    }

    // 4. Connect to MongoDB
    await connectToDatabase();

    // 5. Create new Lead
    const newLead = await Lead.create({
      userId,
      name,
      phone,
      status,
      notes,
      followUpDate: new Date(followUpDate),
      preferredAction,
      leadSource,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 6. Return standard defined response
    return NextResponse.json(
      {
        message: 'Lead created',
        leadId: newLead._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add Lead Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // 1. Verify User Authentication
    const authResult = await verifyAuth(req);
    
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = authResult;

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Fetch all leads for the logged-in user, sorted by createdAt (newest first)
    const leads = await Lead.find({ userId }).sort({ createdAt: -1 });

    // 4. Map the response array formatted to strictly match requirements
    const formattedLeads = leads.map((lead) => ({
      leadId: lead._id.toString(),
      name: lead.name,
      phone: lead.phone,
      status: lead.status,
      followUpDate: lead.followUpDate,
      preferredAction: lead.preferredAction,
      leadSource: lead.leadSource,
      lastContacted: lead.lastContacted,
      createdAt: lead.createdAt,
    }));

    // 5. Return success array
    return NextResponse.json(formattedLeads, { status: 200 });
  } catch (error) {
    console.error('Get Leads Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
