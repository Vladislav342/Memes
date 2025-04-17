import mongoose, { Document, Schema } from 'mongoose';

export interface IMem extends Document {
  name: string;
  date: string;
  likes: number;
  link: string;
}

const memesSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  link: {
    type: String,
    required: true,
  },
});

const Mem = mongoose.models.Memes || mongoose.model<IMem>('Memes', memesSchema);

export default Mem;
