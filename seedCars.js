const mongoose = require('mongoose');
require('dotenv').config();
const Car = require('./models/Car');

const cars = [
  {
    name: "BMW 3 Series",
    model: "BMW 320i",
    fuelAverage: "15",
    ac: "Yes",
    price: 10000,
    images: [
      "https://res.cloudinary.com/dlgonnqjl/image/upload/v1749644897/rsbv21r7deppvyjuu67j.jpg",
      "/images/bmw/bmw2.jpg",
      "/images/bmw/bmw3.jpg"
    ]
  },
  {
    name: "Honda BR-V",
    model: "Honda BR-V i-VTEC S",
    fuelAverage: "15",
    ac: "Yes",
    price: 7000,
    images: [
      "https://res.cloudinary.com/dlgonnqjl/image/upload/v1749644897/rsbv21r7deppvyjuu67j.jpg",
      "/images/bmw/bmw2.jpg",
      "/images/bmw/bmw3.jpg"
    ]
  },
  {
    name: "Suzuki Alto",
    model: "Alto VXL",
    fuelAverage: "20",
    ac: "Yes",
    price: 3000,
    images: [
      "/images/suzukialto/interior.jpg",
      "/images/suzukialto/side.jpg",
      "/images/suzukialto/front.jpg"
    ]
  },
  {
    name: "Suzuki WagonR",
    model: "Wagon R VXL",
    fuelAverage: "18",
    ac: "Yes",
    price: 4000,
    images: [
      "/images/suzukiwagnor/back.jpg",
      "/images/suzukiwagnor/front.jpg",
      "/images/suzukiwagnor/side.jpg"
    ]
  },
  {
    name: "Toyota Corolla",
    model: "Corolla Altis 1.6",
    fuelAverage: "14",
    ac: "Yes",
    price: 4800,
    images: [
      "/images/toyotacorolla/interior.jpg",
      "/images/toyotacorolla/back.jpg",
      "/images/toyotacorolla/front.jpg"
    ]
  },
  {
    name: "Toyota Hiace",
    model: "Hiace Standard Roof",
    fuelAverage: "10",
    ac: "Yes",
    price: 6000,
    images: [
      "/images/toyotahiace/interior.jpg",
      "/images/toyotahiace/side.jpg",
      "/images/toyotahiace/back.jpg"
    ]
  },
  {
    name: "Toyota Prado",
    model: "Prado TX",
    fuelAverage: "9",
    ac: "Yes",
    price: 9500,
    images: [
      "/images/toyotaprado/side.jpg",
      "/images/toyotaprado/interior.jpg",
      "/images/toyotaprado/front.jpg"
    ]
  },
  {
    name: "Toyota Yaris",
    model: "Yaris 1.5 ATIV X",
    fuelAverage: "16",
    ac: "Yes",
    price: 6500,
    images: [
      "/images/toyotayaris/interior.jpg",
      "/images/toyotayaris/front.jpg",
      "/images/toyotayaris/back.jpg"
    ]
  },
  {
    name: "45678",
    model: "45678",
    fuelAverage: "dfgh",
    ac: "No",
    price: 567,
    images: [
      "https://res.cloudinary.com/dlgonnqjl/image/upload/v1749909644/hthuvnodyvvyzfof0loz.jpg"
    ]
  },
  {
    name: "Mehran",
    model: "Mehran",
    fuelAverage: "20-25",
    ac: "Yes",
    price: 6000,
    images: [
      "https://res.cloudinary.com/dlgonnqjl/image/upload/v1750081860/lkjc2ggpw6fxkewc2aco.jpg",
      "https://res.cloudinary.com/dlgonnqjl/image/upload/v1750081872/b34uncq2cekxga6okf8j.jpg"
    ]
  }
];

async function seedCars() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Car.deleteMany(); // Clear old records if needed
    await Car.insertMany(cars);
    console.log('✅ Cars inserted successfully!');
    mongoose.disconnect();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  }
}

seedCars();
