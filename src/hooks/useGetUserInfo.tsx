import React from 'react'
import { useCookies } from 'react-cookie'

const useGetUserInfo = () => {
    const [cookies, setCookies] = useCookies(["userInfo"]);
    return cookies.userInfo
}

export default useGetUserInfo
