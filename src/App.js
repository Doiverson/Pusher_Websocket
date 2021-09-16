import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './components/ChatList';
import ChatBox from './components/ChatBox';


function App() {

  const [ text, setText ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ chats, setChats ] = useState([]);

  useEffect(() => {
    const username = window.prompt('Username: ', 'Anonymous');
    setUsername(username);

    // Pusher initialize
    const pusher = new Pusher(process.env.REACT_APP_KEY, {
      cluster: 'us3',
      encrypted: true
    });

    // Subscribe a channel and bind an event to it
    const channel = pusher.subscribe('my-channel');
    channel.bind('my-event', data => {
      setChats([...chats, data]);
      setText('');
    });
  }, []);

  const handleTextChange = (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: username,
        message: text
      };
      axios.post('http://localhost:5000/message', payload);
    } else {
      setText(e.target.value);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Welcome to React-Pusher Chat</h1>
      </header>
      <section>
        <ChatList chats={chats} />
        <ChatBox
            text={text}
            username={username}
            handleTextChange={handleTextChange}
        />
      </section>
    </div>
  );
}

export default App;
