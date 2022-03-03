import { Job } from "interfaces/job"

export type CreateJobSuccessFunction = (jobId: string) =>  void
export type CreateJobFailedFunction = () =>  void

export type GetJobSuccessFunction = (jobs: Job[]) =>  void
export type GetJobFailedFunction = () =>  void