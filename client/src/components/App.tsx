import React, { useState } from 'react';
import Login from './Login';
import Chat from './Chat'; 
import '../App.css';
interface ChatProps {
  username: string;
  onSendMessage: (data: { username: string; message: string }) => Promise<void>;
}
const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async ({ username, password }: { username: string; password: string }) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setLoggedIn(true);
        setUsername(username);
      } else {
        const data = await response.text();
        setError(data);
      }
    } catch (error) {
      console.error('Login request failed:', error);
      setError('Ошибка при входе.');
    }
  };

  const handleSendMessage: ChatProps['onSendMessage'] = async ({ username, message }) => {
    try {
      await fetch('http://localhost:5000/api/users/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, message }),
      });
    } catch (error) {
      console.error('Send message request failed:', error);
      setError('Ошибка при отправке сообщения.');
    }
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loggedIn ? (
        <Chat username={username} onSendMessage={handleSendMessage} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
