const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide note Title'],
    maxlength: 50,
  },
  content: {
    type: String,
    required: [true, "Please provide content for your note"],
    maxlength: 100,
  },

  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: `User`,
    requred: [true, 'Please privide user'],
  },
},
  { timestamps: true }
)

module.exports = mongoose.model('Note', NoteSchema)