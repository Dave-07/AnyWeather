

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');

const apiKey = 'a0206b93034eefbb07b98e6e2710d848';

weatherForm.addEventListener('submit', async ev => {
    ev.preventDefault();

    const city = cityInput.value;

    if (city.trim()) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }

    } else {
        displayError("Please enter a city");
    }

});

const getWeatherData = async city => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error('Failed to fetch weather!');

    return await response.json();
}

const displayWeatherInfo = data => {

    const { name: city,
            main: { temp, humidity },
            weather: [{ description, id }] } = data;

    card.textContent = "";
    card.style.display = 'flex';

    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add('cityDisplay');
    tempDisplay.classList.add('tempDisplay');
    humidityDisplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add('weatherEmoji');


    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);

}

const isInRange = (value, min, max) => value >= min && value < max;

const getWeatherEmoji = weatherId => {
    switch(true){
        case (isInRange(weatherId, 200, 300)):
            return '⛈️';
        case (isInRange(weatherId, 300, 400)):
            return '🌧️';
        case (isInRange(weatherId, 500, 600)):
            return '☔';
        case (isInRange(weatherId, 600, 700)):
            return '❄️';
        case (isInRange(weatherId, 700, 800)):
            return '🌫️';
        case (weatherId === 800):
            return '☀️';
        case (isInRange(weatherId, 801, 810)):
            return '☁️';
        default:
            return '❓';
    }
}

const displayError = message => {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');
    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}


















