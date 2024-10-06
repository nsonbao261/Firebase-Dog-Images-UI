import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { db } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserInfo } from "../hooks";

interface IBreedInfo {
    breedId: string,
    breedName: string
}

export interface IBreedContextProps {
    favourite: IBreedInfo[],
    addBreed: (breedName: string) => void,
    getFavouriteBreeds: () => void,
    deleteBreed: (breedId: string) => void,
}

export const BreedContext = createContext<IBreedContextProps>({
    favourite: [],
    addBreed: () => { },
    getFavouriteBreeds: () => { },
    deleteBreed: () => { }

});

export const BreedProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useGetUserInfo();
    const [favourite, setFavourite] = useState<IBreedInfo[]>([])


    const getFavouriteBreeds = async () => {
        try {
            const newBreedList: IBreedInfo[] = []
            const collectionRef = collection(db, "breeds");
            const q = query(collectionRef, where("userEmail", "==", user?.email));
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => {
                const breedData: IBreedInfo = {
                    breedId: doc.id,
                    breedName: doc.data().breedName,
                }
                newBreedList.push(breedData);
            });
            setFavourite(newBreedList);

        } catch (error) {
            console.log(error);
            setFavourite([]);
        }
    }

    const addBreed = async (breedName: string) => {
        try {
            const document = {
                breedName: breedName,
                createdAt: new Date(),
                userEmail: user?.email,
            }

            console.log(document);
            await addDoc(collection(db, "breeds"), document).then(() => {
                toast.success("Add New Favourite Breed", {
                    position: "top-right",
                    autoClose: 500,
                    closeOnClick: true,
                })
            });
        } catch (error) {
            console.log(error);
        }
    }

    const deleteBreed = async (breedId: string) => {
        try {
            const deletedBreed = doc(db, "breeds", breedId)
            await deleteDoc(deletedBreed);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFavouriteBreeds();
    }, [])

    return <BreedContext.Provider value={{ favourite, addBreed, getFavouriteBreeds, deleteBreed }}>
        {children}
    </BreedContext.Provider>
}

export const useBreed = () => {
    return useContext(BreedContext);
}