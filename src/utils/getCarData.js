import { getCarData as staticCarData } from '../data/carData';

export const getCarData = () => {
  let localData = [];

  try {
    const raw = JSON.parse(localStorage.getItem("cars"));
    if (Array.isArray(raw)) {
      localData = raw;
    }
  } catch (err) {
    console.error("Failed to parse localStorage car data:", err);
  }

  return [...staticCarData(), ...localData];
};
