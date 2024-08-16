const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const sequelize = new Sequelize('postgres://postgres:Usman_chatapp_@localhost:5432/chatapp', {
    dialect: 'postgres'
});

// Define model
const Message = sequelize.define('Message', {
  sender: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Sync database
sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Unable to sync database:', err));

// Routes
app.post('/messages', async (req, res) => {
  try {
    const { sender, message } = req.body;
    const newMessage = await Message.create({ sender, message });
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
     console.log(`Server is running on http://localhost:${port}`);
   });