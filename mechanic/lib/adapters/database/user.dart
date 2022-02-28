import 'package:sqflite/sqflite.dart';
import 'dart:async';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import '../../models/user.dart';



class UserDBHelper{
 static final UserDBHelper _dbHelper =  UserDBHelper._internal();
 String table = 'users';

 UserDBHelper._internal();

 factory UserDBHelper(){
   return _dbHelper;
 }


static  Database? _db;

Future<Database> get db async{
 
    _db ??= await initializeDb();
 

  return _db!;
}
 Future<Database> initializeDb() async{
    Directory dir = await getApplicationDocumentsDirectory();
    String path = dir.path + "mechanic_app_client.db";
    var dbTokens = await openDatabase(path, version: 1, onCreate: _createDb);
    //var messagesCreation = await openDatabase(path, version: 1, onCreate: _createMessagesTable);
    return dbTokens;
 }
 
 void _createDb(Database db, int newVersion) async{
   await db.execute(
     "CREATE TABLE $table(userId TEXT, firstname TEXT, lastname TEXT, email TEXT, phone TEXT, password TEXT, token TEXT)"
   );

 }


 Future<User> save(User user) async{
   print('save called');
   Database db = await this.db;
   await db.delete(
    table,
  
  );
  Map<String,dynamic> data = user.toMap();
  print(data);
  await db.insert(
    table,
    user.toMap(),
    conflictAlgorithm: ConflictAlgorithm.replace,
  );

    return await getUser();
 }
 
 Future<User> getUser() async{
    Database db = await this.db;
   
    final List<Map<String, dynamic>> userMap = await db.query(table);
    late User user;
    for(int i = 0; i < 1; i++){
      user = User(
        email: userMap[i]['email'].toString(),
        phone: userMap[i]['phone'].toString(),
        firstname: userMap[i]['firstname'].toString(),
        lastname: userMap[i]['lastname'].toString(),
        userId: userMap[i]['userId'].toString(),
        password: userMap[i]['password'].toString(),
        token: userMap[i]['token'].toString(),
      );
    }

    return user;
    

   
 }

 

 //List id = db.rawInsert("INSERT INTO $table($token) VALUES(?)", [theData]);
   //await db.insert(table, row());

  //  var del = await db.rawDelete("DELETE from $table where 1=1");
  //  int id = await db.rawInsert("INSERT INTO $table($token, $remain) VALUES(?, ?)", [theData, remains]);
  //  var response = await db.rawQuery("SELECT * from $table",null);
   
  // print("$del $id $response");

   //int id = await db.rawInsert("INSERT INTO $table($token) VALUES(?)", [theData]);
  
   //await db.insert(table, row());
}