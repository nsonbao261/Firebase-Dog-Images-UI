import React from 'react'
import { useCookies } from 'react-cookie'

const useGetUserInfo = () => {
    const [cookies, setCookies] = useCookies(["userInfo"]);
    const user = cookies.userInfo;
    return {user};
}

export default useGetUserInfo
