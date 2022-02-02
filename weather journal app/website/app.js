/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=e0a189e608668e69c5a62d755b779fba";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  getZip(baseURL, newZip, apiKey).then(function (data) {
    console.log(data);
    postData("/add", {
      date: d,
      temp: data.main.temp,
      content: feelings,
    });
  });
  updateUI();
}

const getZip = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

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

const updateUI = async () => {
  const req = await fetch("/all");
  try {
    const allData = await req.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temp;
    document.getElementById("content").innerHTML = allData.content;
  } catch (error) {
    console.log("error", error);
  }
};
