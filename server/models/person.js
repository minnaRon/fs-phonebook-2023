const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, 'name length should be at least 3 chars'],
    required: [true, 'name missing'],
    unique: [true, 'name already exists, name have to be unique'],
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /^\d{2,3}-\d{5,}$/.test(v),
      message: (props) => `${props.value} not valid number`,
    },
    required: [true, 'user phonenumber required'],
  },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // eslint-disable-next-line no-param-reassign
    returnedObject.id = returnedObject._id.toString()
    // eslint-disable-next-line no-param-reassign
    delete returnedObject._id
    // eslint-disable-next-line no-param-reassign
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
