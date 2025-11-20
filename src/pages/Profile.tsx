import { useUser } from "@/contexts/UserContext";
import Booking from "../components/Booking";
import CreatedListing from "../components/CreatedListing";
import ListingForm from "../components/ListingForm";
import { useEffect, useState } from "react";
import { useCastleListing } from "@/contexts/CastleListingContext";
import axios from "@/axios_api/axios";
import UpdateListingForm from "@/components/UpdateListingForm";

const Profile = () => {
  const { currentUser, token } = useUser();
  const { actions } = useCastleListing();

  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [userListings, setUserListings] = useState<CastleListing[]>([]);
  const [user, setUser] = useState<User | undefined>();

  const [castleToEdit, setCastleToEdit] = useState<CastleListing | null>(null);
  const [isListingUpdated, setIsListingUpdated] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const listingEditorHandler = (castle: CastleListing) => {
    if (castleToEdit == null) {
      setCastleToEdit(castle);
    } else {
      setCastleToEdit(null);
    }
    return;
  };

  const removeListingHandler = async (id: string) => {
    setLoading(true);

    try {
      let res = await axios.delete(`/api/listings/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 204) return;

      actions.removeListing(id);
      setIsListingUpdated((isListingUpdated) => !isListingUpdated);
    } catch (error: any) {
      console.log(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
    getUserBookings();
    getUserListings();
    actions.resetFilters();
  }, [isListingUpdated]);

  const getUserBookings = async () => {
    try {
      const res = await axios.get("/api/bookings", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) return;

      setUserBookings(res.data);
      return;
    } catch (err: any) {
      console.log(err.response?.data?.message || "Something went wrong");
      return;
    }
  };

  const getUserListings = async () => {
    try {
      const res = await axios.get("/api/listings/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) return;

      setUserListings(res.data);
      return;
    } catch (err: any) {
      console.log(err.response?.data?.message || "Something went wrong");
      return;
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get(`/api/users/${currentUser}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (res.status !== 200) return;

      setUser(res.data);

      return;
    } catch (err: any) {
      console.log(err.response?.data?.message || "Something went wrong");
      return;
    }
  };

  return (
    <div className="m-auto px-7 mt-5">
      {/* Full account information */}
      <div className="flex flex-col gap-5">
        {/* Title */}
        <h1>Profile</h1>
        {/* Account details */}
        <div>
          <h2>Account details</h2>
          <div className="border-1 border-(--color-gray) rounded-lg px-5 py-5 mt-3 sm:flex sm:px-12 sm:w-100 sm:items-center md:w-130">
            <div className="flex-flex-col gap-2 mb-3 sm:mb-0">
              <h3 className="text-(--very-dark-brown)">Email</h3>
              <p>{user?.email}</p>
            </div>
            <hr className="w-70 m-auto border-(--gray) sm:rotate-90 sm:w-10" />
            <div className="flex-flex-col gap-2 mt-3 sm:mt-0">
              <h3 className="text-(--very-dark-brown)">Mobile</h3>
              <p>{user?.phone}</p>
            </div>
          </div>
        </div>

        {/* My bookings */}
        <div className="flex flex-col gap-2">
          <h2>My bookings</h2>
          {userBookings.length > 0 ? (
            userBookings.map((b) => (
              <div className="border-1 border-(--color-gray) rounded-lg px-5 py-5 mt-3 sm:w-100 md:w-130">
                <Booking booking={b} />
              </div>
            ))
          ) : (
            <p className="caption mt-3">No bookings placed yet</p>
          )}
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          {userListings.length > 0 ? (
            userListings.map((c) => (
              <div className="border-1 border-(--color-gray) rounded-lg px-5 py-5 mt-3 sm:w-100 md:w-130">
                <CreatedListing
                  castle={c}
                  listingEditorHandler={listingEditorHandler}
                  removeListingHandler={removeListingHandler}
                  loading={loading}
                />
                {listingEditorHandler &&
                  castleToEdit !== null &&
                  castleToEdit == c && (
                    <div className="flex flex-col m-auto">
                      <h1 className="my-2">Edit castle {c.title}</h1>
                      <UpdateListingForm
                        castle={c}
                        listingEditorHandler={listingEditorHandler}
                        setIsListingUpdated={setIsListingUpdated}
                      />
                    </div>
                  )}
              </div>
            ))
          ) : (
            <p className="caption mt-3">No listings created yet</p>
          )}
        </div>

        {/* Create new castle listing */}
        <div>
          <h2>Create new castle listing</h2>
          <div className="border-1 border-(--color-gray) rounded-lg px-5 py-5 mt-3 sm:w-100 md:w-130">
            <ListingForm setIsListingUpdated={setIsListingUpdated} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
