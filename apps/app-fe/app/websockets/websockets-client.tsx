'use client';
import { io, type Socket } from 'socket.io-client';

import { useEffect, useState } from 'react';

const wsServerUrl =
  process.env['NEXT_PUBLIC_WS_SERVER_URL'] || 'http://localhost:12222';

console.log({ wsServerUrl });
export const WebsocketsClient = () => {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    try {
      console.log('establish connection');
      const s = io(wsServerUrl);
      console.log(s);
      if (s) {
        setSocket(s);
        s.on('from-server', (payload) => {
          console.log('got message from server', payload);
        });
        s.on('connect', () => {
          console.log('connected');
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const onSend = () => {
    if (!socket) return;
    socket.emit('events', 'test', (val: unknown) => {
      console.log('got response', val);
    });
  };

  return (
    <div>
      Hello websockets
      <button disabled={!socket} onClick={onSend}>
        Send
      </button>
    </div>
  );
};
