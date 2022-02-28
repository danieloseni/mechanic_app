import { UserInfo } from "interfaces/authentication"

export type LoginSuccessFunction = (details: UserInfo) => void
export type LoginFailedFunction = () => void

export type RegisterSuccessFunction = (details: UserInfo) => void
export type RegisterFailedFunction = () => void