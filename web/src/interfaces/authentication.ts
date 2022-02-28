export interface LoginCredentials{
    email: string,
    password: string
}
export interface RegistrationCredentials{
    email: string,
    password: string
    firstname: string,
    lastname: string,
    phone: string,
}


export interface UserInfo{
    userId: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    token: string,
    role: string
}