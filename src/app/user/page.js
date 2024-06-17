'use client'
import { useEffect } from 'react';
import useWebSocket from '@/hooks/useWebSocket';

const SomeComponent = () => {
  const socket = useWebSocket('wss://kirihare-api.jp/io/');

  const sendMessage = (msg) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (e) => {
        console.log('Message from server ', e.data);
      };
    }
  }, [socket]);

  return (
    <div>
      <button onClick={() => sendMessage('Hello Server!')}>Send Message</button>
    </div>
  );
};

export default SomeComponent;