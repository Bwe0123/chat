import { Schema, model, Document } from 'mongoose';

interface UserDoc extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<UserDoc>({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const User = model<UserDoc>('User', userSchema);
