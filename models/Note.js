const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide note Title'],
    minlength: 2,
    maxlength: 50,
  },
  content: {
    type: String,
    required: [true, "Please provide content for your note"],
    minlength: 5,
    maxlength: 1000,
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