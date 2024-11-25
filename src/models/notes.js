const db = require('../config/db');

const getAllNotes = () => {
  const SQLQuery = 'SELECT * FROM notes';

  return db.execute(SQLQuery);
};

const createNewNotes = (body) => {
  const SQLQuery = `INSERT INTO notes (title, content) VALUES (?, ?)`;
  return db.execute(SQLQuery, [body.title, body.content]);
};

const findNoteById = (idNote) => {
  const SQLQuery = `SELECT * FROM notes WHERE id = ?`;
  return db.execute(SQLQuery, [idNote]);
};

const updateNote = (body, idNote) => {
  const SQLQuery = `
      UPDATE notes
      SET title = ?, content = ?
      WHERE id = ?
    `;

  return db.execute(SQLQuery, [body.title, body.content, idNote]);
};

const deleteNote = async (idNote) => {
  const SQLQuery = 'DELETE FROM notes WHERE id = ?';
  try {
    const [result] = await db.execute(SQLQuery, [idNote]);
    return result;
  } catch (error) {
    console.error('Error deleting note:', error.message);
    throw error;
  }
};

module.exports = {
  getAllNotes,
  createNewNotes,
  updateNote,
  deleteNote,
  findNoteById,
};
