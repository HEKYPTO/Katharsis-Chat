import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import {io} from 'socket.io-client';

interface MessageInputProps {
    name: string;
    room: string;
    activate: () => void;
}

export default function MessageInput({ name, room, activate }: MessageInputProps) {

  const backURL: string = "https://chat-server-99-4dddce891e1d.herokuapp.com/";
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<any>(undefined);

  useEffect(() => {
    const socket = io(backURL, {transports: ['websocket']});

    socket.on("receive_message", (data) => {
      console.log(data);
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };

  }, []);

  const handleMessageSubmit = () => {
    if (message.trim()) {
      console.log({name, room, message});
      socket.emit('send_message', {
        username: name,
        room: room,
        message: message
      });

      setMessage(''); 
      activate();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-end pb-8">
      <div className="w-full max-w-md flex items-center ml-2">
        <label className="sr-only">Message</label>
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 block rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          placeholder="Type your message here..."
        />
        <button type="button" onClick={handleMessageSubmit} className="mx-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white p-2">
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
