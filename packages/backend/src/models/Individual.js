import mongoose from 'mongoose';

const individualSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  idNumber: {
    type: String,
    required: false
  },
  animalType: {
    type: String,
    required: true,
    enum: ['cattle', 'goat', 'poultry']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: [{
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Individual = mongoose.model('Individual', individualSchema);

export default Individual; 