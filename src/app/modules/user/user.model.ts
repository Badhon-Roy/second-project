/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt'


const userSchema = new Schema<TUser>({
    id: { type: String, required: [true, 'Id is required'], unique: true },
    password: { type: String, required: [true, 'Password is required'] },
    needsPasswordChange: { type: Boolean, default: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'faculty', 'student'],
            message: '{VALUE} is not valid'
        }
    },
    status: {
        type: String,
        enum: {
            values: ['in-progress', 'blocked'],
            message: '{VALUE} is not valid'
        },
        default: 'in-progress'
    },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
})
userSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    )
    next();
})

userSchema.post('save', function(doc, next){
    doc.password = '';
    next();
})


export const  User = model<TUser>('User', userSchema);
