import { signOut } from "firebase/auth";
import { SyntheticEvent } from "react"
import { auth } from "../../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const DefaultHeader = () => {
    const [cookies, _, removeCookies] = useCookies(["userInfo"]);


    const navigate = useNavigate();
    const handleSignout = (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            signOut(auth);
            removeCookies("userInfo");

            navigate("/", { replace: true });

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex items-center justify-between font-futura px-6 py-3 bg-yellow-900'>
            <h2 className='text-white text-3xl font-semibold'>
                Dog Image Collection
            </h2>

            <button className='text-white rounded-full font-semibold hover:underline'
                onClick={handleSignout}>
                Logout
            </button>
        </div>
    )
}

export default DefaultHeader
