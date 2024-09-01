import fs from 'fs';
import os from 'os';
import path from 'path';

const filePath = path.join(os.homedir(), 'weather-data.json')
console.log(filePath);

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
    country: 'country'
}

const saveKeyValue = async (key, value) => {
    let data = {}

    if (await isExist(filePath)) {
        const file = await fs.promises.readFile(filePath)
        data = JSON.parse(file);
    }

    data[key] = value;
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2))
}

const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await fs.promises.readFile(filePath)
        const data = JSON.parse(file);
        return data[key];
    }


    return undefined;
}

const isExist = async path => {
    try {
        await fs.promises.stat(path);
        return true
    } catch (error) {
        return false;
    }
}
export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };
