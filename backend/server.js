const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());  
app.use(cors({
  origin: 'http://localhost:3001', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));  

mongoose.connect('mongodb://localhost:27017/library', {
}).then(() => {
  console.log('Ket noi MongoDB thanh cong');
}).catch((err) => {
  console.error('Loi ket noi MongoDB:', err);
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server dang chay tai http://localhost:${port}`);
});
