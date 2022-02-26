import 'package:client/adapters/dio_client.dart';
import 'package:client/urls.dart';
import 'package:dio/dio.dart';

class JobController{
  JobController._();
  
  static void addJob(String vehicleId, {void Function(String jobId)? onSuccess, void Function()? onFailed}){
    onSucessful(Response<dynamic> response){
      onSuccess?.call(response.data['_id']);
    }

    onError(Response<dynamic> response){

    }

      DioClient(url: addjob, authenticatedRequest: true, onSuccess: onSucessful, onError: onError).post({
        "vehicleId": vehicleId
      });
  }

}