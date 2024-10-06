import { SyntheticEvent, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../../../assets'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCookies } from 'react-cookie';



const Login = () => {

  interface IError {
    email: string | null,
    password: string | null,
  }

  const innitialErrorState = {
    email: null,
    password: null,
  }
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookies] = useCookies(["userInfo"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<IError>(innitialErrorState);

  const navigate = useNavigate();

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;


  const validate = () => {
    setErrors(innitialErrorState);

    var errorMsg: IError = innitialErrorState;

    if (!EMAIL_REGEX.test(email)) {
      errorMsg.email = "Please Enter Valid Email";
    }

    if (!PASSWORD_REGEX.test(password)) {
      errorMsg.password = "Password must be at least 8 characters long and contain at least 1 letter and 1 number"
    }

    if (errorMsg.email || errorMsg.password) {
      setErrors(errorMsg);
      return false;
    }

    return true;
  }
  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {

      if (!validate()) {
        toast.error("Invalid Email or Password");
        return;
      }


      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      const user = {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      }

      setCookies("userInfo", user);

      navigate("/home", { replace: true });
    } catch (error: any) {
      toast.error("Login Failed! Incorrect Email or Password")
      console.log(error.code);
    }
  }

  return (
    <div className='flex flex-col items-center py-20 min-h-screen bg-true-gray-100'>
      <h1 className='font-futura font-semibold text-4xl mb-4'>
        Dog Image Collection
      </h1>

      <h2 className='font-futura underline mb-8'>
        Log In to view collection of beutiful dog images
      </h2>

      <form className='bg-white rounded shadow flex flex-col justify-center items-center px-10 py-6 gap-4 w-[30%]'>
        <h2 className='font-semibold font-futura text-2xl'>
          Log In
        </h2>
        <div className='w-full'>
          <label htmlFor="email"
            className='text-sm font-futura relative left-2'>
            Email
          </label>

          <input type="text" placeholder='Enter your email'
            className='shadow border rounded w-full py-2 pl-3 pr-8 focus:outline-none font-futura'
            onChange={(e) => setEmail(e.target.value)} />


          {
            errors.email && <span className='w-full text-sm font-futura text-red'>
              {errors.email}
            </span>
          }
        </div>

        <div className='w-full'>
          <label htmlFor="email"
            className='text-sm font-futura relative left-2'>
            Password
          </label>

          <div className='flex items-center justify-center relative'>
            <input type={showPassword ? "text" : "password"} placeholder='Enter your password'
              className='shadow border rounded w-full py-2 pl-3 pr-8 focus:outline-none font-futura'
              onChange={(e) => setPassword(e.target.value)} />

            <i className='absolute right-2 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}>
              {
                showPassword ? <EyeIcon /> : <EyeOffIcon />
              }
            </i>
          </div>

          {
            errors.password &&
            <span className='w-full text-sm font-futura text-justify text-red'>
              {errors.password}
            </span>
          }
        </div>



        <p className='font-futura self-end text-blue-700'>
          Do not have an account?
          <Link to="/signup" className='font-semibold hover:underline hover:text-yellow-700 pl-2 text-black' >Signup</Link>
        </p>

        <button
          className='py-2 px-6 border rounded-3xl border-yellow-700 text-yellow-700 font-futura hover:bg-yellow-100 mx-auto'
          onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  )
}

export default Login
