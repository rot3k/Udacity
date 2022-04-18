
const submit = document.getElementById("generate");

if (submit) {
  submit.addEventListener("click", submitHandler);
}

function submitHandler(e) {
  e.preventDefault();
  const city = document.getElementById("city").value;
  const startDate = document.getElementById("deptdate").value;
  const endDate = document.getElementById("retdate").value;

  // set D-day
  let countDownDate = new Date(startDate).getTime();
  console.log("startDate", countDownDate);
  let current = new Date().getTime();
  console.log("current", current);
  let distance = countDownDate - current;
  console.log("distance", distance);
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("dDays").innerHTML = days + " days away";

  if (distance < 0 || distance == 0) {
    document.getElementById("dDays").innerHTML = "D-day";
  }

  // get latitude and longitude from geoNames

  getLatLng(city)
    .then(async (data) => {
      console.log("latLng", data);
      return await postData("http://localhost:4000/geoNames", {
        latitude: data.geonames[0].lat,
        longitude: data.geonames[0].lng,
      });
    })
    .then((res) => {
      const lat = res[res.length - 1].latitude;
      const lng = res[res.length - 1].longitude;
      console.log("LAT", lat);
      console.log("LNG", lng);
      return { lat, lng };
    })

    // input latitude and longitude to get temperature
    .then(async ({ lat, lng }) => {
      return await getTemp(lat, lng);
    })

    .then(async (temp) => {
      return await postData("http://localhost:4000/wb", {
        high: temp.data[0].high_temp,
        low: temp.data[0].low_temp,
        description: temp.data[0].weather.description,
      });
    })

    //input city to get its image
    .then(async () => {
      return await getImage(city);
    })

    .then((data) => {
      return (
        postData("http://localhost:4000/pixabay", {
          image: data.hits[0].webformatURL,
        })
          //update UI
          .then(updateUI())
      );
    });
}

//GeoNames

const getLatLng = async (city) => {
  const geoNamesBaseUrl = "http://api.geonames.org/searchJSON?q=";
  const apiUrl = `${geoNamesBaseUrl}${city}&maxRows=10&username=${geoNames_key}`;
  console.log(apiUrl);
  const res = await fetch(apiUrl);
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("Invalid City name", error);
  }
};

//WeatherBit

const getTemp = async (lat, lng) => {
  const weatherBitBaseUrl = "http://api.weatherbit.io/v2.0/forecast/daily";
  const apiUrl = `${weatherBitBaseUrl}?lat=${lat}&lon=${lng}&key=${weatherBitKey}`;
  console.log(apiUrl);
  const res = await fetch(apiUrl);
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("Invalid data", error);
  }
};

//Pixabay

const getImage = async (city) => {
  const pixabayBaseUrl = "https://pixabay.com/api/?key=";

  const apiUrl = `${pixabayBaseUrl}${pixabayKey}&q=${city}&image_type=photo`;
  const res = await fetch(apiUrl);
  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log("Image error", error);
  }
};

//Post Data
const postData = async (url = "", data = {}) => {
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

//update UI
const updateUI = async () => {
  const res = await fetch("http://localhost:4000/trips");
  try {
    const allData = await res.json();
    document.querySelector(
      "#weatherInfo"
    ).innerHTML = `Typical Weather for then is <br> High: ${
      allData[allData.length - 2].high
    }, Low: ${allData[allData.length - 2].low} <br>  ${
      allData[allData.length - 2].description
    }`;
    document.querySelector("#image").src = allData[allData.length - 1].picture;
  } catch (error) {
    console.log("error", error);
  }
};

export { submitHandler, getLatLng, getTemp, getImage, updateUI, postData };
