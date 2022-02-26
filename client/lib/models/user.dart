class User{
    User({required this.firstname, required this.lastname, required this.email, this.password="", required this.phone, required this.token, this.userId = ''});

    final String firstname, lastname, email,  phone, token, userId;
    String password;

    static fromJson(Map<String,dynamic> details){
      return User(
        firstname: details['firstname'], lastname: details['lastname'], email: details['email'], phone: details['phone'], token: details['jwt'], userId: details['id'] 
      );
    }

   Map<String,dynamic> toMap(){
      return {
          'firstname':firstname,
          'lastname':lastname,
          'email':email,
          'password': password,
          'phone': phone,
          'token': token,
          'userId': userId
      };
    }
}