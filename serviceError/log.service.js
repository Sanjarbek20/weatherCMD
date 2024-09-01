import chalk from "chalk";
import dedent from "dedent";

const printError = (error) => {
    console.log(chalk.bgRed("error") + " " + error);
}
const printSuccess = (succes) => {
    console.log(chalk.bgGreen("You are Welcome") + " " + succes);
}



const printHelper = () => {
    console.log(dedent`
    ${chalk.bgCyanBright(" HELP  ")}
    -C for insert country
    -s for insert City
    -h for help
    -t save token insert project
    `)
}


const printGetWeather = (response) => {
    console.log(dedent`

${chalk.bgGreenBright.redBright('WEATHER')} City weather ${response.name}
Description ENV: ${response.weather[0].description}

TEMPERATURE: ${response.main.temp} 
HUMIDITY: ${response.main.humidity}
WIND SEEP:${response.wind.speed}
SEA_LEVEL: ${response.main.sea_level}
Pascal Pressure: ${response.main.pressure}
`);
}

export {
    printError, printSuccess, printHelper, printGetWeather
}
