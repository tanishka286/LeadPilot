import mongoose, { Schema, Document } from 'mongoose';

export interface IUserStats extends Document {
  userId: string;
  completedTasksToday: number;
  lastActiveDate: Date;
  streak: number;
}

const UserStatsSchema = new Schema<IUserStats>({
  userId: { type: String, required: true },
  completedTasksToday: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: Date.now },
  streak: { type: Number, default: 0 }
});

const UserStats = mongoose.models.UserStats || mongoose.model<IUserStats>('UserStats', UserStatsSchema);

export default UserStats;
