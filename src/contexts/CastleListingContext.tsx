import { dummyCastleListings } from "@/data/castleListings";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"

type CastleListingState = {
    listings: CastleListing[],
    selectedGuests: Guest[],
    filters: Filter[],
    filterCheckboxes: string[],
    actions: {
        createListing: (listing: CastleListing) => void;
        getListingsByFilter: (filter: string[]) => CastleListing[] | undefined;
        getListingByID: (listingId: CastleListing['id']) => CastleListing | undefined;
        getListingsByUser: (user: User) => CastleListing[] | undefined;
        updateSelectedGuests: (guests: Guest[]) => void;
        updateFilterboxes: (option: string) => void
    }
}

const defaultState: CastleListingState = {
    listings: dummyCastleListings,
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
    filters: [
    {
        name: 'Size',
        options: ['50m²', '20m²', '100m²'],
        selectedOptions: []
    },
    {
        name: 'Number of rooms',
        options: ['1', '2', '3', '4', '5'],
        selectedOptions: []
    },
    {
        name: 'Events',
        options: ['Ghost hunting', 'Dance party', 'Photoshoot', 'Guided tour'],
        selectedOptions: []
    },
    {
        name: 'Amneties',
        options: ['Pets allowed', 'Breakfast included', 'Lunch included', 'Gym nearby'],
        selectedOptions: []
    }
    ],
    filterCheckboxes: [],
    actions: {
        createListing: () => {},
        getListingsByFilter: () => undefined,
        getListingByID: () => undefined,
        getListingsByUser: () => undefined,
        updateSelectedGuests: () => {},
        updateFilterboxes: () => {}
    }
}

const CastleListingContext = createContext<CastleListingState>(defaultState) 

function CastleListingProvider ({ children }: PropsWithChildren){

    const [listings, setListings] = useState<CastleListing[]>(defaultState.listings)
    const [selectedGuests, setSelectedGuests] = useState<Guest[]>(defaultState.selectedGuests)
    const [filters, setFilters] = useState<Filter[]>(defaultState.filters)
    const [filterCheckboxes, setFilterCheckboxes] = useState<string[]>(defaultState.filterCheckboxes)

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
        const updatedListings: CastleListing[] = [...listings, listing]
        _setListings(updatedListings)
    }

    const getListingsByFilter: typeof defaultState.actions.getListingsByFilter = (filter: string[])  => { 
        //TODO: If no filters, return all castles. Else, only return castles with matching filters
        
        return dummyCastleListings
    }

    const getListingByID: typeof defaultState.actions.getListingByID = (listingId: number) => {
        const listingByID: CastleListing | undefined = listings.find(listing => listing.id == listingId)
        if(listingByID == undefined) {
            console.log('Error: Listing could not be found')
            return undefined
        }
        
        return listingByID
    }

    const getListingsByUser: typeof defaultState.actions.getListingsByUser = (user: User) => {
        const newListings = [...listings]
        const userListings: CastleListing[] | undefined = newListings.filter(listing => listing.castleOwner.id == user.id)
        if(userListings == undefined || userListings.length == 0) {
            console.log('No listings made by this user')
            return undefined
        }
        
        return userListings
    }

    const updateSelectedGuests: typeof defaultState.actions.updateSelectedGuests = (guests: Guest[]) => {
        _setSelectedGuests(guests)
    }

    const updateFilterboxes: typeof defaultState.actions.updateFilterboxes = (option: string) => {
        setFilterCheckboxes(prev => {
        if (prev.includes(option)) {
            // set in localstorage?
            return prev.filter(x => x !== option);
        } else {
            return [...prev, option];
        }
        });
    }

    // updatefilter?

    const actions = {
        createListing,
        getListingsByFilter,
        getListingByID,
        getListingsByUser,
        updateSelectedGuests,
        updateFilterboxes
    }
  
    return (
    <CastleListingContext.Provider value={{
        listings,
        selectedGuests,
        filters,
        filterCheckboxes,
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