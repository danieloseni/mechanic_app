import { MechanicDetails } from "interfaces/mechanic";

export type GetMechanicSuccessFunction = (mechanics: MechanicDetails[]) =>  void
export type GetMechanicFailedFunction = () =>  void