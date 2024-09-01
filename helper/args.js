const getArgs = (info) => {
    const result = {}
    const [executer, file, ...rest] = info;
    rest.forEach((value, index, arr) => {
        if (value.charAt(0) == '-') {
            if (index === arr.length - 1) {
                result[value.substring(1)] = true;
            } else if (index + 1 < arr.length && arr[index + 1].charAt(0) != '-') {
                result[value.substring(1)] = arr[index + 1];
            } else {
                result[value.substring(1)] = true;
            }
        }
    });
    return result;


}

export default getArgs