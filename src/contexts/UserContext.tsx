import axios from "@/axios_api/axios"
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

type UserState = {
    // users: User[],
    currentUser: { _id: string } | null,
    token: string | null,
    actions: {
        createUser: (userinformation: RegisterInputs) => void
        loginUser: (userinformation: LoginInputs) => void
        // setUser: (user: User | null) => void
        logoutUser: () => void
    }
}

const defaultState: UserState = {
    // users: [],
    currentUser: null,
    token: null,
    actions: {
        createUser: () => {},
        loginUser: () => {},
        // setUser: () => {},
        logoutUser: () => {}
    }
}

const UserContext = createContext<UserState>(defaultState) 

function UserProvider ({ children }: PropsWithChildren){

    const [currentUser, setCurrentUser] = useState<{ _id: string } | null>(null)
    const [token, setToken] = useState<string | null>('')

    useEffect(() => {
        const checkToken = async() => {
            try {
                const token = sessionStorage.getItem('jwt')
                if(!token) return

                const res = await axios.get('api/users/check', {
                    headers: {
                        authorization: `Bearer ${sessionStorage.getItem('jwt') || ''}`
                    }
                })

                if(res.status === 200) {
                    setToken(sessionStorage.getItem('jwt'))
                    setCurrentUser(res.data._id)
                }

            } catch(error: any) {
                console.log(error.message)
                sessionStorage.removeItem('jwt')
                return
            }
        }
        checkToken()
    }, [])

    // useEffect(() => {
    // //   _getUsers()
    // //   _getCurrentUser()
    // }, [])
    
    // Private functions
    // const _getUsers = () => {
    //     const _users = LocalStorageService.getItem('@booking/users', defaultState.users)
    //     setUsers(_users)
    // }

    //  const _getCurrentUser = () => {
    //     const _currentUser = sessionStorage.getItem('@booking/currentUser')
    //     setCurrentUser(_currentUser)
    // }

    // Public functions
    const createUser: typeof defaultState.actions.createUser = async(userinformation: RegisterInputs) => {
        const res = await axios.post('api/users/register', userinformation)

        if(res.status !== 201) return
        
        setToken(res.data.userToken)
        setCurrentUser(res.data._id)

        sessionStorage.setItem('jwt', res.data.userToken)
        // sessionStorage.setItem('@booking/currentUser', res.data._id)

        // const updatedUsers: User[] = [...users, user]
        // LocalStorageService.setItem('@booking/users', updatedUsers)
        // setUsers(updatedUsers)
        // setUser(user)
    }

    const loginUser: typeof defaultState.actions.loginUser = async(userinformation: LoginInputs) => {
        const res = await axios.post('api/users/login', userinformation)
        console.log(res)
        if(res.status !== 200) return
                
        setToken(res.data.userToken)
        setCurrentUser(res.data._id)
        
        sessionStorage.setItem('jwt', res.data.userToken)
        // sessionStorage.setItem('@booking/currentUser', res.data._id)
    }

    // const setUser: typeof defaultState.actions.setUser = (user: User | null) => {
    //     LocalStorageService.setItem('@booking/currentUser', user)
    //     setCurrentUser(user)
    // }

    const logoutUser: typeof defaultState.actions.logoutUser = () => {
        sessionStorage.removeItem('jwt')
        // sessionStorage.removeItem('@booking/currentUser')
        setToken(null)
        setCurrentUser(null)
        return
    }

    const actions = {
        createUser,
        loginUser,
        // setUser,
        logoutUser
    }

  return (
    <UserContext.Provider value={{
        // users,
        currentUser,
        token,
        actions
    }}>
        { children }
    </UserContext.Provider>
  )
}

function useUser() {
    const context = useContext(UserContext)
     if( context === undefined ) {
        throw new Error('useUser must be called within a UserProvider')
    }
    return context
}

export { UserProvider, useUser }