
import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import MessageBox from "./UserMessage/messageBox";

interface messagePaneProp {
    message: Message[];
}

export default function MessagePane({ message }: messagePaneProp) {
    const msgRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [chatMessage, setChatMessage] = useState<Message[]>([]);

    useEffect(() => {
        const delay = setTimeout(() => {
        setIsLoading(false);
        }, 1000);

        return () => clearTimeout(delay);
    }, []);

    useEffect(() => {

        setChatMessage(message);

    }, [message])

    useLayoutEffect(() => {
        if (!isLoading && msgRef.current) {
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
        }
    }, [isLoading]);

    return (
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto ml-2" ref={msgRef}>
        {isLoading ? (
            <div>
                
            </div>
        ) : (
            <div className="mt-2">
                {chatMessage.map((single) => (
                    <div key={single.created_at}>
                        <MessageBox
                        username={single.sender}
                        datetime={single.created_at}
                        message={single.message}
                        />
                    </div>

                ))}
            </div>
        )}
        </div>
    );
}