import mongoose from 'mongoose';

interface IUser {
  userName: string;
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const User = mongoose.model<IUser>('user', UserSchema);

export default User;
