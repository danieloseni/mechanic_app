class Vehicle {
  Vehicle(
      {required this.brand,
      required this.make,
      required this.model,
      required this.plateNumber,
      required this.color,
      this.vehicleId = ""
      });

  final String brand, make, model, plateNumber, color, vehicleId;

  static Vehicle fromJson(Map<String, dynamic> data) {
    return Vehicle(
        brand: data['brand'],
        make: data['make'],
        color: data['color'],
        model: data['model'],
        plateNumber: data['plateNumber'],
        vehicleId: data["_id"]
        );
  }

  Map<String, dynamic> toJson() {
    return {
      "brand": brand,
      "make": make,
      "model": model,
      "plateNumber": plateNumber,
      "color": color
    };
  }
}
