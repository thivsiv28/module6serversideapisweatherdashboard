let cities = {};


function clear() {
    localStorage.removeItem("city");
}

function getInfo() {

    // console.log(newName);
    $("#invalidCity").addClass("d-none");

    const newName = document.querySelector("#cityInput");
    const cityName = document.querySelector("#cityName");
    // cityName.innerHTML = "--" + newName.value + "--";
    $("#cityName").text(newName);

    console.log("im inside the function");


    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + newName.value + "&limit=1&appid=d15d4d136fa5390a176cc9b75210d7b2")
        .then(response => response.json())
        .then(data => {

            console.log(data);
            if (data.length == 0) {
                throw "Unknow city, try again!";
            }

            let lat = data[0].lat;
            let lon = data[0].lon;
            return fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts,current&units=metric&appid=d15d4d136fa5390a176cc9b75210d7b2&`);
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let todayTemp = data.daily[0].temp.day;
            let todayHumidity = data.daily[0].humidity;
            let todayWindspeed = data.daily[0].wind_speed * 3.6;
            console.log(todayTemp, todayHumidity, todayWindspeed);

            for (let i = 1; i < 6; i++) {
                let forecastDate = moment.unix(data.daily[i].dt);
                let forecastTemp = data.daily[i].temp.day;
                let forcastHumidity = data.daily[i].humidity;
                let forcastWindspeed = data.daily[i].wind_speed * 3.6;
                //if i=1 then #date1
                //if i=2 then #date2
                $("#date" + i).text(forecastDate.format('MM-DD-YYYY'));
                $("#temp" + i).text(forecastTemp);
                $("#wind" + i).text(forcastWindspeed);
                $("#humdity" + i).text(forcastHumidity);



                // console.log(data);
            }

            let day = moment.unix(data.daily[0].dt);
            //seconds
            // let day = moment(1318781876406); //milliseconds


            console.log(day.format('dddd MMMM Do YYYY'));
            $("#date").text(day.format('dddd MMMM Do YYYY'));

            $("#todayDegree").text(todayTemp);
            // }
            $("#todayWindSpeed").text(todayWindspeed);

            $("#todayHumidity").text(todayHumidity);

            cities[newName.value] = true;


        }).catch(err => {
            console.error(err);
            $("#invalidCity").html(err).removeClass("d-none");
        });

}

function saveCities() {

    // when stringifying dont need quotations as it will put it into a string already
    //when seeting the local storage set item, need to make sure 

    let key = "cities";
    let rawData = JSON.stringify(cities);
    localStorage.setItem(key, rawData);

}


function loadData() {

    // when getting item pass it in as a string. cause theyre stored in a key value pair. if you dont put quotes around it treats it as a literal variable

    let rawData = localStorage.getItem("cities");
 
    if (rawData == null) {
        return;
    }
    cities = JSON.parse(rawData);
};





$("#citySelection").click(getInfo);

$(document).keypress(
    function (event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    });

loadData();