import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

// SQLite 데이터베이스 설정
const db = new sqlite3.Database('./simracing.db');

// 테이블 생성
db.run(`CREATE TABLE IF NOT EXISTS scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  league TEXT,
  circuit TEXT,
  player TEXT,
  score INTEGER,
  completed BOOLEAN
)`);

// API 라우트
app.post('/api/scores', (req, res) => {
  const { league, circuit, player, score, completed } = req.body;
  db.run(
    'INSERT INTO scores (league, circuit, player, score, completed) VALUES (?, ?, ?, ?, ?)',
    [league, circuit, player, score, completed],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.get('/api/scores', (req, res) => {
  const { league } = req.query;
  const query = league
    ? 'SELECT * FROM scores WHERE league = ? ORDER BY score DESC'
    : 'SELECT * FROM scores ORDER BY score DESC';
  
  db.all(query, league ? [league] : [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/leagues', (req, res) => {
  db.all('SELECT DISTINCT league FROM scores', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows.map(row => row.league));
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});