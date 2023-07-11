const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NoteValidator = {
  validateNotePayload: async (payload) => {
    try {
      await NotePayloadSchema.validateAsync(payload);
    } catch (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = NoteValidator;
