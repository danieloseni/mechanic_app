import '../../controllers/auth_controller.dart';
import '../../models/login_credentials.dart';
import 'package:flutter/material.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController email = TextEditingController();
  TextEditingController password = TextEditingController();
  bool loading = false;
  String error = "";

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body:Container(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child:  CustomScrollView(
      slivers: [
        const SliverAppBar(title: Text("Login")),
        SliverList(
            delegate: SliverChildListDelegate(<Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
              const Text(
                "Email",
              ),
              TextField(controller: email)
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
              const Text(
                "Password",
              ),
              TextField(obscureText: true, controller: password)
            ],
          ),

          Visibility(
            visible: error != "",
            child: Container(
              margin: const EdgeInsets.symmetric(vertical: 10),
              child:  Text(error,
            style: const TextStyle(
                color: Colors.red
            )
          ),
          )),

          ElevatedButton(onPressed: loading? null : login, 
          child: const Text("Login"),
          
          ),

          Row(
            children:  [
                 Container(
                   margin: const EdgeInsets.only(right: 10),
                  child: const Text("Don't have an account ")
                ),

               InkWell(
                  child: const Text("Sign Up",
                    style: TextStyle(
                      color: Colors.red
                    )
                  ),
                  onTap: (){
                    Navigator.pushNamed(context, '/register');
                  },
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

  login(){
    setState(() {
      loading = false;
      error = "";
    });
    onFailed(){
      setState(() {
        loading = false;
        error = "Invalid email or password";
      });
    }

    onSuccess(){
      Navigator.pushReplacementNamed(context, "/");
    }
    AuthController.login(LoginCredentials(email: email.text, password: password.text), onSuccess: onSuccess, onFailed: onFailed);
  }






  ///dispose
  @override
  void dispose() {
    email.dispose();
    password.dispose();
    super.dispose();
  }
}

