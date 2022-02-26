import 'package:client/models/mechanic.dart';
import 'package:client/models/mechanic_request.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../controllers/mechanic_controller.dart';

class MechanicSelection extends StatefulWidget {
  final String jobId;
  const MechanicSelection({Key? key, required this.jobId}) : super(key: key);

  @override
  _MechanicSelectionState createState() => _MechanicSelectionState();
}

class _MechanicSelectionState extends State<MechanicSelection> {
  List<Mechanic> mechanics = [];

  @override
  void initState() {
    getmechanics();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: CustomScrollView(slivers: [
      const SliverAppBar(title: Text("Select Mechanic")),
      SliverList(
          delegate: SliverChildBuilderDelegate(
        (BuildContext context, int index) {
          return Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
              child: Card(
                child: Padding(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                              '${mechanics[index].firstname} ${mechanics[index].lastname}',
                              style: const TextStyle(fontSize: 20)),
                          InkWell(
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 20, vertical: 10),
                              margin: const EdgeInsets.only(top: 20),
                              decoration: BoxDecoration(
                                  border: Border.all(color: Colors.grey),
                                  borderRadius: BorderRadius.circular(35)),
                              child: Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Container(
                                      child: const FaIcon(
                                        FontAwesomeIcons.phone,
                                        color: Colors.grey,
                                        size: 15,
                                      ),
                                      margin: const EdgeInsets.only(
                                          top: 10, right: 10)),
                                  Container(
                                      child: Text(mechanics[index].phone,
                                          style: const TextStyle(
                                              fontSize: 15,
                                              color: Colors.grey)),
                                      margin: const EdgeInsets.only(top: 10)),
                                ],
                              ),
                            ),
                            onTap: () {
                             
                            },
                          ),
                          Container(
                            child: Row(
                              children: [
                                ElevatedButton(
                                    onPressed: () {
                                      requestMechanic(mechanics[index].mechanicId);
                                    },
                                    child: const Text("Send Request"))
                              ],
                            ),
                            margin: const EdgeInsets.only(top: 20),
                          )
                        ])),
              ));
        },
        childCount: mechanics.length,
      ))
    ]));
  }

  getmechanics() {
    onSuccess(List<Mechanic> mechanicsList) {
      setState(() {
        mechanics = mechanicsList;
      });
    }

    onFailed() {}

    MechanicController.getMechanics(onSuccess: onSuccess, onFailed: onFailed);
  }

  requestMechanic(String mechanicId) {
    setState(() {
      //settingJob = true;
      List<Mechanic> newMechanicSet = [];

      addMechanicToList(Mechanic mechanic){
          if(mechanic.mechanicId != mechanicId){
            newMechanicSet.add(mechanic);
          }
      }
       mechanics.forEach(addMechanicToList);

       mechanics = newMechanicSet;
    });

    onSuccess() {
      setState(() {
        //settingJob = false;
      });
    }

    onFailed() {}

    MechanicController.requestMechanics(MechanicRequest(mechanicId, widget.jobId), onSuccess: onSuccess, onFailed: onFailed);
  }
}
