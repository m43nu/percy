import {useEffect, useState} from "react";

export default function useLocalStorageState(defaultValue, key) {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const weightValue = window.localStorage.getItem(key);

        if (weightValue !== null) {
            setValue(JSON.parse(weightValue));
        }
    }, [key]);

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}