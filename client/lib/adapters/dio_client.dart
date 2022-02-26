// import 'dart:convert';
// import 'dart:io';
import 'package:client/adapters/database/user.dart';
import 'package:client/controllers/auth_controller.dart';
import 'package:client/models/login_credentials.dart';

import '../models/user.dart';
import '../urls.dart';
import 'package:dio/dio.dart';
// import '../../controllers/authcontroller.dart';
// import '../database/user.dart';
// import '../../models/user.dart';


class DioClient{
    DioClient({ this.onError, this.onSuccess, this.onTimeout, this.onNoNetworkConnection, required this.url, this.authenticatedRequest = false});
    final dynamic Function(Response<dynamic> error)? onError;
    final dynamic Function(Response<dynamic> response)? onSuccess;
    final dynamic Function(dynamic error)? onTimeout;
    final Function? onNoNetworkConnection;
    final String url;
    final String baseUrl = baseurl;
    //final baseUrl = "https://google.com/app";
    final bool authenticatedRequest;
    String token = '';
    late Dio _dio;


    void onRequest(RequestOptions options, RequestInterceptorHandler handler){
      if(authenticatedRequest){
        options.headers['Authorization'] = 'Bearer $token';
       options.headers["Content-Type"] = 'application/json';
      //  options.headers["Content-Type"] = 'multipart/form-data; boundary=<calculated when request is sent>';
        
      }
    }

   Future<Dio> setUp() async{
        _dio = Dio();
        if(authenticatedRequest){
          final UserDBHelper userDBHelper = UserDBHelper();
          final User user = await userDBHelper.getUser();
          token = user.toMap()['token'].toString();
          _dio.options.headers['Authorization'] = 'Bearer $token';
        }
        

        _dio.interceptors.clear();

        _dio.interceptors.add(InterceptorsWrapper(
          onRequest: (RequestOptions options, RequestInterceptorHandler handler) => handler.next(options),
          onError: (DioError error,ErrorInterceptorHandler handler) async{
            if(error.type == DioErrorType.response && error.response?.statusCode == 401 && authenticatedRequest){
               final User user = await UserDBHelper().getUser();

               AuthController.login(LoginCredentials(email: user.email, password: user.password), onSuccess: (){
                  if(error.requestOptions.method == 'GET'){
                      get();
                  }else if(error.requestOptions.method == 'POST'){
                    rePost(error.requestOptions.data);
                  }
              }, onFailed: (){});

              handler.reject(error);
            }else{ 
                  handler.next(error);

            }
          },
          onResponse: (Response<dynamic> response, ResponseInterceptorHandler handler) => handler.next(response)
        ));
    _dio.interceptors
        .add(ApiInterceptors(onFailed: onError, onSuccess: onSuccess));
        _dio.options.followRedirects = false;

        _dio.options.validateStatus = (int? status) {
              return status! < 500 && status != 401;
            };
    _dio.options.baseUrl = baseUrl;
    // _dio.options.contentType = 'multipart/form-data; boundary=<calculated when request is sent>';

   return _dio;
    }

    

    Future<void> get() async{
      final Dio dio = await setUp();
      dio.get<Response<Map<String,dynamic>>>(url);
    }

    Future<void> post(Map<String,dynamic> data) async{
      
      final Dio dio = await setUp();
       print(data);
      try{
        // await dio.post<Response<Map<String,dynamic>>>(url, data: FormData.fromMap(data));
        await dio.post<Response<Map<String,dynamic>>>(url, data: data);

      }on DioError catch (err){

      }
      
      
    }
    Future<void> rePost(dynamic data) async{
      final Dio dio = await setUp();

      try{
        await dio.post<Response<Map<String,dynamic>>>(url, data:data);

      }on DioError catch (err){

      }
      
      
    }

}

class ApiInterceptors extends Interceptor {
  ApiInterceptors({required this.onSuccess, required this.onFailed});
  final dynamic Function(Response<dynamic>)? onSuccess;
  final dynamic Function(Response<dynamic>)? onFailed;

  @override
  Future<dynamic> onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    // handler.next(options);
    return super.onRequest(options, handler);
    //handler.
    //handler.next(options);
    // do something before request is sent
  }

  @override
  Future<dynamic> onError(DioError dioError, ErrorInterceptorHandler handler) async {
    if(dioError.response != null){
      onFailed?.call(dioError.response!);
    }
  
   // handler.next(dioError);
   // handler.resolve(response);
   // handler.reject(dioError);
   
    // do something to error
  }

  @override
  Future<dynamic> onResponse(Response<dynamic> response, ResponseInterceptorHandler handler) async {
      if(response.statusCode == 200){
        onSuccess?.call(response);
      }else{
        onFailed?.call(response);
      }
  }
}