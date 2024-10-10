import axios from 'axios';
import { SyntheticEvent, useEffect, useState } from 'react'
import { useBreed } from '../../contexts/BreedContext';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { useGetUserInfo } from '../../hooks';


const RandomImageDisplay = () => {

    const [image, setImage] = useState<string | null>(null);
    const [randomBreed, setRandomBreed] = useState<string | null>(null);
    const [isImageLiked, setIsImageLiked] = useState(false);
    const { favourite } = useBreed();
    const { user } = useGetUserInfo();

    const handleLike = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            const document = {
                imageUrl: image,
                createdAt: new Date(),
                userId: user.userId,

            }
            const collectionRef = collection(db, "favouriteImages");

            await addDoc(collectionRef, document).then(() => {
                setIsImageLiked(true);
                toast.success("Image Liked");
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnlike = async (event: SyntheticEvent) => {
        event.preventDefault();
        try {
            const collectionRef = collection(db, "favouriteImages");
            const q = query(
                collectionRef,
                where("userId", "==", user?.userId,),
                where("imageUrl", "==", image));
            const snapshot = await getDocs(q);
            if (!snapshot.empty) {
                snapshot.forEach(async (document) => {
                    await deleteDoc(doc(db, "favouriteImages", document.id)).then(
                        () => {
                            setIsImageLiked(false);
                            toast.success("Image Unlike")
                        }
                    );
                })
            }

        } catch (error) {
            console.log(error);
        }

    }

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

    const checkImageLike = async () => {
        try {
            const collectionRef = collection(db, "favouriteImages");
            const q = query(
                collectionRef,
                where("userId", "==", user?.userId,),
                where("imageUrl", "==", image));
            const snapshot = await getDocs(q);
            if (snapshot.empty) setIsImageLiked(false);
            else {
                setIsImageLiked(true);
            }
        } catch (error) {
            console.log(error);
            setIsImageLiked(false);
        }
    }
    useEffect(() => {
        getRandomBreeds(favourite.map(item => item.breedName));
        fetchRandomImage();
    }, []);

    useEffect(() => {
        if (image) {
            checkImageLike();
        }
    }, [image])
    return (
        <>
            {
                image
                && <div className='flex justify-center items-center gap-4'>
                    <img src={image}
                        className='mt-4 h-72' />

                    {
                        isImageLiked

                            ? <button className='py-2 px-6 font-semibold font-futura text-yellow-700 border-2 border-yellow-700 hover:bg-yellow-100 rounded-lg'
                                onClick={handleUnlike}>
                                Unlike
                            </button>

                            : <button className='py-2 px-6 font-semibold font-futura text-yellow-700 border-2 border-yellow-700 hover:bg-yellow-100 rounded-lg'
                                onClick={handleLike}>
                                Like
                            </button>
                    }
                </div>
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