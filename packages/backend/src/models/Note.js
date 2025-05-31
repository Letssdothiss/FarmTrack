import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Referens till antingen en art eller en individ
  species: {
    type: String,
    enum: ['cattle', 'goat', 'poultry'],
    required: function() {
      return !this.individualId;
    }
  },
  individualId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Individual',
    required: function() {
      return !this.species;
    }
  }
}, {
  timestamps: true
});

// Index för snabbare sökningar
noteSchema.index({ userId: 1, species: 1 });
noteSchema.index({ userId: 1, individualId: 1 });

const Note = mongoose.model('Note', noteSchema);

export default Note; 