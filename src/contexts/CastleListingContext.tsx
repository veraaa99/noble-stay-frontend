import { dummyCastleListings } from "@/data/castleListings";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

type CastleListingState = {
    listings: CastleListing[],
    actions: {
        createListing: (listing: CastleListing) => void;
        getListingsByFilter: (filter: string[]) => CastleListing[] | undefined;
        getListingByID: (listingId: CastleListing['id']) => CastleListing | undefined
    }
}

const defaultState: CastleListingState = {
    listings: [],
    actions: {
        createListing: () => {},
        getListingsByFilter: () => undefined,
        getListingByID: () => undefined
    }
}

const CastleListingContext = createContext<CastleListingState>(defaultState) 

function CastleListingProvider ({ children }: PropsWithChildren){

    const [listings, setListings] = useState<CastleListing[]>(dummyCastleListings)

    useEffect(() => {
        _getListings()
    }, [])
    
    // Private functions 
    const _getListings = () => { 
        setListings(dummyCastleListings)
    }

    const _setListings = (_listings: CastleListing[]) => {
        setListings(dummyCastleListings)
    }

    // Public functions
    const createListing: typeof defaultState.actions.createListing = (listing: CastleListing) => {
        const updatedListings = [...listings, listing]
        _setListings(updatedListings)
    }

    const getListingsByFilter: typeof defaultState.actions.getListingsByFilter = (filter: string[])  => { 
        //TODO: If no filters, return all castles. Else, only return castles with matching filters
        
        return dummyCastleListings
    }

    const getListingByID: typeof defaultState.actions.getListingByID = (listingId: number) => {
        const castleListing = dummyCastleListings.find(listing => listing.id == listingId)
        if(castleListing == undefined) {
            console.log('Error: Listing could not be found')
            return castleListing
        }
        
        return castleListing
    }

    const actions = {
        createListing,
        getListingsByFilter,
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