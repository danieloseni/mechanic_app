class RegistrationValidationError{
    RegistrationValidationError({this.firstname = "", this.lastname="", this.phone="", this.email="",this.password=""});
    String firstname, lastname, email, password, phone;

    set(String key, String value){
      if(key == "firstname"){
          firstname = value;
      }else if(key == "lastname"){
          lastname = value;
      }else if(key == "email"){
          email = value;
      }else if(key == "phone"){
          phone = value;
      }else if(key == "password"){
          password = value;
      }
    }

}