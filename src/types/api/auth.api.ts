import { UserRole } from "../db/enums";
import { ApiResponse } from "./common.api";

export type AuthResponse = ApiResponse<{
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    user: AuthProfile
}>;

export interface AuthProfile {
    user_id: string;
    email: string;
    username: string;
    name: string;
    user_roles: UserRole[]
};
