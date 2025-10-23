import { dummyCastleListings } from "@/data/castleListings";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

type CastleListingState = {
    listings: CastleListing[],
    selectedGuests: Guest[],
    actions: {
        createListing: (listing: CastleListing) => void;
        getListingsByFilter: (filter: string[]) => CastleListing[] | undefined;
        getListingByID: (listingId: CastleListing['id']) => CastleListing | undefined
        updateSelectedGuests: (guests: Guest[]) => void
    }
}

const defaultState: CastleListingState = {
    listings: [],
    selectedGuests: [
    {
        id: 1,
        category: 'adult',
        number: 0,
    },
    {
        id: 2,
        category: 'child',
        number: 0
    },
    {
        id: 3,
        category: 'pet',
        number: 0
    }
    ],
    actions: {
        createListing: () => {},
        getListingsByFilter: () => undefined,
        getListingByID: () => undefined,
        updateSelectedGuests: () => {}
    }
}

const CastleListingContext = createContext<CastleListingState>(defaultState) 

function CastleListingProvider ({ children }: PropsWithChildren){

    const [listings, setListings] = useState<CastleListing[]>(dummyCastleListings)
    const [selectedGuests, setSelectedGuests] = useState<Guest[]>(defaultState.selectedGuests)

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

    const _setSelectedGuests = (_guests: Guest[]) => {
        setSelectedGuests(_guests)
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

    const updateSelectedGuests = (guests: Guest[]) => {
        _setSelectedGuests(guests)
    }

    const actions = {
        createListing,
        getListingsByFilter,
        getListingByID,
        updateSelectedGuests
    }
  
    return (
    <CastleListingContext.Provider value={{
        listings,
        selectedGuests,
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