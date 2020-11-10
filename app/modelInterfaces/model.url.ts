import { Document, Schema, model } from 'mongoose';
import * as shortId from 'shortid';

export interface IUrl extends Document {
    url: string;
    short?: string;
}

export const schema = new Schema({
    url: { type: String, required: true },
    short: { type: String, required: true, default: shortId.generate}
});

const Url = model<IUrl>('Url', schema);
export default Url;