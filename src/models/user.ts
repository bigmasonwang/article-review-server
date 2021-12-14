import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface IUser {
  userName: string;
  email: string;
  password: string;
  recievedArticles: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema({
  userName: String,
  email: String,
  password: { type: String, select: false },
  recievedArticles: [{ type: Schema.Types.ObjectId, ref: 'article' }],
});

const User = mongoose.model<IUser>('user', UserSchema);

export default User;
