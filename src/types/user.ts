interface User {
    username: string;
    password: string;
}

interface UserLoginResponse {
    token: string;
    username: string;
}

interface Friends {
    friends : string[];
}