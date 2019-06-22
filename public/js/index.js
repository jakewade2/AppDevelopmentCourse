window.onload = function(){

  cityInput.addEventListener('keydown', function(e){
    if (e.keyCode === 13) {
      makeRequest();
    }
  })

  button.addEventListener('click', makeRequest);

  function makeRequest() {
    var weathermain = document.getElementById('weathermain')
    var weatherdescription = document.getElementById('weatherdescription')
    var weathertemperature = document.getElementById('weathertemperature')
    var weatherhumidity = document.getElementById('weatherhumidity')
    var weatherimage = document.getElementById('image')
    var button = document.getElementById('button')
    var title = document.getElementById('title')
    var inputcontainer = document.getElementById('inputcontainer')
    var cityInput = document.getElementById('cityInput')

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" +cityInput.value +"&APPID=91a5954de67a5f9f37db0d87b7e1c82e", true);
    xhr.onload = function (e){
      if(xhr.readyState === 4){
        if(xhr.status === 200){

          var data = JSON.parse(xhr.responseText);
          weathermain.innerHTML = data.weather[0].main

          if (daytime) {
            if (data.weather[0].main === "Clear") {
              weatherimage.src="../../assets/images/clear.png"
            }
            if (data.weather[0].main === "Clouds") {
              weatherimage.src="../../assets/images/clouds.png"
            }
            if (data.weather[0].main === "Rain") {
              weatherimage.src="../../assets/images/rain.png"
            }
            if (data.weather[0].main === "Drizzle") {
              weatherimage.src="../../assets/images/rain.png"
            }
            if (data.weather[0].main === "Snow") {
              weatherimage.src="../../assets/images/snowflake.png"
            }
          } else {

          }

          console.log(data.weather[0].main);

          weatherdescription.innerHTML = toTitleCase(data.weather[0].description)
          weathertemperature.innerHTML = (data.main.temp - 273.15).toFixed() +"°C"
          weatherhumidity.innerHTML = data.main.humidity +"%"

        } else {
          console.error(xhr.statusText)
        }
      }
    };
    xhr.onerror = function (e) {
      console.error(xhr.statusText);
    };
    xhr.send(null)
  }


}
