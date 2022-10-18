import { element } from "prop-types";
import { useState, useEffect } from "react";
import petsData from "../petsData.json";

const localCache = {};

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        if (!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal]);
        } else {
            requestBreedList();
        }

        function requestBreedList() {
            setBreedList([]);
            setStatus("loading");
            const data = petsData.filter((element) => {
                if (element.animal === animal) {
                    return element;
                }
            });
            const newData = [];
            data.forEach((element)=>{newData.push(element.breed)});

            localCache[animal] = newData || [];
            setBreedList(localCache[animal]);
            setStatus('loaded');
        }
    }, [animal]);

    return [breedList, status];
}