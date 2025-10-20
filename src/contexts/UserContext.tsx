import { createContext, useContext, type PropsWithChildren } from "react"

type UserState = {
    users: User[],
    currentUser: User | null,
    actions: {
        createUser: (user: User) => void
        setCurrentUser: (user: User | null) => void
    }
}

const defaultState: UserState = {
    users: [],
    currentUser: null,
    actions: {
        createUser: () => {},
        setCurrentUser: () => {}
    }
}

const UserContext = createContext<UserState>(defaultState) 

function UserProvider ({ children }: PropsWithChildren){
  return (
    <div>userContext</div>
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