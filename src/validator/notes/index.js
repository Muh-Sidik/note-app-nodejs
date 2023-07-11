const InvariantError = require('../../exceptions/InvariantError');
const { NotePayloadSchema } = require('./schema');

const NoteValidator = {
  validateNotePayload: async (payload) => {
    try {
      const value = await NotePayloadSchema.validateAsync(payload);

      return value;
    } catch (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = NoteValidator;
