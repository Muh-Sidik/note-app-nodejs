const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBToModel } = require('../../utils');

class NoteService {
  #pool;

  constructor() {
    this.#pool = new Pool();
  }

  async getNotes() {
    const result = await this.#pool.query('SELECT * FROM notes');

    return result.rows.map(mapDBToModel);
  }

  async addNote({ title, tags, body }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO notes VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, title, tags, body, createdAt, updatedAt],
    };

    const result = await this.#pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getNoteById(id) {
    const query = {
      text: 'SELECT * FROM notes WHERE id = $1',
      values: [id],
    };

    const result = await this.#pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }

  async editNoteById(id, { title, tags, body }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: 'UPDATE notes SET title = $1, tags = $2, body = $3, updated_at = $4 WHERE id = $5 RETURNING title, tags, body',
      values: [title, tags, body, updatedAt, id],
    };

    const result = await this.#pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    return result.rows[0];
  }

  async deleteNoteById(id) {
    const query = {
      text: 'DELETE FROM notes WHERE $1 RETURNING id',
      values: [id],
    };

    const result = await this.#pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = NoteService;
