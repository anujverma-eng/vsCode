import React from 'react';
import Pet from "./Pet.mjs";
const Results = (props) => {
    return (
        <div className='search'>
            {
                !props.pets.length ? (
                    <h2>No Pets Found</h2>
                ) : (
                    props.pets.map((pet) => (
                        <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} id={pet.id}/>
                    ))
                )
            }
        </div>
    );
};

export default Results;
