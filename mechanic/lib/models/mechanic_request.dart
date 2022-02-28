class MechanicRequest{
    MechanicRequest(this.mechanicId, this.jobId);
    final String mechanicId, jobId;

    Map<String,dynamic> toJson(){
        return {
          "mechanicId": mechanicId,
          "jobId": jobId 
        };
    }   
}