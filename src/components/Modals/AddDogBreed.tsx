import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { useGetDogBreed } from '../../hooks';
import axios from 'axios';
import { useBreed } from '../../contexts/BreedContext';

const AddDogBreed = ({ children }: { children: ReactNode }) => {
    const [showModal, setShowModal] = useState(false);
    const [breed, setBreed] = useState("");
    const [image, setImage] = useState(null);


    const { dogBreeds } = useGetDogBreed();
    const { favourite, addBreed, getFavouriteBreeds } = useBreed();

    const fetchRandomDogimage = async () => {
        try {
            const response = await axios.get<any>(`https://dog.ceo/api/breed/${breed}/images/random`);
            const imageUrl = response.data.message;
            console.log(response);
            setImage(imageUrl)
        } catch (error) {
            console.log(error);
            setImage(null);
        }
    }

    const handleAddFavouriteBreed = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            if (favourite.length >= 3) return;
            const breedNameList = favourite.map(item => item.breedName);
            if (breedNameList.includes(breed)) return;
            await addBreed(breed);
            await getFavouriteBreeds();
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRandomDogimage();
    }, [breed]);


    return (
        <>
            <button className='px-2 text-black cursor-pointer underline hover:text-yellow-700'
                onClick={() => setShowModal(true)}>
                {children}
            </button>
            {
                showModal &&
                <div className='fixed top-0 left-0 right-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-center items-center'>




                    <div className='bg-white w-[40%] py-4 px-4'>
                        <h2 className='font-futura font-semibold font-2xl border-b border-solid w-full text-true-gray-400 py-2'>
                            SELECT YOUR FAVOURITE BREEDS
                        </h2>
                        <div className='flex flex-col justify-center items-center mt-4 gap-4 px-4'>
                            <form className='w-full mx-auto'>
                                <label htmlFor="dog-breeds"
                                    className='block mb-2 text-sm font-futura text-true-gray-400 font-medium left-2 relative'>
                                    Select A Dog Breeds
                                </label>

                                <select id="dog-breeds"
                                    onChange={(e) => setBreed(e.target.value)}
                                    className='border border-true-gray-400 text-sm rounded-lg w-full p-2 text-true-gray-400'>
                                    <option selected>Choose new breeds</option>
                                    {
                                        dogBreeds
                                        && dogBreeds.map((dogBreed) => <option value={dogBreed}>{dogBreed}</option>)
                                    }
                                </select>
                            </form>

                            {
                                image
                                && <>
                                    <img src={image}
                                        className='mt-4 h-72' />

                                    <span className='font-futura font-medium text-true-gray-400'>
                                        EXAMPLE
                                    </span>
                                </>
                            }
                            <div className='flex items-center justify-between gap-4'>
                                <button className='py-2 px-3 rounded-3xl font-futura text-white font-semibold bg-yellow-700 w-40'
                                    onClick={() => setShowModal(false)}>
                                    CLOSE
                                </button>
                                <button className='py-2 px-3 rounded-3xl font-futura text-white font-semibold bg-blue-700 w-40'
                                    onClick={handleAddFavouriteBreed}>
                                    FAVOURITE
                                </button>
                            </div>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default AddDogBreed
