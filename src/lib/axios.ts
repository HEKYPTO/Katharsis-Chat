import Axios from "axios";

const axios = Axios.create({
    baseURL : "https://chat-server-99-4dddce891e1d.herokuapp.com/"
});

export async function userSignup(userName: string, userPassword: string) {
    try {
        const response = await axios.post(`/signup`, {
            username: userName,
            password: userPassword
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status !== 200) {
            console.log(response);
            console.log(userName, userPassword);
            throw new Error("Failed to log in");
        }

        // Assuming the token is stored in the response data under the key 'token'
        const token = response.data.token;

        // Set the token to localStorage, sessionStorage, or any other storage mechanism as needed
        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        console.error("Error during Signup:", error);
        throw error;
    }
}

export async function userLogin(userName: string, userPassword: string) {
    try {
        const response = await axios.post(`/login`, {
            username: userName,
            password: userPassword
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status !== 200) {
            console.log(response);
            console.log(userName, userPassword);
            throw new Error("Failed to log in");
        }

        // Assuming the token is stored in the response data under the key 'token'
        const token = response.data.token;

        // Set the token to localStorage, sessionStorage, or any other storage mechanism as needed
        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        console.error("Error during Signup:", error);
        throw error;
    }
}

export async function userLogout() {
    try {
        const response = await axios.post('/login', {}, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.status !== 200) {
            console.log(response);
            throw new Error("Failed to log out");
        }

        // Clear the token from localStorage
        localStorage.setItem('token', '');

        return response.data;
    } catch (error) {
        console.error("Error during Signup:", error);
        throw error;
    }
}

export async function createRoom(roomname: string, roomtype: string, member: string) {
    try {
        const response = await axios.post(`/create-room`, {
            room_name : roomname,
            room_type : roomtype,
            members : member
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status !== 200) {
            console.log(response);
            console.log(roomname, roomtype, member);
            throw new Error("Failed to create room");
        }

        return response.data;
    } catch (error) {
        console.error("Error during create room:", error);
        throw error;
    }
}

export async function getRoomInformation(roomId: string) {
    try {
        const response = await axios.get(`/rooms/${roomId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`, 
            }
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error("Failed to fetch room information");
        }
    } catch (error) {
        console.error("Error fetching room information:", error);
        throw error;
    }
}

export async function getAllFriends() {
    try {
        const response = await axios.get(`/friends`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`, 
            }
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error("Failed to fetch friends information");
        }
    } catch (error) {
        console.error("Error fetching friends information:", error);
        throw error;
    }
}

export async function getAllPublicGroups() {
    try {
        const response = await axios.get(`/rooms_list/PublicGroup`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`, 
            }
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error("Failed to fetch PublicGroup information");
        }
    } catch (error) {
        console.error("Error fetching PublicGroup information:", error);
        throw error;
    }
}

export async function getAllPrivateGroups() {
    try {
        const response = await axios.get(`/rooms_list/PrivateGroup`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`, 
            }
        });

        if (response.status === 200) {
            return response.data; 
        } else {
            throw new Error("Failed to fetch PublicGroup information");
        }
    } catch (error) {
        console.error("Error fetching PublicGroup information:", error);
        throw error;
    }
}

export async function Addmember(roomId: string, Username: string) {
    try {
        const response = await axios.post(`/rooms/${roomId}/add_member/${Username}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status !== 200) {
            console.log(response);
            console.log(roomId, Username);
            throw new Error("Failed to add member");
        }

        return response.data;
    } catch (error) {
        console.error("Error during add member:", error);
        throw error;
    }
}

export async function Removemember(roomId: string, Username: string) {
    try {
        const response = await axios.post(`/rooms/${roomId}/remove_member/${Username}`, {}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status !== 200) {
            console.log(response);
            console.log(roomId, Username);
            throw new Error("Failed to remove member");
        }

        return response.data;
    } catch (error) {
        console.error("Error during remove member:", error);
        throw error;
    }
}

export function isLoggedIn() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        return token !== null && token !== '';
    }
    return false;
}

