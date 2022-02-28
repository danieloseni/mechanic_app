class RegistrationCredentials{
    RegistrationCredentials({required this.firstname, required this.lastname, required this.email, required this.password, required this.phone, this.role="client" });

    final String firstname, lastname, email, password, phone;
    String role;


    Map<String,dynamic> toJson(){
        return <String,dynamic>{
            'email': email,
            'password': password,
            'phone':phone,
            'firstname':firstname,
            'lastname': lastname,
           
        };
      }
}