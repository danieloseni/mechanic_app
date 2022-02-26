import 'package:client/models/vehicle.dart';
import 'package:client/urls.dart';
import 'package:dio/dio.dart';

import '../adapters/dio_client.dart';

class VehicleController{
    VehicleController._();

    static void addVehicle(Vehicle vehicleDetails, {void Function()? onSuccess, void Function()? onFailed}){
        onSuccessful(Response<dynamic> response){
            onSuccess?.call();
        }

        onError(Response<dynamic> response){
          onFailed?.call();
        }

       

        DioClient(onError: onError, onSuccess: onSuccessful, url: addcar, authenticatedRequest: true).post(vehicleDetails.toJson());
    }

    static void getVehicles({void Function(List<Vehicle> vehicles)? onSuccess, void Function()? onFailed}){
        onSuccessful(Response<dynamic> response){
          
            onSuccess?.call((response.data as List).map((vehicle) => Vehicle.fromJson(vehicle)).toList());
        }

        onError(Response<dynamic> response){

        }

       

        DioClient(onError: onError, onSuccess: onSuccessful, url: addcar, authenticatedRequest: true).get();
    }
}