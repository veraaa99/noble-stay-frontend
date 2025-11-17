import axios from "@/axios_api/axios";
import { dummyCastleListings } from "@/data/castleListings";
import LocalStorageService from "@/utils/LocalStorageService";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { DateRange } from "react-day-picker";
import { useUser } from "./UserContext";

type CastleListingState = {
  listings: CastleListing[];
  selectedGuests: Guest[];
  selectedDates: DateRange | undefined;
  selectedRooms: Room[];
  filters: Filter[];
  filterCheckboxes: string[];
  actions: {
    updateListings: (listing: CastleListing) => void;
    updateListing: (listing: CastleListing) => void;
    getListingByID: (
      listingId: CastleListing["_id"]
    ) => CastleListing | undefined;
    // getListingsByUser: (user: User) => CastleListing[] | undefined;
    updateSelectedDates: (dates: DateRange | undefined) => void;
    updateSelectedGuests: (guests: Guest[]) => void;
    updateFilterboxes: (option: string) => void;
    updateSelectedRooms: (room: Room) => void;
    setSelectedFilters: (filters: Filter[]) => void;
    removeListing: (id: string) => void;
    resetFilters: () => void;
  };
};

const defaultState: CastleListingState = {
  listings: [],
  selectedGuests: [
    {
      // _id: 1,
      category: "adult",
      number: 0,
    },
    {
      // _id: 2,
      category: "child",
      number: 0,
    },
    {
      // _id: 3,
      category: "pet",
      number: 0,
    },
  ],
  selectedDates: {
    from: undefined,
    to: undefined,
  },
  selectedRooms: [],
  filters: [
    // {
    //   name: "size",
    //   options: ["50m²", "20m²", "100m²"],
    //   selectedOptions: [],
    // },
    {
      name: "number of rooms",
      options: [
        { id: "1", label: "1" },
        { id: "2", label: "2" },
        { id: "3", label: "3" },
        { id: "4", label: "4" },
        { id: "5", label: "5" },
      ],
      selectedOptions: [],
    },
    {
      name: "events",
      options: [
        { id: "ghost_hunting", label: "Ghost hunting" },
        { id: "dance_party", label: "Dance party" },
        { id: "photoshoot", label: "Photoshoot" },
        { id: "guided_tour", label: "Guided tour" },
      ],
      selectedOptions: [],
    },
    {
      name: "amneties",
      options: [
        { id: "pets_allowed", label: "Pets allowed" },
        { id: "breakfast_included", label: "Breakfast included" },
        { id: "lunch_included", label: "Lunch included" },
        { id: "gym_nearby", label: "Gym nearby" },
      ],
      selectedOptions: [],
    },
  ],
  filterCheckboxes: [],
  actions: {
    updateListings: () => {},
    updateListing: () => {},
    getListingByID: () => undefined,
    // getListingsByUser: () => undefined,
    updateSelectedDates: () => {},
    updateSelectedGuests: () => {},
    updateFilterboxes: () => {},
    updateSelectedRooms: () => {},
    setSelectedFilters: () => {},
    removeListing: () => {},
    resetFilters: () => {},
  },
};

const CastleListingContext = createContext<CastleListingState>(defaultState);

function CastleListingProvider({ children }: PropsWithChildren) {
  const [listings, setListings] = useState<CastleListing[]>(
    defaultState.listings
  );
  const [selectedGuests, setSelectedGuests] = useState<Guest[]>(
    defaultState.selectedGuests
  );
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(
    undefined
  );
  const [selectedRooms, setSelectedRooms] = useState<Room[]>(
    defaultState.selectedRooms
  );
  const [filters, setFilters] = useState<Filter[]>(defaultState.filters);
  const [filterCheckboxes, setFilterCheckboxes] = useState<string[]>(
    defaultState.filterCheckboxes
  );

  const { token } = useUser();

  useEffect(() => {
    _getListings();
    _getSelectedGuests();
    _getFilterCheckboxes();
    _getFilters();
    _getSelectedDates();
    _getSelectedRooms();
  }, []);

  // Private functions
  const _getListings = async () => {
    try {
      let res = await axios.get("/api/listings");
      if (res.status !== 200) return;

      LocalStorageService.setItem("@booking/listings", res.data);
      const _listings: CastleListing[] = LocalStorageService.getItem(
        "@booking/listings",
        res.data
      );

      setListings(_listings);
      return;
    } catch (error: any) {
      console.log(error.message);
      return;
    }
  };

  const _setSelectedGuests = (_guests: Guest[]) => {
    setSelectedGuests(_guests);
    sessionStorage.setItem("@booking/guests", JSON.stringify(_guests));
  };

  const _getSelectedGuests = () => {
    const storedGuests = sessionStorage.getItem("@booking/guests");

    if (storedGuests !== null) {
      const _selectedGuests: Guest[] = JSON.parse(storedGuests);
      setSelectedGuests(_selectedGuests);
    }
  };

  const _getFilters = () => {
    const _filters = LocalStorageService.getItem("@booking/filters", filters);
    setFilters(_filters);
  };

  const _getFilterCheckboxes = () => {
    const _filterCheckboxes = LocalStorageService.getItem(
      "@booking/checkboxes",
      filterCheckboxes
    );
    setFilterCheckboxes(_filterCheckboxes);
  };

  const _getSelectedDates = () => {
    const _selectedDates = LocalStorageService.getItem(
      "@booking/dates",
      selectedDates
    );

    if (
      _selectedDates !== undefined &&
      _selectedDates !== null &&
      _selectedDates.from !== undefined &&
      _selectedDates.to !== undefined
    ) {
      const startDate = new Date(_selectedDates.from.toString());
      const endDate = new Date(_selectedDates.to.toString());

      const newDateRange = { from: startDate, to: endDate };
      setSelectedDates(newDateRange);
    } else {
      setSelectedDates(_selectedDates);
    }
  };

  const _setSelectedDates = (_dates: DateRange | undefined) => {
    setSelectedDates(_dates);
    if (_dates == undefined) {
      LocalStorageService.setItem("@booking/dates", null);
    }
  };

  const _getSelectedRooms = () => {
    const _selectedRooms = LocalStorageService.getItem(
      "@booking/rooms",
      selectedRooms
    );
    if (_selectedRooms !== undefined) {
      setSelectedRooms(_selectedRooms);
    }
  };

  // Public functions
  //   const createListing: typeof defaultState.actions.createListing = async (
  //     listingInformation: ListingInputs
  //   ) => {
  //     try {
  //       console.log(token);
  //       const res = await axios.post("api/listings", listingInformation, {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //         },
  //       });

  //       if (res.status === 201) {
  //         const updatedListings: CastleListing[] = [...listings, res.data];
  //         setListings(updatedListings);
  //         LocalStorageService.setItem("@booking/listings", updatedListings);
  //       }
  //       return;
  //     } catch (error: any) {
  //       console.log(error.response?.data?.message || "Something went wrong");
  //     }
  //   };

  const updateListings: typeof defaultState.actions.updateListings = async (
    listing: CastleListing
  ) => {
    const updatedListings: CastleListing[] = [...listings, listing];
    setListings(updatedListings);
    LocalStorageService.setItem("@booking/listings", updatedListings);
  };

  const getListingByID: typeof defaultState.actions.getListingByID = (
    listingId: string
  ) => {
    const listingByID: CastleListing | undefined = listings.find(
      (listing) => listing._id == listingId
    );
    if (listingByID == undefined) {
      console.log("Error: Listing could not be found");
      return undefined;
    }

    return listingByID;
  };

  //   const getListingsByUser: typeof defaultState.actions.getListingsByUser = (
  //     user: User
  //   ) => {
  //     const newListings = [...listings];
  //     const userListings: CastleListing[] | undefined = newListings.filter(
  //       (listing) => listing.castleOwner._id == user._id
  //     );
  //     if (userListings == undefined || userListings.length == 0) {
  //       console.log("No listings made by this user");
  //       return undefined;
  //     }

  //     return userListings;
  //   };

  const updateSelectedDates: typeof defaultState.actions.updateSelectedDates = (
    dates: DateRange | undefined
  ) => {
    _setSelectedDates(dates);
    LocalStorageService.setItem<DateRange | undefined>("@booking/dates", dates);
  };

  const updateSelectedGuests: typeof defaultState.actions.updateSelectedGuests =
    (guests: Guest[]) => {
      _setSelectedGuests(guests);
      sessionStorage.setItem("@booking/guests", JSON.stringify(guests));
    };

  const updateFilterboxes: typeof defaultState.actions.updateFilterboxes = (
    option: string
  ) => {
    const updatedCheckboxes: string[] = [...filterCheckboxes];

    const optionAlreadySelected = updatedCheckboxes.find((b) => b == option);

    if (optionAlreadySelected) {
      const updatedSelectedOptions = updatedCheckboxes.filter(
        (o) => o !== option
      );
      setFilterCheckboxes(updatedSelectedOptions);
      LocalStorageService.setItem(
        "@booking/checkboxes",
        updatedSelectedOptions
      );
    } else {
      updatedCheckboxes.push(option);
      setFilterCheckboxes(updatedCheckboxes);
      LocalStorageService.setItem("@booking/checkboxes", updatedCheckboxes);
    }
  };

  const setSelectedFilters = (updatedFilters: Filter[]) => {
    // const _filters = LocalStorageService.getItem('@booking/filters', defaultState.filters);
    setFilters(updatedFilters);
    LocalStorageService.setItem("@booking/filters", updatedFilters);
  };

  const updateListing: typeof defaultState.actions.updateListing = async (
    listing: CastleListing
  ) => {
    const updatedListings = listings.map((l) => {
      if (l._id == listing._id) {
        return listing;
      } else {
        return l;
      }
    });
    setListings(updatedListings);
    LocalStorageService.setItem("@booking/listings", updatedListings);

    return;
  };

  const removeListing = async (id: string) => {
    const updatedListings = listings.filter((listing) => listing._id !== id);
    setListings(updatedListings);
    LocalStorageService.setItem("@booking/listings", updatedListings);

    console.log(updateListings);

    return;
  };

  const resetFilters: typeof defaultState.actions.resetFilters = () => {
    _setSelectedDates(undefined);
    _setSelectedGuests(defaultState.selectedGuests);

    const resetSelectedfilters = filters.map((filter) => {
      return { ...filter, selectedOptions: [] };
    });
    setSelectedFilters(resetSelectedfilters);

    setFilterCheckboxes([]);
    LocalStorageService.setItem("@booking/checkboxes", filterCheckboxes);
  };

  const updateSelectedRooms = (room: Room) => {
    let updatedSelectedRooms: Room[] = [...selectedRooms];
    const roomAlreadySelected = updatedSelectedRooms.find(
      (r) => r.title == room.title
    );
    if (roomAlreadySelected) {
      updatedSelectedRooms = updatedSelectedRooms.filter(
        (r) => r.title !== room.title
      );
    } else {
      updatedSelectedRooms = [...selectedRooms, room];
    }

    setSelectedRooms(updatedSelectedRooms);
    LocalStorageService.setItem("@booking/rooms", updatedSelectedRooms);
  };

  const actions = {
    updateListings,
    updateListing,
    getListingByID,
    // getListingsByUser,
    updateSelectedDates,
    updateSelectedGuests,
    updateFilterboxes,
    updateSelectedRooms,
    setSelectedFilters,
    removeListing,
    resetFilters,
  };

  return (
    <CastleListingContext.Provider
      value={{
        listings,
        selectedGuests,
        filters,
        selectedDates,
        selectedRooms,
        filterCheckboxes,
        actions,
      }}
    >
      {children}
    </CastleListingContext.Provider>
  );
}

function useCastleListing() {
  const context = useContext(CastleListingContext);
  if (context === undefined) {
    throw new Error(
      "useCastleListing must be called within a CastleListingProvider"
    );
  }
  return context;
}

export { CastleListingProvider, useCastleListing };
