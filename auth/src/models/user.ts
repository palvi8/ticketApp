import mongoose from "mongoose";
import {Password} from "../services/password";

interface userAttrs {
    email: string,
    password: string
}

interface UserModal extends mongoose.Model<UserDoc>{
    build(attr: userAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}

const userScheme = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
},
{
    toJSON: {
        transform(doc, ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
},
);

userScheme.pre('save', async function(done) {

    if(this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed)
    }
    done();
    
})

userScheme.statics.build = (attr: userAttrs) => {
    return new User(attr)
}

const User = mongoose.model<UserDoc, UserModal>('User', userScheme);

export { User };