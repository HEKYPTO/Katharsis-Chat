interface Message {
    created_at: Date;
    message: string;
    sender: string;
}

interface ChatMessage {
    _id: string;
    chat_messages: Message[];
    created_at: string;
    created_by: string;
    name: string;
    type: string;
}