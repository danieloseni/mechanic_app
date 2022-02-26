import 'package:client/views/add_vehicle.dart';
import 'package:client/views/authentication/login.dart';
import 'package:client/views/authentication/register.dart';
import 'package:client/views/create_job.dart';
import 'package:client/views/home.dart';
import 'package:client/widgets/provider_loader.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/user.dart';

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
      initialRoute: "/add-job",
      routes: {
        '/': (context) => const ProviderLoader(child: Home()),
        '/login': (context) => const  Login(),
        '/register': (context) => const  Register(),
        '/add-vehicle': (context) => const ProviderLoader(child: AddVehicle()),
        '/add-job': (context) => const ProviderLoader(child: CreateJob())
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
