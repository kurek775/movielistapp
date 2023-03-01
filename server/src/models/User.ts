import mongoose from 'mongoose'

const Schema = mongoose.Schema;
 // const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
   name: String,
   password: String,
   email: String
  
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;