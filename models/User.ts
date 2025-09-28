import mongoose, { Schema, Document } from "mongoose"

export interface IUser extends Document {
  firstName?: string
  lastName?: string
  email: string
  password_hash: string
  role: "admin" | "doctor" | "patient"
  patientId?: string
  phone?: string
  dateOfBirth?: string
  gender?: string
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ["admin", "doctor", "patient"], required: true },
    patientId: { type: String, unique: true, sparse: true },
    phone: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
)

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
