


function getInfo() {
    const newName = document.querySelector("#cityInput");
    const cityName = document.querySelector("#cityName");
    cityName.innerHTML = "--" + newName.value + "--";
    console.log("im inside the function");
   

    fetch ("http://api.openweathermap.org/geo/1.0/direct?q=" + newName.value + "&limit=1&appid=d15d4d136fa5390a176cc9b75210d7b2")
        .then (response => response.json())
        .then (data => {
            
            console.log(data);
            let lat = data[0].lat;
            let lon = data[0].lon;
            return fetch (`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=d15d4d136fa5390a176cc9b75210d7b2&`);
        })
        .then (response => response.json ())
        .then (data => {
            console.log(data);
           
            let todayTemp = data.daily[0].temp.day;
            let todayHumidity = data.daily[0].humidity;
            let todayWindspeed = data.daily[0].windspeed;
debugger;
            console.log(todayTemp, todayHumidity, todayWindspeed);
        });

    // fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName.value + "&appid=d15d4d136fa5390a176cc9b75210d7b2&units=metric")
    //     .then(response => response.json())
    //     .then(data => {
    //         for (let i = 0; i < data.list.length; i = i + 8) {
    //             let todayWeather = data.list[i];
    //             // document.getElementById("day" +(i)+ "Min").innerHTML = ("Min:" +Number(data.list[i].main.temp_main));
    //             console.log(todayWeather.dt_txt);
    //         }
    //     });
}

$("#citySelection").click(getInfo);


console.log("im outside the function");