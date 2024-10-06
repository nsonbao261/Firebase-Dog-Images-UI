import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useBreed } from '../../contexts/BreedContext';


const RandomImageDisplay = () => {

    const [image, setImage] = useState<string | null>(null);
    const [randomBreed, setRandomBreed] = useState<string | null>(null);
    const { favourite } = useBreed();

    const getRandomBreeds = async (breeds: string[]) => {
        if (breeds.length === 0) {
            setRandomBreed(null);
            return;
        }

        setRandomBreed(breeds[Math.floor(Math.random() * breeds.length)]);
    }

    const fetchRandomImage = async () => {
        try {
            const favouriteBreedName = favourite.map(item => item.breedName);
            await getRandomBreeds(favouriteBreedName).then(async () => {
                const breed = randomBreed;
                var url = "https://dog.ceo/api/breeds/image/random"
                if (breed !== null) {
                    url = `https://dog.ceo/api/breed/${breed}/images/random`;
                }
                const response = await axios.get<any>(url);
                const imageUrl = response.data.message;
                setImage(imageUrl)
            })
        } catch (error) {
            setImage(null);
            console.log(error);
        }
    }

    useEffect(() => {
        getRandomBreeds(favourite.map(item => item.breedName));
        fetchRandomImage();
    }, [])
    return (
        <>
            {
                image
                && <img src={image}
                    className='mt-4 h-72' />
            }

            {
                randomBreed
                    ? <span className='p-2 bg-yellow-700 font-futura text-white rounded-lg mt-2'>
                        {randomBreed}
                    </span>
                    : <h2 className='text-2xl font-futura text-black font-semibold'>
                        SELECT YOUR FAVOURITE DOG BREEDS FOR BETTER EXPERIENCE
                    </h2>
            }

            <button onClick={() => fetchRandomImage()}
                className='py-2 px-6 border rounded-full border-yellow-700 text-yellow-700 font-futura hover:bg-yellow-100 mx-auto mt-4'>
                Random Image
            </button>
        </>
    )
}

export default RandomImageDisplay