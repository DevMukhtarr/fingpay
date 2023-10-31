import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fingerprint = new Schema({
    fingerprint_details: {type: String, default:null}
})

export default mongoose.model("Fingerprint", fingerprint)