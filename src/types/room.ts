interface DirectRoom {
    friends: string
}

interface GroupRoom {
    _id: string;
    name: string;
}

interface CreateRoomResponse {
    room_id: string;
}

interface Room {
    _id: string;
    created_at: Date;
    created_by: string;
    name: string;
}

interface RoomInfo {
    room: Room;
    room_members: RoomMember[];
    username: string
}

interface ChatRoom {
    _id : string;
    chat_messages : Message[];
    created_at : string;
    created_by : string;
    name : string;
    type : string;
}

interface ViewRoomResponse {
    room : Room;
    room_members : RoomMember[];
    username : string;
}