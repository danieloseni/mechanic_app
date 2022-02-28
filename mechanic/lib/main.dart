import 'package:flutter/material.dart';
import 'package:mechanic/providers/user.dart';
import 'package:mechanic/views/home.dart';
import 'package:mechanic/widgets/provider_loader.dart';
import 'package:provider/provider.dart';

import 'views/authentication/login.dart';
import 'views/authentication/register.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MultiProvider(providers: [
        ChangeNotifierProvider<UserProvider>(create: (BuildContext context) => UserProvider())
    ],
      child: MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Mechanic App',
      initialRoute: "/",
      routes: {
        '/': (context) => const ProviderLoader(child: Home()),
        '/login': (context) => const  Login(),
        '/register': (context) => const  Register(),
      
      },
      theme: ThemeData(
       
        primarySwatch: Colors.blue,
      ),
      // home: const MyHomePage(title: 'Flutter Demo Home Page'),
    )
      
    )
    
    ;
  }
}
