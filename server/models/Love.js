import mongoose from 'mongoose';

const loveSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [1, 'Name must be at least 1 character'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  name2: {
    type: String,
    required: [true, 'Second name is required'],
    trim: true,
    minlength: [1, 'Name must be at least 1 character'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Index for faster queries
loveSchema.index({ createdAt: -1 });

const Love = mongoose.model('Love', loveSchema);

export default Love;
