const Car = require("../models/Car");

exports.getAllCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Error fetching car", error: err });
  }
};

exports.addCar = async (req, res) => {
  const newCar = new Car(req.body);
  const saved = await newCar.save();
  res.status(201).json(saved);
};

exports.updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Car.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Car update failed:", error.message);
    res.status(500).json({ message: "Car update failed", error });
  }
};

exports.deleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
};
