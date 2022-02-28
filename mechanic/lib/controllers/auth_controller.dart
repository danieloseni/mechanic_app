import '../../adapters/database/user.dart';
import '../../adapters/dio_client.dart';
import '../../models/registration_credentials.dart';
import '../../models/user.dart';
import 'package:dio/dio.dart';

import '../models/login_credentials.dart';
import '../urls.dart';

class AuthController{
    AuthController._();

    static login(LoginCredentials credentials, {required void Function() onSuccess, required void Function()? onFailed, void Function()? onTimeout} ) async {

        onSuccessful(Response<dynamic> response) async{
        
         await  UserDBHelper().save(User.fromJson(response.data));
         onSuccess();
        }

        onError(Response<dynamic> response){
          print(response);
          if(response.statusCode == 401){
            onFailed?.call();

          }
        }
        onTimedout(value){
          onTimeout?.call();
        }

        onNoNetworkConnection(){
          onTimeout?.call();
        }

        DioClient(onError: onError, onSuccess: onSuccessful, onTimeout: onTimedout, onNoNetworkConnection: onNoNetworkConnection, url: loginuser).post(credentials.toJson());
    }

    static register(RegistrationCredentials credentials, {required void Function() onSuccess, required void Function()? onFailed, void Function()? onTimeout} ){

        onSuccessful(Response<dynamic> response)async{
          print('success');
          await  UserDBHelper().save(User.fromJson(response.data));
          onSuccess();
        }
        onError(Response<dynamic> response){
          print('an error occured');
          onFailed?.call();
        }
        onTimedout(value){}
        onNoNetworkConnection(){}

        DioClient(onError: onError, onSuccess: onSuccessful, onTimeout: onTimedout, onNoNetworkConnection: onNoNetworkConnection, url: registeruser).post(credentials.toJson());

    }
}