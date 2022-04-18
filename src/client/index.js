// Global Variables
import {
  submitHandler,
  getLatLng,
  getTemp,
  getImage,
  updateUI,
  postData,
} from "./js/TripApp";

document.addEventListener("DOMContentLoaded", () => {
  const button_submit = document.getElementById("generate");
  button_submit.addEventListener("click", submitHandler);
});

import "./styles/style.scss";

export { submitHandler, getLatLng, getTemp, getImage, updateUI, postData };
