class LoginCredentials{
      LoginCredentials({required this.email, required this.password});
      final String email, password;

      Map<String,dynamic> toJson(){
        return <String,dynamic>{
            'email': email,
            'password': password
        };
      }
    
}