class Mechanic {
  Mechanic(
      {required this.firstname,
      required this.lastname,
      required this.email,
      required this.phone,
      required this.mechanicId,
      });

  final String firstname, lastname, email, phone, mechanicId;

  static Mechanic fromJson(Map<String, dynamic> data) {
    return Mechanic(
        firstname: data['firstname'],
        lastname: data['lastname'],
        email: data['email'],
        phone: data['phone'],
        mechanicId: data['_id'],
        );
  }

  Map<String, dynamic> toJson() {
    return {
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "phone": phone,
      "mechanicId": mechanicId
    };
  }
}
