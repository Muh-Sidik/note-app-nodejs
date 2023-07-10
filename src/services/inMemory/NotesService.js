const { nanoid } = require('nanoid');

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
      throw new Error('Catatan gagal ditambahkan');
    }

    return id;
  }

  async getNoteByid(id) {
    const note = this.#notes.filter((n) => n.id === id)[0];

    if (!note) {
      throw new Error('Catatan tidak ditemukan');
    }

    return note;
  }

  async editNoteById(id, { title, tags, body }) {
    const index = this.#notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error('Gagal memperbarui catatan. Id tidak ditemukan');
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
      throw new Error('Gagal menghapus catatan. Id tidak ditemukan');
    }

    this.#notes.splice(index, 1);
  }
}

module.exports = NoteService;
