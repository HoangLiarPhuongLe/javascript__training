class LocalStorageHelper {
    constructor() {}

    saveLocalStorage = (key, value) => {
        const data = JSON.stringify(value);

        localStorage.setItem(key, data);
    };

    getLocalStorage = (key) => {
        const data = localStorage.getItem(key);

        const parseData = JSON.parse(data);
        return parseData;
    };

    removeLocalStorage = (key) => {
        localStorage.removeItem(key);
    };
}

export const localStorageHelper = new LocalStorageHelper();
