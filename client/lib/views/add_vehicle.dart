import 'package:client/controllers/vehicle_controller.dart';
import 'package:client/widgets/snackbars/snackbar_kit.dart';
import 'package:flutter/material.dart';

import '../models/vehicle.dart';

class AddVehicle extends StatefulWidget {
  const AddVehicle({ Key? key }) : super(key: key);

  @override
  _AddVehicleState createState() => _AddVehicleState();
}

class _AddVehicleState extends State<AddVehicle> {
  TextEditingController brand = TextEditingController(), make = TextEditingController(), model = TextEditingController(), plateNumber = TextEditingController(), color = TextEditingController();
  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: CustomScrollView(
            slivers: [
              const SliverAppBar(
                title:  Text("Add Vehicle")
              ),

               SliverList(
            delegate: SliverChildListDelegate(<Widget>[
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
              const Text(
                "Vehicle Brand",
              ),
              TextField(controller:brand),
            ],
          ),
         
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
            const  Text(
                "Make",
              ),
              TextField(controller: make),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
              const Text(
                "Model",
              ),
              TextField(controller: model,),]
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
            const  Text(
                "License Plate Number",
              ),
              TextField(controller: plateNumber,),]
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children:  [
            const  Text(
                "Color",
              ),
              TextField(controller: color,),]
          ),

          

          ElevatedButton(onPressed: loading ? null : addVehicle, 
          child: const Text("Done")),

         
        ]
        ))
    
            ],
        )
    );
  }

  addVehicle(){
    setState(() {
        loading = false;
    });

    onSuccess(){
      SnackBarKit.snackbarSuccess("Done", context);
      Navigator.pushReplacementNamed(context, "/");
    }
    onFailed(){
      SnackBarKit.snackbarError("Failed", context);
    }
      VehicleController.addVehicle(Vehicle(brand: brand.text, make: make.text, model: model.text, plateNumber: plateNumber.text, color: color.text), onSuccess: onSuccess, onFailed: onFailed);
  }

  @override
  void dispose() {
    brand.dispose();
    make.dispose();
    model.dispose();
    plateNumber.dispose();
    color.dispose();
    super.dispose();
  }
}