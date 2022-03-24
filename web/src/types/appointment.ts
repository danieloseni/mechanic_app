import { Appointment } from "interfaces/appointment";

export type GetAppointmentsSuccessFunction = (appointments: Appointment[]) => void
export type GetAppointmentsFailedFunction = () => void

export type AddAppointmentsSuccessFunction = () => void
export type AddAppointmentsFailedFunction = () => void