import { useEffect, useState } from "react";
import UserContext from "./Context";
import { getUserAccount } from '../../services/userService'
const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        isAuthenticated: false,
        token: "",
        account: {}
    });

    const loginContext = (userData) => {
        setUser(userData)
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
                isAuthenticated: true,
                token: access_token,
                account: { getGroupWithRole, email, username }
            }
            setUser(data)
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return <UserContext.Provider value={{ user, loginContext, logout }}>
        {children}
    </UserContext.Provider>
}

export { UserProvider }