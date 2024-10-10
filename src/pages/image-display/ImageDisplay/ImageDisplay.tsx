import { useEffect, useState } from 'react'
import { AddDogBreed, DefaultHeader, FavouriteDogDisplay } from '../../../components'
import axios from 'axios';
import { useBreed } from '../../../contexts/BreedContext';

const ImageDisplay = () => {

    const [image, setImage] = useState<string | null>(null);
    const { getFavouriteBreeds } = useBreed();


    const fetchRandomImage = async () => {
        try {
            const response = await axios.get<any>("https://dog.ceo/api/breeds/image/random");
            const imageUrl = response.data.message;
            setImage(imageUrl)
        } catch (error) {
            setImage(null);
            console.log(error);
        }
    }



    useEffect(() => {
        fetchRandomImage();
        getFavouriteBreeds();
    }, [])
    return (
        <>
            <DefaultHeader />
            <div className='flex flex-col items-center justify-center mt-8'>

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


                {
                    image
                    &&
                    <img src={image}
                        className='mt-4 h-72' />
                }


                <button onClick={fetchRandomImage}
                    className='py-2 px-6 border rounded-full border-yellow-700 text-yellow-700 font-futura hover:bg-yellow-100 mx-auto mt-4'>
                    Random Image
                </button>
            </div>
        </>
    )
}

export default ImageDisplay
