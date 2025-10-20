import { createContext, useContext, type PropsWithChildren } from "react"

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
  return (
    <div>CastleListingContext</div>
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