import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  userId: string;
  name: string;
  phone: string;
  status: 'NEW' | 'CONTACTED' | 'INTERESTED' | 'NEGOTIATION' | 'CLOSED';
  notes?: string;
  followUpDate: Date;
  lastContacted?: Date;
  preferredAction?: 'CALL' | 'MESSAGE' | 'CLOSE';
  leadSource?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['NEW', 'CONTACTED', 'INTERESTED', 'NEGOTIATION', 'CLOSED'],
  },
  notes: {
    type: String,
    required: false,
  },
  followUpDate: {
    type: Date,
    required: true,
  },
  lastContacted: {
    type: Date,
    required: false,
  },
  preferredAction: {
    type: String,
    required: false,
    enum: ['CALL', 'MESSAGE', 'CLOSE'],
  },
  leadSource: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
