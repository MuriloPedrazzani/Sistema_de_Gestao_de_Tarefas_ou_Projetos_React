import mysql from 'mysql2/promise';

const db = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mumu2704',
  database: 'tasks',
});

export default db;
