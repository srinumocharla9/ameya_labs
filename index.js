const container = document.querySelector('.container');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error = document.querySelector('.not-found');

const mandalCities = {
    " ": [""],
    "Hyderabad": ["","Gachibowli", "Hitech City", "Shamshabad","Mallapur","Kukatpally","Jubilee Hills","GandiPeta","Narsingi","Madhapur"],
  };

  // Get the mandal and city dropdown elements
  const mandalDropdown = document.getElementById("mandalDropdown");
  const cityDropdown = document.getElementById("cityDropdown");
  const weatherButton = document.getElementById("fetchWeather");
  const weather_report = document.getElementById("Weather_report").hidden=true;

  function show_weather_details(){
    document.getElementById("Weather_report").hidden=false;
  }

    // Populate the mandal dropdown with options
    Object.keys(mandalCities).forEach((mandal) => {
        const option = document.createElement("option");
        option.text = mandal;
        option.value = mandal;
        mandalDropdown.add(option);
 });

 mandalDropdown.addEventListener("change", function() {
    const selectedMandal = mandalDropdown.value;
        // Clear the city dropdown options
        cityDropdown.innerHTML = ""; 
        // Populate the city dropdown with options based on the selected mandal
        mandalCities[selectedMandal].forEach((city) => {
          const option = document.createElement("option");
          option.text = city;
          option.value = city;
          cityDropdown.add(option);
        });
        const weatherApi = "https://api.openweathermap.org/data/2.5/weather";
        const apiKey = "fbd87ac33bbbb9b7bf444df19a89ad89";
        cityDropdown.addEventListener("change",function() {
        const selectedCity = cityDropdown.value;
        console.log(selectedCity);
        console.log(selectedMandal);  
          weatherButton.addEventListener("click" , function() {
              const url = `${weatherApi}?appid=${apiKey}&unit=metric&q=${selectedCity},${selectedMandal}, Telangana`; 
              fetch(url)
              .then(response => response.json())
              .then(data => {
                const temperature = document.querySelector('.weather-box .temperature');
                const description = document.querySelector('.weather-box .description');
                const humidity = document.querySelector('.weather-details .humidity span');
                const wind = document.querySelector('.weather-details .wind span');
                const latitude = document.querySelector('.weather-details .latitude span');
                const longitude = document.querySelector('.weather-details .longitude span');

                function displayImage(src){
                    var img = document.createElement("img");
                    img.src = src;
                    img.width = 200 ;
                    img.height = 200 ;
                    document.querySelector('.container .image-class').appendChild(img);
                }
                var src ;

                switch (data.weather[0].main) {
                    case 'Clear':
                        src = 'images/clear.png';
                        break;
    
                    case 'Rain':
                        src = 'images/rain.png';
                        break;
    
                    case 'Snow':
                        src = 'images/snow.png';
                        break;
    
                    case 'Clouds':
                        src = 'images/cloud.png';
                        break;
    
                    case 'Haze':
                        src = 'images/mist.png';
                        break;
    
                    default:
                        src = '';
                }
                displayImage(src);
                

                temperature.innerHTML = `${parseInt(data.main.temp-273)}<span> <h1 style="display:inline-block"> °C </h1> </span>`;
                description.innerHTML = `${data.weather[0].description}`;
                humidity.innerHTML = `${data.main.humidity}%`;
                wind.innerHTML = `${parseInt(data.wind.speed)}Km/hr`;
                latitude.innerHTML = `${data.coord.lat}°N`;
                longitude.innerHTML = `${data.coord.lon}°E`

                weatherBox.style.display = '';
                weatherDetails.style.display = '';
                weatherBox.classList.add('fadeIn');
                weatherDetails.classList.add('fadeIn');
                container.style.height = '900px';
                container.style.width = '650px';

                console.log("City : " ,selectedMandal);
                console.log("Place : ", selectedCity);
                console.log("Long : " ,data.coord.lon);
                console.log("Latitude : ", data.coord.lat);
                console.log("Temp : ", data);
                console.log("Icon id : ", data.weather[0].id);
                
            })
            .catch(error => {
              console.log(error);
            })
          });
        })
      });
      