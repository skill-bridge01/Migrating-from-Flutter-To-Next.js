// hooks/useWebSocket.js

import { useState, useEffect } from 'react';

const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log('WebSocket Connected');
    };

    webSocket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    setSocket(webSocket);

    return () => {
      webSocket.close();
    };
  }, [url]);

  return socket;
};

export default useWebSocket;