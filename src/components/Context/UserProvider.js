import { useEffect, useState } from "react";
import UserContext from "./Context";
import { getUserAccount } from '../../services/userService'
import { useLocation } from "react-router-dom";
const UserProvider = ({ children }) => {
    const location = window.location.pathname
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

    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
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
        if (location && (location.pathname !== '/' || location.pathname !== '/login')) {
            fetchUser()
        }
    }, []);

    return <UserContext.Provider value={{ user, loginContext, logout }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider }