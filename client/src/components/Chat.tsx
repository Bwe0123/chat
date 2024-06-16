import React, { useState } from 'react';
interface ChatProps {
  username: string;
  onSendMessage: (data: { username: string; message: string }) => Promise<void>;
}
const Chat: React.FC<ChatProps> = ({ username, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]); 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSendMessage({ username, message });
    setMessages([...messages, `${username}: ${message}`]); 
    setMessage('');
  };
  return (
    <div>
      <h2>Chat</h2>
      <div style={{ border: '1px solid black', minHeight: '200px', padding: '10px', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;


