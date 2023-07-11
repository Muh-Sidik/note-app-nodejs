const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class NoteService {
  #notes;

  constructor() {
    this.#notes = [];
  }

  async getNotes() {
    return this.#notes;
  }

  async addNote({ title, tags, body }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this.#notes.push(newNote);

    const isSuccess = this.#notes.filter((note) => note.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }

    return id;
  }

  async getNoteById(id) {
    const note = this.#notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }

    return note;
  }

  async editNoteById(id, { title, tags, body }) {
    const index = this.#notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }

    const updatedAt = new Date().toISOString();

    this.#notes[index] = {
      ...this.#notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  async deleteNoteById(id) {
    const index = this.#notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new NotFoundError('Gagal menghapus catatan. Id tidak ditemukan');
    }

    this.#notes.splice(index, 1);
  }
}

module.exports = NoteService;
