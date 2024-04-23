import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (backendUrl: string): Socket | null => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!backendUrl) return;

    const socket = io(backendUrl);

    socketRef.current = socket;

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [backendUrl]);

  return socketRef.current;
};

export default useSocket;
