import { UserInfo } from "interfaces/authentication"

export interface UserState{
    token?: string
}

export interface AddUserPayload{
    details: UserInfo

}