const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
let portfolios = [
  { id: 1, title: 'Project A', description: 'Deskripsi A' },
  { id: 2, title: 'Project B', description: 'Deskripsi B' }
];

let messages = [];

// === ROUTES ===

// GET info untuk endpoint kontak
app.get('/api/contact', (req, res) => {
  res.send('Gunakan metode POST untuk mengirim pesan ke /api/contact');
});

// POST untuk menyimpan pesan kontak
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Lengkapi semua field' });
  }

  messages.push({ name, email, message, date: new Date() });
  res.status(201).json({ message: 'Pesan berhasil dikirim' });
});

// GET semua pesan dari user
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// Ambil semua data portfolio
app.get('/api/portfolios', (req, res) => {
  res.json(portfolios);
});

// Tambah proyek baru
app.post('/api/portfolios', (req, res) => {
  const { title, description } = req.body;
  const newProject = {
    id: portfolios.length + 1,
    title,
    description
  };
  portfolios.push(newProject);
  res.status(201).json(newProject);
});

// Update proyek berdasarkan ID
app.put('/api/portfolios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description } = req.body;
  const index = portfolios.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Proyek tidak ditemukan' });

  portfolios[index] = { ...portfolios[index], title, description };
  res.json(portfolios[index]);
});

// Hapus proyek berdasarkan ID
app.delete('/api/portfolios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  portfolios = portfolios.filter(p => p.id !== id);
  res.json({ message: 'Proyek dihapus' });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
