interface DirectRoom {
    friends: string
}

interface GroupRoom {
    _id: string;
    name: string;
}

interface CreateRoomResponse {
    room_name: string;
    room_type: string;
    members: string;
}