import getArgs from "./helper/args.js";
import { getApiWeather } from "./serviceError/api.service.js";
import { printError, printSuccess, printHelper, printGetWeather } from "./serviceError/log.service.js";
import { TOKEN_DICTIONARY, getKeyValue, saveKeyValue } from "./serviceError/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("Token doesn't exist");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess("Token was saved");
    } catch (error) {
        printError(error.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("City doesn't exist");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City was saved");
    } catch (error) {
        printError(error.message);
    }
};

const getFora = async () => {
    try {
        const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
        const response = await getApiWeather(city);
        // console.log(response, "Weather data:");  
        printGetWeather(response)
    } catch (error) {
        if (error?.response?.status === 404) {
            printError('City not found');
        } else if (error?.response?.status === 401) {
            printError('Invalid API token');
        } else {
            printError(error.message);
        }
    }
};

const beginCLI = () => {
    const arg = getArgs(process.argv);
    // console.log(arg);

    if (arg.h) {
        return printHelper(arg.h);
    }
    if (arg.C) {
        // Handle country name if needed
    }
    if (arg.s) {
        return saveCity(arg.s);
    }
    if (arg.t) {
        return saveToken(arg.t);
    }
    return getFora();
};

beginCLI();
