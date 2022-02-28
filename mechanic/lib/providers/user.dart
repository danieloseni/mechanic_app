import 'package:flutter/cupertino.dart';

import '../models/user.dart';

class UserProvider extends ChangeNotifier{
  late User user = User(firstname: "", lastname: "", email: "", phone: "", token: "");

    void setUser(User userInfo){
      user = userInfo;
      notifyListeners();
    }
}