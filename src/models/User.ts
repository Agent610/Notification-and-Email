import {Schema, model, Document} from "mongoose";

export interface IUser extends Document {
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trime: true,
        },
        password : {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>("User", userSchema);

export default User;