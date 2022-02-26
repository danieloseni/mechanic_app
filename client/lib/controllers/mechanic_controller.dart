import 'package:client/adapters/dio_client.dart';
import 'package:client/models/mechanic_request.dart';
import 'package:client/urls.dart';
import 'package:dio/dio.dart';

import '../models/mechanic.dart';

class MechanicController {
  MechanicController._();

  static void getMechanics(
      {void Function(List<Mechanic> mechanics)? onSuccess,
      void Function()? onFailed}) {
    onSuccessful(Response<dynamic> response) {
      onSuccess?.call((response.data as List).map((mechanic){return Mechanic.fromJson(mechanic);}).toList());
    }

    onError(Response<dynamic> response) {
      onFailed?.call();
    }
    DioClient(
            url: getmechanics,
            onSuccess: onSuccessful,
            onError: onError,
            authenticatedRequest: true)
        .get();
  }

  static void requestMechanics(MechanicRequest request,
      {void Function()? onSuccess,
      void Function()? onFailed}) {
    onSuccessful(Response<dynamic> response) {
      
      onSuccess?.call();
    }

    onError(Response<dynamic> response) {
      onFailed?.call();
    }
    DioClient(
            url: sendrequest,
            onSuccess: onSuccessful,
            onError: onError,
            authenticatedRequest: true)
        .post(request.toJson());
  }
}
