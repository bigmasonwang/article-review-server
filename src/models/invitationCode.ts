import mongoose from 'mongoose';

interface IInvitationCode {
  code: string;
  used: boolean;
}

const InvitationCodeSchema = new mongoose.Schema({
  code: String,
  used: Boolean,
});

const InvitationCode = mongoose.model<IInvitationCode>(
  'invitation-code',
  InvitationCodeSchema
);

export default InvitationCode;
