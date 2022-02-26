import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';


class SnackBarKit{
    SnackBarKit._();
    static void snackbarSuccess(String message, BuildContext context){
        SnackBar _snackbar = SnackBar(backgroundColor: Colors.green, 
        behavior: SnackBarBehavior.floating,
         margin: const EdgeInsets.only(left: 20, right: 20, bottom: 40),
         duration: const Duration(seconds: 5),
         elevation: 3, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          content: Row(
           mainAxisAlignment: MainAxisAlignment.spaceBetween,
          
          children: [
               Text(message,
                    style: const TextStyle(
                      fontFamily: 'Manrope',
                      fontSize: 16,
                      fontWeight: FontWeight.w500
                    )
                  ),
            

              const FaIcon(FontAwesomeIcons.checkCircle, color: Colors.white)
              

          ],
        ),);

        ScaffoldMessenger.of(context).showSnackBar(_snackbar);
    }
    static void snackbarError(String message, BuildContext context){
        SnackBar _snackbar = SnackBar(backgroundColor: Colors.red, 
        behavior: SnackBarBehavior.floating,
         margin: const EdgeInsets.only(left: 20, right: 20, bottom: 40),
         duration: const Duration(seconds: 5),
         elevation: 3, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          content: Row(
           mainAxisAlignment: MainAxisAlignment.spaceBetween,
          
          children: [
               Text(message,
                    style: const TextStyle(
                      fontFamily: 'Manrope',
                      fontSize: 16,
                      fontWeight: FontWeight.w500
                    )
                  ),
              

              const FaIcon(FontAwesomeIcons.timesCircle, color: Colors.white)
              

          ],
        ),);

        ScaffoldMessenger.of(context).showSnackBar(_snackbar);
    }
}