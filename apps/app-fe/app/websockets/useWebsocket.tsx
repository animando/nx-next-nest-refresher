'use client';
import { io, type Socket } from 'socket.io-client';

import { useCallback, useEffect, useRef, useState } from 'react';

const wsServerUrl =
  process.env['NEXT_PUBLIC_WS_SERVER_URL'] || 'http://localhost:12222';

const isServer = () => !global.window;

const initSocket = () => {
  if (isServer()) return null;
  return io(wsServerUrl);
};

type Handler = (value: unknown) => void;
type HandlerMap = Record<string, Handler>;
type UseWebsocketConfig = {
  handlers?: HandlerMap;
  rooms?: string[];
};
export const useWebsocket = ({
  handlers,
  rooms,
}: UseWebsocketConfig): { connected: boolean } => {
  const socketRef = useRef<Socket | null>(null);
  const [socket, setSocket] = useState<Socket>();
  const [connected, setConnected] = useState<boolean>(false);

  const onConnect = useCallback(() => {
    setConnected(true);
  }, []);

  const onDisconnect = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.removeAllListeners();
    socket.on('connect', onConnect);
    setConnected(false);
  }, [onConnect]);

  useEffect(() => {
    if (socketRef.current) return;
    socketRef.current = initSocket();
    const socket = socketRef.current;
    if (socket) {
      setSocket(socket);
      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [onConnect, onDisconnect]);

  useEffect(() => {
    if (!socket || !connected) {
      return;
    }
    if (rooms?.length) {
      rooms.forEach((room) => {
        console.log(`joining room '${room}'`);
        socket.emit('joinRoom', { room });
      });
    }

    if (handlers) {
      Object.entries(handlers).forEach(([ev, handler]) => {
        console.log(`register event handler '${ev}'`);
        socket.on(ev, handler);
      });
    }
  }, [connected, socket, handlers, rooms]);

  return { connected };
};
