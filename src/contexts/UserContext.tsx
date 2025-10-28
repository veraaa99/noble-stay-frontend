import LocalStorageService from "@/utils/LocalStorageService"
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

type UserState = {
    users: User[],
    currentUser: User | null,
    actions: {
        createUser: (user: User) => void
        setUser: (user: User | null) => void
    }
}

const defaultState: UserState = {
    users: [],
    currentUser: null,
    actions: {
        createUser: () => {},
        setUser: () => {}
    }
}

const UserContext = createContext<UserState>(defaultState) 

function UserProvider ({ children }: PropsWithChildren){

    const [users, setUsers] = useState<User[]>(defaultState.users)
    const [currentUser, setCurrentUser] = useState<User | null>(defaultState.currentUser)

    useEffect(() => {
      _getUsers()
      _getCurrentUser()
    }, [])
    
    // Private functions
    const _getUsers = () => {
        const _users = LocalStorageService.getItem('@booking/users', defaultState.users)
        setUsers(_users)
    }

     const _getCurrentUser = () => {
        const _currentUser = LocalStorageService.getItem('@booking/currentUser', defaultState.currentUser)
        setCurrentUser(_currentUser)
    }

    // Public functions
    const createUser: typeof defaultState.actions.createUser = (user: User) => {
        const updatedUsers: User[] = [...users, user]
        LocalStorageService.setItem('@booking/users', updatedUsers)
        setUsers(updatedUsers)
        setUser(user)
    }

    const setUser: typeof defaultState.actions.setUser = (user: User | null) => {
        LocalStorageService.setItem('@booking/currentUser', user)
        setCurrentUser(user)
    }

    const actions = {
        createUser,
        setUser
    }

    // TODO: Add sessionstorage when registered/logged in?

  return (
    <UserContext.Provider value={{
        users,
        currentUser,
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