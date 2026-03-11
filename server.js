// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// ----------------------
// middleware
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'publish')));

// ----------------------
// SQLite database
// ----------------------
const db = new sqlite3.Database('./publish/data/fanpage.db');

// 建立資料表
db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      msg TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      option TEXT,
      ip TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

});

// ----------------------
// 留言 API
// ----------------------

// 取得留言（最新在前）
app.get('/api/messages', (req, res) => {
  db.all(
    "SELECT * FROM messages ORDER BY datetime(created_at) DESC",
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// 新增留言
app.post('/api/messages', (req, res) => {
  const { name, msg } = req.body;
  if (!msg) return res.status(400).json({ error: "留言不能為空" });

  db.run(
    `INSERT INTO messages (name, msg) VALUES (?, ?)`,
    [name || "Anonymous", msg],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

// 刪除留言（後台）
app.delete('/api/messages/:id', (req, res) => {
  const id = req.params.id;
  db.run(
    `DELETE FROM messages WHERE id=?`,
    [id],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// ----------------------
// 投票 API
// ----------------------

// 取得投票統計（前端）
app.get('/api/votes', (req,res)=>{
  db.all(
    "SELECT option, COUNT(*) as count FROM votes GROUP BY option",
    [],
    (err,rows)=>{
      if(err) return res.status(500).json({error:err.message});
      // 計算百分比
      const total = rows.reduce((sum,r)=>sum+r.count,0);
      const result = rows.map(r=>({
        option: r.option,
        count: r.count,
        percent: total ? Math.round(r.count/total*100) : 0
      }));
      res.json(result);
    }
  );
});

// 投票（前端限制一次 per IP）
app.post('/api/votes', (req,res)=>{
  const { option } = req.body;
  const ip = req.ip;
  if(!option) return res.status(400).json({error:"缺少投票選項"});

  // 檢查是否投過
  db.get(
    "SELECT * FROM votes WHERE ip=?",
    [ip],
    (err,row)=>{
      if(err) return res.status(500).json({error:err.message});
      if(row) return res.json({error:"你已經投過票"});
      
      db.run(
        "INSERT INTO votes(option,ip) VALUES(?,?)",
        [option, ip],
        function(err){
          if(err) return res.status(500).json({error:err.message});
          res.json({success:true});
        }
      );
    }
  );
});

// 取得所有投票（後台專用）
app.get('/api/votes/all', (req,res)=>{
  db.all(
    "SELECT * FROM votes ORDER BY datetime(created_at) DESC",
    [],
    (err, rows)=>{
      if(err) return res.status(500).json({error:err.message});
      res.json(rows);
    }
  );
});

// 刪除單筆投票（後台）
app.delete('/api/votes/:id', (req,res)=>{
  const id = req.params.id;
  db.run(
    "DELETE FROM votes WHERE id=?",
    [id],
    function(err){
      if(err) return res.status(500).json({error:err.message});
      res.json({success:true});
    }
  );
});

// ----------------------
// SPA fallback
// ----------------------
app.use((req, res, next) => {
  // 如果不是 /api 開頭的請求，就回傳 index.html
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'publish', 'index.html'));
  } else {
    next();
  }
});

// ----------------------
// start server
// ----------------------
app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}`);
});