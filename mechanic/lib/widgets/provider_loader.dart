import '../../adapters/database/user.dart';
import '../../models/user.dart';
import '../../providers/user.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class ProviderLoader extends StatefulWidget {
  final Widget child;
  const ProviderLoader({ Key? key, required this.child }) : super(key: key);

  @override
  _ProviderLoaderState createState() => _ProviderLoaderState();
}

class _ProviderLoaderState extends State<ProviderLoader> {
  @override
  void initState() {
    fetchUserDetails();    
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return widget.child;
  }

  void fetchUserDetails() async{
    User user =  await UserDBHelper().getUser();
    Provider.of<UserProvider>(context, listen: false).setUser(user);
  }
}