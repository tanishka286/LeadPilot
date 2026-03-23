import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAuth } from '@/lib/auth';

const ALLOWED_STATUSES = ['NEW', 'CONTACTED', 'INTERESTED', 'NEGOTIATION', 'CLOSED'];
const ALLOWED_ACTIONS = ['CALL', 'MESSAGE', 'CLOSE'];

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Verify User Authentication via custom JWT verifier
    const authResult = await verifyAuth(req);
    
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = authResult;
    const leadId = params.id;

    if (!leadId) {
      return NextResponse.json(
        { error: true, message: 'Lead ID is required in URL' },
        { status: 400 }
      );
    }

    // 2. Read Request Body
    const body = await req.json();
    const { 
      name, 
      phone, 
      status, 
      notes, 
      followUpDate, 
      preferredAction, 
      leadSource, 
      lastContacted 
    } = body;

    // Optional validations for restricted enum enumerators
    if (status && !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: true, message: `Status must be one of: ${ALLOWED_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    if (preferredAction && !ALLOWED_ACTIONS.includes(preferredAction)) {
      return NextResponse.json(
        { error: true, message: `Preferred action must be one of: ${ALLOWED_ACTIONS.join(', ')}` },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB
    await connectToDatabase();

    // 4. Find the lead securing it dynamically tied to the authenticated JWT overlapping userId
    const lead = await Lead.findOne({ _id: leadId, userId });

    if (!lead) {
      return NextResponse.json(
        { error: true, message: 'Lead not found or unauthorized' },
        { status: 404 }
      );
    }

    // 5. Update lead fields dynamically mapping populated inputs strictly
    if (name !== undefined) lead.name = name;
    if (phone !== undefined) lead.phone = phone;
    if (status !== undefined) lead.status = status;
    if (notes !== undefined) lead.notes = notes;
    if (followUpDate !== undefined) lead.followUpDate = new Date(followUpDate);
    if (preferredAction !== undefined) lead.preferredAction = preferredAction;
    if (leadSource !== undefined) lead.leadSource = leadSource;
    if (lastContacted !== undefined) lead.lastContacted = new Date(lastContacted);

    // 6. Hard set the updatedAt timestamp
    lead.updatedAt = new Date();

    await lead.save();

    // 7. Return defined success mapping
    return NextResponse.json(
      { message: 'Lead updated' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update Lead Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1. Verify User Authentication via custom JWT verifier
    const authResult = await verifyAuth(req);
    
    if ('error' in authResult || !authResult.userId) {
      return NextResponse.json(
        { error: true, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { userId } = authResult;
    const leadId = params.id;

    if (!leadId) {
      return NextResponse.json(
        { error: true, message: 'Lead ID is required in URL' },
        { status: 400 }
      );
    }

    // 2. Connect to MongoDB
    await connectToDatabase();

    // 3. Find and Delete the Lead by ID matching the authenticated user
    const deletedLead = await Lead.findOneAndDelete({ _id: leadId, userId });

    // 4. Ensure lead was found and matched user
    if (!deletedLead) {
      return NextResponse.json(
        { error: true, message: 'Lead not found' },
        { status: 404 }
      );
    }

    // 5. Return standard predefined success response
    return NextResponse.json(
      { message: 'Lead deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete Lead Error:', error);
    return NextResponse.json(
      { error: true, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
