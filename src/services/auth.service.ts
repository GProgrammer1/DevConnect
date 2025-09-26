import { ApiClient } from "@/api/ApiClient";
import { AuthResponse } from "@/types/api/auth.api";
import { ApiResponse } from "@/types/api/common.api";
import { ForgotSchema } from "@/types/schemas/auth/ForgotSchema";
import { LoginSchema } from "@/types/schemas/auth/LoginSchema";
import { SignupForm } from "@/types/schemas/auth/SignupSchema";
import axios, { AxiosInstance } from "axios";

export class AuthService {
    async resetPassword(arg0: { token: string; newPassword: string; }) {
        return await this.axios!.patch(`/${this.prefix}/reset-password`, {token: arg0.token, newPassword: arg0.newPassword});
    }

    prefix = "auth";
    private axios: AxiosInstance | null = null;
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async signup(signupReq: Omit<SignupForm, "confirmPassword">) {
        return await this.axios!.post<AuthResponse>(`/${this.prefix}/signup`, signupReq);
    }

    async login(loginReq: LoginSchema) {
        return await this.axios!.post<AuthResponse>(`${this.prefix}/login`, loginReq);
    }

    async forgotPassword(forgotReq: ForgotSchema) {
        return await this.axios!.post<ApiResponse<null>>(`${this.prefix}/forgot-password`, forgotReq)
    }

}