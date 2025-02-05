export interface User {
    id: number
    username: string
    email: string
    role: string
    accessToken: string
    refreshToken: any
    expirationTime: string
}
