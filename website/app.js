/* Global Variables */
const apiURL = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Create a click event regarding user input data
document.querySelector("#generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  if (zipCode.length != 5 || isNaN(zipCode)) {
    alert("Input valid code");
  } else {
    getZip(apiURL, zipCode, key).then((data) => {
      console.log(data);
      postData("/add", {
        date: d,
        temp: data.main.temp,
        content: feelings,
      }).then(() => updateUI());
    });
  }
}

// Function to get the zip code
const getZip = async (url, zip, api) => {
  const res = await fetch(url + zip + api);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// postData function to post the data
const postData = async (url = " ", data = {}) => {
  const res = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to update date on UI (index.html)
const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    document.querySelector("#date").innerHTML = allData.date;
    document.querySelector("#temp").innerHTML = allData.temp;
    document.querySelector("#content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
