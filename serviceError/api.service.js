
import https from 'https';
import { TOKEN_DICTIONARY, getKeyValue } from './storage.service.js';


const getApiWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

    if (!token) {
        throw new Error("API token is missing");
    }

    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('lang', 'en');
    url.searchParams.append('units', 'metric');

    // log(`Requesting weather data from: ${url}`);

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let result = '';

            res.on('data', (chunk) => {
                result += chunk;
            });

            res.on('end', () => {
                if (res.statusCode === 200) {
                    try {
                        const parsedData = JSON.parse(result);
                        resolve(parsedData);
                    } catch (error) {
                        reject(new Error("Failed to parse API response"));
                    }
                } else {
                    reject(new Error(`API request failed with status code ${res.statusCode}: ${result}`));
                }
            });
        }).on('error', (err) => {
            reject(new Error(`HTTP request failed: ${err.message}`));
        });
    });
}

const getApiWeatherCountry = async (country) => {
    // Implementation for fetching weather data by country if needed
}

export { getApiWeather };
