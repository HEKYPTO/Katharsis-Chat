interface AddMemberResponse {
    message: string;
}

interface RemoveMemberResponse {
    message: string;
}

interface RoomMember {
    added_at: string;
    added_by: string;
    is_room_admin: boolean;
    room_id: string;
    username: string;
}