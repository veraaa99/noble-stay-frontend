import { dummyCastleListings } from "@/data/castleListings";
import { createContext, useContext, useState, type PropsWithChildren } from "react"

type CastleListingState = {
    listings: CastleListing[],
    actions: {
        createListing: (listing: CastleListing) => void;
        getListings: (filter: string[]) => CastleListing[] | null;
        getListingByID: (listingId: CastleListing['id']) => CastleListing | null
    }
}

const defaultState: CastleListingState = {
    listings: [],
    actions: {
        createListing: () => {},
        getListings: () => null,
        getListingByID: () => null
    }
}

const CastleListingContext = createContext<CastleListingState>(defaultState) 

function CastleListingProvider ({ children }: PropsWithChildren){

    const [listings, setListings] = useState(dummyCastleListings) 

    const createListing: typeof defaultState.actions.createListing = (listing: CastleListing) => {
        return
    }

    const getListings: typeof defaultState.actions.getListings = (filter: string[]) => { 
        return dummyCastleListings
    }

    const getListingByID: typeof defaultState.actions.getListingByID = (listingId: number) => {
        return dummyCastleListings[0]
    }

    const actions = {
        createListing,
        getListings,
        getListingByID
    }
  
    return (
    <CastleListingContext.Provider value={{
        listings,
        actions
    }}>
        { children }
    </CastleListingContext.Provider>
  )
}

function useCastleListing() {
    const context = useContext(CastleListingContext)
     if( context === undefined ) {
        throw new Error('useCastleListing must be called within a CastleListingProvider')
    }
    return context
}

export { CastleListingProvider, useCastleListing }