import { useBreed } from '../../contexts/BreedContext'
import { CloseIcon } from '../../assets';
import { useEffect } from 'react';

const FavouriteDogDisplay = () => {
    const { favourite, deleteBreed, getFavouriteBreeds } = useBreed();
    const handleDeleteFavouriteBreed = async (breedId: string) => {
        try {
            await deleteBreed(breedId);
            await getFavouriteBreeds();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFavouriteBreeds();
    }, [])

    return (
        <div className='w-full p-2'>
            <h2 className='font-semibold font-futura text-2xl'>
                YOUR FAVOURITE DOG BREED
            </h2>

            <div className='mt-2 flex items-center gap-2'>
                {favourite && favourite.map((item) =>
                    <span className='p-2 bg-true-gray-400 font-futura flex items-center justify-between gap-2'>
                        {item.breedName}
                        <button onClick={() => handleDeleteFavouriteBreed(item.breedId)}>
                            <CloseIcon />
                        </button>
                    </span>
                )}
            </div>
        </div>
    )
}

export default FavouriteDogDisplay