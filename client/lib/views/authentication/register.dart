import 'package:client/controllers/auth_controller.dart';
import 'package:client/models/registration_validation_error.dart';
import 'package:flutter/material.dart';

import '../../models/registration_credentials.dart';

class Register extends StatefulWidget {
  const Register({ Key? key }) : super(key: key);

  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  TextEditingController firstname = TextEditingController(), lastname= TextEditingController(), email= TextEditingController(), password= TextEditingController(), phone = TextEditingController();
  bool loading = false;

  RegistrationValidationError validationErrors = RegistrationValidationError();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body:Container(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child:  CustomScrollView(
      slivers: [
        const SliverAppBar(title: Text("Register")),
        SliverList(
            delegate: SliverChildListDelegate(<Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
              const Text(
                "Firstname",
              ),
              TextField(controller:firstname),
              ErrorVisibility(validationErrors.firstname)
            ],
          ),
         
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
            const  Text(
                "Lastname",
              ),
              TextField(controller: lastname),
              ErrorVisibility(validationErrors.lastname)
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
              const Text(
                "Email",
              ),
              TextField(controller: email,),
              ErrorVisibility(validationErrors.email)
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
            const  Text(
                "Phone Number",
              ),
              TextField(controller: phone,),
              ErrorVisibility(validationErrors.phone)
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
            const  Text(
                "Password",
              ),
              TextField(obscureText: true, controller: password,),
              ErrorVisibility(validationErrors.password)
            ],
          ),

          

          ElevatedButton(onPressed: loading ? null : register, 
          child: const Text("Sign Up")),

          Row(
            children:  [
                 Container(
                   margin: const EdgeInsets.only(right: 10),
                  child: const Text("Already have an account? ")
                ),

                InkWell(
                 onTap: (){
                   Navigator.pushNamed(context, "/login");
                 },
                  child: const Text("Sign In",
                    style: TextStyle(
                      color: Colors.red
                    )
                  )
                )
            ]
          )

        ]
        ))
    
      ],
    )
        )
    );
 
  }

  register(){
    setState(() {
        loading = false;
    });
    onSuccess(){
      Navigator.pushReplacementNamed(context, '/');
    }

    onFailed(){
      print('registration failed');
    }

    AuthController.register(RegistrationCredentials(firstname: firstname.text, lastname: lastname.text, email: email.text, password: password.text, phone: phone.text), onSuccess: onSuccess, onFailed: onFailed);

  }



  //dispose
  @override
  void dispose() {
    firstname.dispose();
    lastname.dispose();
    email.dispose();
    password.dispose();
    phone.dispose();

    super.dispose();
  }
}


class ErrorVisibility extends StatelessWidget{
    const ErrorVisibility(this.error, {Key? key}):super( key:key);
  final String error;
    @override
    Widget build(BuildContext context){
      return Visibility(
        visible: error.isNotEmpty ,
          child: Text(error, style: const TextStyle(color: Colors.red))
      );
    }
}