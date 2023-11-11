import { useEffect, useState } from "react";
import UserContext from "./Context";
import { getUserAccount } from '../../services/userService'
import { useHistory, useLocation } from "react-router-dom";
import { logoutUser } from '../../services/userService'
import { toast } from 'react-toastify';

const UserProvider = ({ children }) => {
    const location = window.location.pathname
    const history = useHistory();

    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    };

    const logoutContext = async () => {
        let data = await logoutUser() // delete cookie from call aip
        localStorage.removeItem('jwt') // delete jwt in localStorage
        setUser({ ...userDefault, isLoading: false }) // clear user in context
        if (data && +data.EC === 0) {
            toast.success(data.EM)
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    };

    const fetchUser = async () => {
        let response = await getUserAccount()

        if (response && +response.EC === 0) {
            //success
            let { getGroupWithRole, email, username, access_token } = response.DT
            let data = {
                isLoading: false,
                isAuthenticated: true,
                token: access_token,
                account: { getGroupWithRole, email, username }
            }
            setUser(data)
        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }

    useEffect(() => {
        if (location !== '/' && location !== '/login') {
            fetchUser()
        } else {
            setUser({ ...user, isLoading: false })
        }
    }, []);


    return <UserContext.Provider value={{ user, loginContext, logoutContext }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider }