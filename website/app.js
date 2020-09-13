/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
let APIkey = "7c876bdab1e9c8eea2f87e9363c6b1cf";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = 1 + d.getMonth() + " / " + d.getDate() + " / " + d.getFullYear();

// Adding 'click' EventListener for the generate button
document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const zipCode = document.getElementById("zip").value;
    const userFeelings = document.getElementById("feelings").value;

    getTemperature(baseURL, zipCode, APIkey).then(function (data) {
        postData("/addWeatherData", {
            temperature: data.main.temp,
            date: newDate,
            user_res: userFeelings,
        }).then(function () {
            updateUI();
        });
    });
}

// Async GET
const getTemperature = async (baseURL, zipCode, APIkey) => {
    const response = await fetch(baseURL + zipCode + "&APPID=" + APIkey);
    console.log(response);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("ERROR", error);
    }
};

// Async POST
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("ERROR", error);
    }
};

// Updating UI
const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        document.getElementById("date").innerHTML = `Date: ${allData.date}`;
        document.getElementById("temp").innerHTML = `Temperature in Kelvin = ${allData.temperature} °K , Temperature in Celsius = ${allData.temperature - 273.15} °C `;
        document.getElementById("content").innerHTML = `Feeling: ${allData.user_res}`;
    } catch (error) {
        console.log("ERROR", error);
    }
};