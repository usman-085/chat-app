import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chat = () => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await axios.get('http://localhost:3001/messages');
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (sender && message) {
      await axios.post('http://localhost:3001/messages', { sender, message });
      setSender('');
      setMessage('');
      fetchMessages();
    }
  };

  return (
    <div>
      <h1>Chat Application</h1>
      <div>
        <input 
          type="text" 
          placeholder="Sender" 
          value={sender} 
          onChange={(e) => setSender(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Message" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}><strong>{msg.sender}:</strong> {msg.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Chat;