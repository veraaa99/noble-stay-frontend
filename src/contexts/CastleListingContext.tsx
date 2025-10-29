import { dummyCastleListings } from "@/data/castleListings";
import LocalStorageService from "@/utils/LocalStorageService";
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react"
import type { DateRange } from "react-day-picker";

type CastleListingState = {
    listings: CastleListing[],
    selectedGuests: Guest[],
    selectedDates: DateRange | undefined,
    filters: Filter[],
    filterCheckboxes: string[],
    actions: {
        createListing: (listing: CastleListing) => void;
        getListingByID: (listingId: CastleListing['id']) => CastleListing | undefined;
        getListingsByUser: (user: User) => CastleListing[] | undefined;
        updateSelectedDates: (dates: DateRange | undefined) => void;
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
    selectedDates: {
        from: new Date(),
        to: new Date(new Date().getDate() + 2),
    },
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
        getListingByID: () => undefined,
        getListingsByUser: () => undefined,
        updateSelectedDates: () => {},
        updateSelectedGuests: () => {},
        updateFilterboxes: () => {}
    }
}

const CastleListingContext = createContext<CastleListingState>(defaultState) 

function CastleListingProvider ({ children }: PropsWithChildren){

    const [listings, setListings] = useState<CastleListing[]>(defaultState.listings)
    const [selectedGuests, setSelectedGuests] = useState<Guest[]>(defaultState.selectedGuests)
    const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(undefined)
    const [filters, setFilters] = useState<Filter[]>(defaultState.filters)
    const [filterCheckboxes, setFilterCheckboxes] = useState<string[]>(defaultState.filterCheckboxes)

    useEffect(() => {
        _getListings()
        _getSelectedGuests()
    }, [])
    
    // Private functions 
    const _getListings = () => { 
        const _listings: CastleListing[] = LocalStorageService.getItem('@booking/listings', defaultState.listings)
        setListings(_listings)
    }

    const _setSelectedGuests = (_guests: Guest[]) => {
        setSelectedGuests(_guests)
        LocalStorageService.setItem('@booking/guests', _guests)
    }

    const _getSelectedGuests = () => {
        const _selectedGuests: Guest[] = LocalStorageService.getItem('@booking/guests', defaultState.selectedGuests)
        setSelectedGuests(_selectedGuests)
    }

    // set and get filters?

    // Public functions
    const createListing: typeof defaultState.actions.createListing = (listing: CastleListing) => {
        const updatedListings: CastleListing[] = [...listings, listing]
        setListings(updatedListings)
        LocalStorageService.setItem<CastleListing[]>('@booking/listings', updatedListings)
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

    const updateSelectedDates: typeof defaultState.actions.updateSelectedDates = (dates: DateRange | undefined) => {
        setSelectedDates(dates)
        LocalStorageService.setItem<DateRange |undefined>('@booking/dates', dates)
    }

    const updateSelectedGuests: typeof defaultState.actions.updateSelectedGuests = (guests: Guest[]) => {
        _setSelectedGuests(guests)
        LocalStorageService.setItem<Guest[]>('@booking/guests', guests)
    }
    
    const updateFilterboxes: typeof defaultState.actions.updateFilterboxes = (option: string) => {
        setFilterCheckboxes(prev => {
        if (prev.includes(option)) {
            return prev.filter(x => x !== option);
        } else {
            return [...prev, option];
        }
        });
        // Ändra den här funktionen så att filtercheckboxes bara sparas i localstorage?
    }

    const actions = {
        createListing,
        getListingByID,
        getListingsByUser,
        updateSelectedDates,
        updateSelectedGuests,
        updateFilterboxes
    }
  
    return (
    <CastleListingContext.Provider value={{
        listings,
        selectedGuests,
        filters,
        selectedDates,
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