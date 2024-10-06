import React, { SyntheticEvent, useState } from 'react'
import { EyeIcon, EyeOffIcon } from '../../../assets'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { toast } from 'react-toastify';

const Signup = () => {

  interface IError {
    email: string | null,
    password: string | null,
    confirmPassword: string | null
  }

  const innitialErrorState = {
    email: null,
    password: null,
    confirmPassword: null,
  }


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<IError>(innitialErrorState);

  const navigate = useNavigate();

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const validate = async () => {
    setErrors(innitialErrorState);

    let errorMsg: IError = innitialErrorState;

    if (email == "" || !EMAIL_REGEX.test(email)) {
      errorMsg.email = "Please Enter Valid Email";
    }

    if (password == "" || !PASSWORD_REGEX.test(password)) {
      errorMsg.password = "Password must be at least 8 characters long and contain at least 1 letter and 1 number"
    }
    if (errorMsg.email || errorMsg.password) {
      setErrors(errorMsg);
      return false;
    }
    if (password !== confirmPassword) {
      errorMsg.password = "Password does not match";
      errorMsg.confirmPassword = "Password does not match";
      setErrors(errorMsg);
      return false;
    }

    return true;
  }


  const handleSignup = async (event: SyntheticEvent) => {
    event.preventDefault();
    const isValid = await validate();
    if (!isValid) {
      toast.error("Sign Up Failed! Invalid Email or Password")
      return;
    }
    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      toast.success("Sign Up Successfully")
      navigate("/");
    } catch (error: any) {
      var errMsg = "Sign Up Failed! Incorrect Email or Password";
      if (error.code === "auth/email-already-in-use") {
        errMsg = "Email already in use";
      }
      toast.error(errMsg);
      console.log("Error Code: ", error.code);
    }
  }

  return (
    <div className='flex flex-col items-center py-20 min-h-screen bg-true-gray-100'>
      <h1 className='font-futura font-semibold text-4xl mb-4'>
        Dog Image Collection
      </h1>

      <h2 className='font-futura underline mb-8'>
        Create new account
      </h2>

      <form className='bg-white rounded shadow flex flex-col justify-center items-center px-10 py-6 gap-4 w-[30%]'>
        <h2 className='font-semibold font-futura text-2xl'>
          Sign Up
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
            errors.password && <span className='w-full text-sm font-futura text-red'>
              {errors.password}
            </span>
          }
        </div>

        <div className='w-full'>
          <label htmlFor="email"
            className='text-sm font-futura relative left-2'>
            Confirm Password
          </label>

          <div className='flex items-center justify-center relative'>
            <input type={showConfirmPassword ? "text" : "password"} placeholder='Enter your password'
              className='shadow border rounded w-full py-2 pl-3 pr-8 focus:outline-none font-futura'
              onChange={(e) => setConfirmPassword(e.target.value)} />

            <i className='absolute right-2 cursor-pointer'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {
                showConfirmPassword ? <EyeIcon /> : <EyeOffIcon />
              }
            </i>
          </div>

          {
            errors.confirmPassword && <span className='w-full text-sm font-futura text-red'>
              {errors.confirmPassword}
            </span>
          }
        </div>

        <p className='font-futura self-end text-blue-700'>
          Already have an account?
          <Link to="/" className='font-semibold hover:underline hover:text-yellow-700 pl-2 text-black'>Login</Link>
        </p>

        <button
          className='py-2 px-6 border rounded-3xl border-yellow-700 text-yellow-700 font-futura hover:bg-yellow-100 mx-auto'
          onClick={handleSignup}>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup
