const express = require('express');
const mysql = require('mysql');
const path = require('path');
const helmet = require('helmet');
const multer = require('multer');
const axios = require('axios'); // Untuk memverifikasi token Google
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Ganti dengan URL front-end Anda
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

// Koneksi database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'book',
});

// Daftar email yang memiliki role admin
const ADMIN_EMAILS = ['jasonsunaryo01@gmail.com']; // Ganti dengan daftar email admin yang valid

// Konfigurasi penyimpanan file dengan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Middleware untuk body parsing dan pengamanan
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(helmet());

// Fungsi untuk memverifikasi token Google
async function verifyGoogleToken(idToken) {
  try {
    // Mengirim permintaan POST ke Google untuk memverifikasi token
    const response = await axios.post(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    return response.data;
  } catch (error) {
    throw new Error('Token verification failed');
  }
}

// Endpoint untuk verifikasi token dan menentukan role
app.post('/api/auth/verify-token', async (req, res) => {
  const { token } = req.body;

  try {
    // Verifikasi token Google
    const userData = await verifyGoogleToken(token);

    // Tentukan role berdasarkan email
    const role = ADMIN_EMAILS.includes(userData.email) ? 'admin' : 'customer';

    res.json({
      name: userData.name,
      email: userData.email,
      role: role,
    });
  } catch (error) {
    res.status(400).send('Token verification failed');
  }
});

// Endpoint untuk menambahkan buku (dengan gambar)
app.post('/book_details', upload.single('image'), (req, res) => {
  const { name, genre, pages, prices } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  const sql =
    'INSERT INTO book_details (`name`, `genre`, `pages`, `prices`, `image`) VALUES (?, ?, ?, ?, ?)';
  const values = [name, genre, pages, prices, imagePath];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error(err); // Log error untuk debugging
      return res.json({ message: 'Something unexpected has occurred' });
    }
    return res.json({
      success: 'Book added successfully',
      data: { name, genre, pages, prices, imagePath },
    });
  });
});

// Endpoint untuk signup (registrasi pengguna baru)
app.post('/book_signup', (req, res) => {
  const { name, email, password } = req.body;

  // Cek apakah email sudah ada di database
  const checkEmailSql = 'SELECT * FROM book_login WHERE email = ?';
  db.query(checkEmailSql, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (result.length > 0) {
      // Email sudah ada
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Jika email belum ada, lanjutkan dengan pendaftaran
    const sql = 'INSERT INTO book_login (`name`, `email`, `password`) VALUES (?, ?, ?)';
    const values = [name, email, password];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something unexpected has occurred' });
      }
      return res.status(201).json({ message: 'Signup successful', data });
    });
  });
});

app.post('/book_login', (req, res) => {
  const sql = 'SELECT * FROM book_login WHERE `email` = ? AND `password` = ?';
  const values = [req.body.email, req.body.password];

  db.query(sql, values, (err, data) => {
    if (err) return res.json({ Status: "Error", message: "Server error" });
    
    if (data.length > 0) {
      const user = data[0];
      return res.json({
        Status: "Success",
        token: "your-generated-token", // You should generate a real token
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      return res.json({ Status: "Error", message: "Invalid credentials" });
    }
  });
});

// Endpoint untuk mendapatkan semua buku
app.get('/book', (req, res) => {
  const sql = 'SELECT * FROM book_details';
  db.query(sql, (err, result) => {
    if (err) return res.json({ message: 'Server error' });
    return res.json(result);
  });
});

// Endpoint untuk mendapatkan detail buku berdasarkan ID
app.get('/get_book/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM book_details WHERE `id` = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ message: 'Server error' });
    return res.json(result);
  });
});

// Endpoint untuk memperbarui buku
app.put('/update_book/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, genre, pages, prices } = req.body;
  let sql;
  let values;

  if (req.file) {
    // Jika ada gambar baru
    sql = 'UPDATE book_details SET `name` = ?, `genre` = ?, `pages` = ?, `prices` = ?, `image` = ? WHERE `id` = ?';
    values = [name, genre, pages, prices, req.file.filename, id];
  } else {
    // Jika tidak ada gambar baru
    sql = 'UPDATE book_details SET `name` = ?, `genre` = ?, `pages` = ?, `prices` = ? WHERE `id` = ?';
    values = [name, genre, pages, prices, id];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Something unexpected has occurred' });
    }
    return res.json({ success: 'Book updated successfully' });
  });
});


// Endpoint untuk membuat subscription plan baru
app.post('/book_subscription', (req, res) => {
  const { name, detail, prices } = req.body;

  const sql = 'INSERT INTO book_subscription (`name`, `detail`, `prices`, `created_at`) VALUES (?, ?, ?, NOW())';
  const values = [name, detail, prices];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error creating subscription:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to create subscription plan' 
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Subscription plan created successfully',
      data: {
        id: result.insertId,
        name,
        detail,
        prices
      }
    });
  });
});

// Endpoint untuk mendapatkan semua subscription plans
app.get('/book_subscription', (req, res) => {
  const sql = 'SELECT * FROM book_subscription ORDER BY created_at DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching subscriptions:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch subscription plans' 
      });
    }

    return res.json({
      success: true,
      data: results
    });
  });
});

// Endpoint untuk mendapatkan detail subscription plan berdasarkan ID
app.get('/book_subscription/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM book_subscription WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching subscription:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch subscription plan' 
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }

    return res.json({
      success: true,
      data: results[0]
    });
  });
});

// Endpoint untuk mengupdate subscription plan
app.put('/book_subscription/:id', (req, res) => {
  const { id } = req.params;
  const { name, detail, prices } = req.body;

  const sql = 'UPDATE book_subscription SET `name` = ?, `detail` = ?, `prices` = ? WHERE id = ?';
  const values = [name, detail, prices, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating subscription:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update subscription plan' 
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }

    return res.json({
      success: true,
      message: 'Subscription plan updated successfully',
      data: { id, name, detail, prices }
    });
  });
});

// Endpoint untuk menghapus subscription plan
app.delete('/book_subscription/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM book_subscription WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting subscription:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to delete subscription plan' 
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Subscription plan not found'
      });
    }

    return res.json({
      success: true,
      message: 'Subscription plan deleted successfully'
    });
  });
})


// Jalankan server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});