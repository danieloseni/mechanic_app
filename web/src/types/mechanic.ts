import { MechanicDetails } from "interfaces/mechanic";

export type GetMechanicSuccessFunction = (mechanics: MechanicDetails[]) =>  void
export type GetMechanicFailedFunction = () =>  void

export type SendRequestSuccessFunction = () =>  void
export type SendRequestFailedFunction = () =>  void

export type RejectRequestSuccessFunction = () =>  void
export type RejectRequestFailedFunction = () =>  void