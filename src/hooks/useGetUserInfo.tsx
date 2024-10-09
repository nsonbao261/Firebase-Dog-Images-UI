import { useCookies } from 'react-cookie'

const useGetUserInfo = () => {
    const [cookies, _] = useCookies(["userInfo"]);
    const user = cookies.userInfo;
    return {user};
}

export default useGetUserInfo
