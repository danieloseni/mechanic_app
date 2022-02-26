import 'package:client/providers/user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
class Home extends StatefulWidget {
  const Home({ Key? key }) : super(key: key);

  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Consumer<UserProvider>(builder: (BuildContext context, UserProvider user, Widget? child){
     return Scaffold(
        body: CustomScrollView(
          slivers: [
            SliverAppBar(
              flexibleSpace: Center(child:Container(
                margin: const EdgeInsets.only(left: 20),
                child: Text('Hello ${user.user.firstname}'),
              )),
            ),

            SliverList(delegate: SliverChildListDelegate([
              Align(
                  alignment: Alignment.center,
                  child: ElevatedButton(
                      child: const Text("Search For a Mechanic"),
                      onPressed: (){}
                  )
              ),

              
            ]),)
          ]
        )
    );
    });
  }
}