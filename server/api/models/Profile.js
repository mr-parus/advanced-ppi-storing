import _ from 'lodash';
import mongoose from 'mongoose';
import validator from 'validator';

const Profile = new mongoose.Schema({
  country: {
    type: String,
    validate: [validator.isISO31661Alpha2, 'Invalid country'],
    trim: true,
    uppercase: true,
    required: [true, 'Country is required']
  },
  distributorId: {
    type: Number,
    required: true
  },
  email: {
    lowercase: true,
    validate: [validator.isEmail, 'Please fill a valid email address'],
    required: 'Email address is required',
    trim: true,
    type: String
    // impossible to use unique index while sharding
    // https://docs.mongodb.com/manual/reference/limits/#limit-sharding-unique-indexes
    // unique: true
  },
  fullName: {
    type: String,
    required: true
  }
});

Profile.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => ({ ..._.omit(ret, ['__v', '_id', 'name']), id: ret._id.toString() })
});

export default mongoose.model('Profiles', Profile);
