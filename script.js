//2. We can oly grab elements when DOM is loaded
document.addEventListener('DOMContentLoaded',()=>{

  // 1.Grab all elements
const cityInput = document.getElementById("city-input");
const getWeatherBtn = document.getElementById("get-weather-btn");
const weatherInfo = document.getElementById("weather-info");
const cityNameDisplay = document.getElementById("city-name");
const tempratureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const errorMessage = document.getElementById("error-message");

const API_KEY = "576516a24f6c8c4180392abcc1cb1b12"; //env variable

// 3.when we call 'click' event on button it returns  city value with trimmed the spaces if mistakenly enterd by user.
getWeatherBtn.addEventListener('click',async()=>{
  const city = cityInput.value.trim();
  if(!city) return;


  //5.While fetching data it beacause below two scenarios so we use try catch block.
  //  it may throw an error
  // server or database is always in another continent.

  try {
   const weatherData = await fetchweatherData(city);
   displayWeatherData(weatherData);
  } catch (error) {
    showError();
  }


})


// 4.declaring function to feching data , displaying data and showing error if data not found 
async function fetchweatherData(city){
  //get(Fetch) data
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

  const response = await fetch(url);
  console.log(typeof response);
  console.log("RESPONSE" ,response);

  if(!response.ok){
    throw new Error("City Not Found");
  }
  const data = await response.json();
  return data
}

function displayWeatherData(data) {
  //display
  console.log(data);
  const {name, main ,weather} = data
  cityNameDisplay.textContent = name;
  
  tempratureDisplay.textContent = `Temperature : ${main.temp}`;
  descriptionDisplay.textContent = `weather : ${weather[0].description}`;
  
  //unlock the display
  weatherInfo.classList.remove('hidden')
  errorMessage.classList.add('hidden')
}

function showError(){
  weatherInfo.classList.remove('hidden');
  errorMessage.classList.add('hidden');
}

})






















/* Using the Fetch API :
1.Javascript alone is not capable of making requests either you need  node environement or window environment from browser to make HTTP Requests.    */