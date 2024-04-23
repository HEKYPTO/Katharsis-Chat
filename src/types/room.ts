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

