import { Schema, model, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

interface User extends Document {
    method: 'local' | 'google' | 'facebook',
    local: {
        email: string,
        password: string,
    },
    google: {
        id: string,
        email: string
    },
    facebook: {
        id: string,
        email: string
    }
    isValidPassword(password: string): boolean
}

const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        password: {
            type: String
        }
    },
    google: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true
        }
    },
})

userSchema.pre<User>('save', async function (next) {
    try {
        if (this.method !== 'local') next()
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(this.local.password, salt)
        this.local.password = hashedPass
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.local.password)
    } catch (err) {
        throw new Error(err)
    }
}

const User = model<User>('user', userSchema)

export default User