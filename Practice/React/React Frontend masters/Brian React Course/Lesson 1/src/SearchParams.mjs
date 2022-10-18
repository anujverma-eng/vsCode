import { useState, useEffect } from "react";
import Pet from './Pet.mjs';
import petsData from "../petsData.json";
import useBreedList from "./useBreedList.js";
import Results from "./Results.mjs";
const ANIMALS = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Reptile'];

const SearchParams = () => {
    const [location, setLocation] = useState("");
    const [animal, setAnimal] = useState("");
    const [breed, setBreed] = useState("");
    const [pets, setPets] = useState([]);
    const [breeds] = useBreedList(animal);
    // const breeds = [];

    useEffect(() => {
        requestPets();
    }, []);

    function requestPets() {
        const data = petsData.filter((element) => {
            if (element.animal.toString() === animal.toString() || element.breed.toString() === breed.toString()) {
                return element;
            }
        });
        setPets(data);
    }


    return (
        <div className="search-params">
            <form onSubmit={(e) => {
                e.preventDefault();
                requestPets();
            }}>
                <label htmlFor="location">
                    Location
                    <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
                </label>
                <label htmlFor="animals">
                    Animals
                    <select name="animal" value={animal} id="animal" onChange={(e) => setAnimal(e.target.value)} onBlur={(e) => setAnimal(e.target.value)}>
                        <option />
                        {
                            ANIMALS.map((element) =>
                            (
                                <option value={element} key={element}>
                                    {element}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <label htmlFor="breed">
                    Breeds
                    <select name="breed" id="breed" onChange={(e) => setBreed(e.target.value)} onBlur={(e) => setBreed(e.target.value)}>
                        <option />
                        {
                            breeds.map((element) =>
                            (
                                <option value={element} key={element}>
                                    {element}
                                </option>
                            ))
                        }
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results pets={pets}/>
        </div>
    );
};

export default SearchParams;