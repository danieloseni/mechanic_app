import { Job } from "interfaces/job"

export type CreateJobSuccessFunction = (jobId: string) =>  void
export type CreateJobFailedFunction = () =>  void

export type GetJobSuccessFunction = (jobs: Job[]) =>  void
export type GetJobFailedFunction = () =>  void

export type MarkMetSuccessFunction = () =>  void
export type MarkMetFailedFunction = () =>  void

export type MarkDoneSuccessFunction = () =>  void
export type MarkDoneFailedFunction = () =>  void