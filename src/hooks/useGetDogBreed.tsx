import axios from "axios";
import { useState } from "react"

const useGetDogBreed = () => {

    const [dogBreeds, setDogBreeds] = useState<null | string[]>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get<any>("https://dog.ceo/api/breeds/list/all")
            setDogBreeds(Object.keys(response.data.message));
        } catch (error) {
            console.log(error);
            setDogBreeds(null);
        }

    }

    fetchData();

    return { dogBreeds }
}

export default useGetDogBreed
