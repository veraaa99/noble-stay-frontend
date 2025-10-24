import { dummyUsers } from "@/data/users"
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

    const [users, setUsers] = useState<User[]>([])
    const [currentUser, setCurrentUser] = useState<User | null>(defaultState.currentUser)

    useEffect(() => {
      _getUsers()
      _getCurrentUser()
    }, [])
    
    // Private functions
    const _getUsers = () => {
        setUsers(dummyUsers)
    }

     const _getCurrentUser = () => {
        setCurrentUser(null)
    }

    const _setUsers = (_users: User[]) => {
        setUsers(_users)
    }

    // Public functions
    const createUser: typeof defaultState.actions.createUser = (user: User) => {
        const updatedUsers: User[] = [...users, user]
        _setUsers(updatedUsers)
    }

    const setUser: typeof defaultState.actions.setUser = (user: User | null) => {
        setCurrentUser(user)
    }

    const actions = {
        createUser,
        setUser
    }

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