import { ApiClient } from "@/api/ApiClient";
import { AuthResponse } from "@/types/api/auth.api";
import { ApiResponse } from "@/types/api/common.api";
import { LoginSchema } from "@/types/schemas/auth/LoginSchema";
import { SignupForm } from "@/types/schemas/auth/SignupSchema";
import axios, { AxiosInstance } from "axios";

export class AuthService {
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

}