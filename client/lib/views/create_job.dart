import 'package:client/controllers/job_controller.dart';
import 'package:client/controllers/vehicle_controller.dart';
import 'package:client/views/mechanic_selection.dart';
import 'package:flutter/material.dart';
import '../models/vehicle.dart';

class CreateJob extends StatefulWidget {
  const CreateJob({Key? key}) : super(key: key);

  @override
  _CreateJobState createState() => _CreateJobState();
}

class _CreateJobState extends State<CreateJob> {
  bool loading = true;
  bool settingJob = false;

  List<Vehicle> vehicles = [];

  @override
  void initState() {
    getVehicles();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: CustomScrollView(slivers: [
      const SliverAppBar(title: Text("Select Vehicle")),
      SliverList(
          delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              child: Card(
                child: InkWell(
                  child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(vehicles[index].brand,
                                style: const TextStyle(fontSize: 20)),
                            Container(
                                child: Text(vehicles[index].make,
                                    style: const TextStyle(
                                        fontSize: 15, color: Colors.grey)),
                                margin: const EdgeInsets.only(top: 10)),
                            Container(
                                child: Text(vehicles[index].plateNumber,
                                    style: const TextStyle(
                                        fontSize: 15, color: Colors.grey)),
                                margin: const EdgeInsets.only(top: 10)),
                          ])),
                  onTap: () {
                    addJob(vehicles[index].vehicleId);
                  },
                ),
              ));
        },
        childCount: vehicles.length,
      ))
    ]));
  }

  getVehicles() {
    onSuccess(List<Vehicle> vehiclesList) {
      setState(() {
        vehicles = vehiclesList;
      });
    }

    onFailed() {}

    VehicleController.getVehicles(onSuccess: onSuccess, onFailed: onFailed);
  }

  addJob(String vehicleId) {
    setState(() {
      settingJob = true;
    });

    onSuccess(String jobId) {
      setState(() {
        settingJob = false;
      });

      Navigator.push(context, PageRouteBuilder<dynamic>(pageBuilder:
              (BuildContext context, Animation<double> animation,
                  Animation<double> secondaryAnimation) {
            return MechanicSelection(jobId: jobId);
      }));

    
    }

    onFailed() {}

    JobController.addJob(vehicleId, onSuccess: onSuccess, onFailed: onFailed);
  }

}
