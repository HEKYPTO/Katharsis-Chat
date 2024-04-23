

const messageLong = `Amet nisi minim ipsum proident et elit esse. Enim nostrud tempor reprehenderit culpa est culpa sunt aliquip nostrud culpa exercitation sint est. Elit excepteur eiusmod aliquip labore anim. Et sit excepteur irure nisi exercitation eu aliqua ex aliquip amet enim labore ullamco. Commodo veniam sint tempor non. Esse aliqua qui ad consectetur ullamco commodo sunt. Ex duis eu ex Lorem laborum.

Aute in id magna excepteur adipisicing culpa sunt voluptate non et nisi excepteur exercitation labore. Ea proident ad veniam proident incididunt. Labore adipisicing id voluptate tempor enim ea.

Voluptate consequat enim ullamco labore ea nostrud. Nulla ad labore labore nulla sunt voluptate et aute. Minim ipsum eiusmod cillum nostrud aute consequat minim.

Pariatur consectetur deserunt adipisicing cillum est incididunt dolore aute eiusmod cupidatat consectetur duis cupidatat. Aute adipisicing excepteur qui in. In est dolor consectetur dolore non. Est eiusmod irure incididunt magna. Sit est sit fugiat anim incididunt est nisi est laboris sit anim amet excepteur adipisicing.

Sit ullamco adipisicing laboris ex sit exercitation adipisicing culpa anim ut commodo occaecat et commodo. Est quis veniam labore enim id irure pariatur nulla eu magna aliquip quis nostrud et. Eu tempor ad incididunt nisi. Qui non fugiat nulla qui do nisi sint. Nulla ipsum consectetur enim nostrud nostrud consequat adipisicing elit. Reprehenderit aliqua dolor eu nulla ad culpa culpa aliqua.

Ullamco eiusmod quis irure amet excepteur elit mollit velit veniam ea excepteur ut consectetur. Deserunt nulla deserunt culpa do deserunt qui. Cupidatat enim dolor aliquip sit labore quis proident eiusmod ex. Ea dolor irure aute consectetur eu velit sit reprehenderit. Voluptate enim est dolore irure ex.

Aliqua laborum quis quis commodo fugiat eu excepteur. Cupidatat fugiat anim voluptate sunt laborum reprehenderit veniam nisi cupidatat. Ullamco exercitation esse esse enim aute anim.

Lorem nulla excepteur aliqua sit cupidatat non pariatur dolor est elit. Ipsum dolore aute dolore voluptate id nisi nulla occaecat aliquip eu consequat consequat excepteur cupidatat. Excepteur voluptate esse sit ut laborum ea. Tempor nulla magna sint laborum Lorem qui fugiat enim amet exercitation ullamco aliquip non. Aute culpa aliqua dolore ad sint ut nostrud cupidatat commodo deserunt labore fugiat. Fugiat irure pariatur magna veniam. Adipisicing sint nulla fugiat ipsum irure dolor excepteur cupidatat ex consectetur id ullamco occaecat sit.

Ullamco nisi pariatur voluptate cupidatat ea ut aliqua nostrud duis duis. Deserunt cupidatat sit fugiat tempor minim velit id in aliquip ea elit. Pariatur quis amet laborum ullamco labore commodo elit adipisicing do. Laborum nisi consectetur aliquip eiusmod dolor tempor in tempor.

In laborum est duis commodo aliqua cupidatat Lorem ut in tempor cupidatat commodo. Voluptate irure labore dolor proident ad cupidatat aliquip cillum ea ullamco veniam id. Eu consectetur et reprehenderit ad irure exercitation in ad elit. Ex veniam dolore est in pariatur non quis.`;

import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import MessageBox from "./UserMessage/messageBox";

interface messagePaneProp {
    message: ChatMessage;
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

        if (!message) return;

        setChatMessage(message.chat_messages);

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
                    <MessageBox
                    key={single.created_at}
                    username={single.sender}
                    datetime={single.created_at}
                    message={single.message}
                    />
                ))}
            </div>
        )}
        </div>
    );
}