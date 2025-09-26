export interface ApiResponse<T> {
    message: string;
    statusCode: number;
    payload?: T | null;
    error? : any;
}