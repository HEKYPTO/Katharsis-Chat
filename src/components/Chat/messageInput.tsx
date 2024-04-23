"use client"

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import useSocket from "@/utils/useSocket";

interface MessageInputProps {
    name: string;
    room: string;
}

export default function MessageInput({ name, room }: MessageInputProps) {

  const backURL: string = "https://chat-server-99-4dddce891e1d.herokuapp.com/";

  const [message, setMessage] = useState<String>('');
  const socket = useSocket(backURL);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join_room', { name, room });

    socket.on('receive_message', (data) => {
      setMessage((prevMessages) => [...prevMessages, data]);
    });

    // socket.on('join_room_announcement', (data) => {
    // });

    // socket.on('leave_room_announcement', (data) => {
    // });

    return () => {
      socket.emit('leave_room', { name, room });
    };
  }, [socket, name, room]);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const formData = new FormData(e.target as HTMLFormElement);
    const message = formData.get('message') as string;
  
    if (message.trim()) {
      socket.emit('send_message', { name, room, message });
    }
    
    // Clear the input field after submitting
    setMessage('');
  };


  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center items-end pb-8">
      <div className="w-full max-w-md flex items-center ml-2">
        <label className="sr-only">Message</label>
        <input
          type="message"
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
