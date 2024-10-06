import React, { useEffect, useState } from 'react'
import { AddDogBreed, DefaultHeader, FavouriteDogDisplay, RandomImageDisplay } from '../../components'
import axios from 'axios';
import { useBreed } from '../../contexts/BreedContext';

const Home = () => {

    const { favourite } = useBreed();

    return (
        <>
            <DefaultHeader />
            <div className='flex flex-col items-center justify-center'>

                <FavouriteDogDisplay />

                <h2 className='px-3 py-2 text-2xl font-semibold font-futura border-b-4 border-yellow-900'>
                    RANDOM IMAGES
                </h2>

                <p className='font-futura2 mt-4 text-true-gray-400'>
                    Or you can
                    <AddDogBreed>
                        save
                    </AddDogBreed>
                    your favourite breeds
                </p>

                <RandomImageDisplay />


            </div>
        </>
    )
}

export default Home
