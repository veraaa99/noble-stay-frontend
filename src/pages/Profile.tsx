import { useUser } from "@/contexts/UserContext";
import Booking from "../components/Booking";
import CreatedListing from "../components/CreatedListing";
import ListingForm from "../components/ListingForm";
import { useEffect, useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { useCastleListing } from "@/contexts/CastleListingContext";
import axios from "@/axios_api/axios";
import UpdateListingForm from "@/components/UpdateListingForm";

const Profile = () => {
  const { currentUser, token } = useUser();
  const { actions } = useCastleListing();

  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [userListings, setUserListings] = useState<CastleListing[]>([]);
  const [user, setUser] = useState<User | undefined>();

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [castleToEdit, setCastleToEdit] = useState<CastleListing | null>(null);
  const [isListingUpdated, setIsListingUpdated] = useState<boolean>(false);

  const listingEditorHandler = (castle: CastleListing) => {
    setIsEditorModalOpen((isEditorModalOpen) => !isEditorModalOpen);

    if (castleToEdit == null) {
      setCastleToEdit(castle);
    } else {
      setCastleToEdit(null);
    }
    return;
  };

  const removeListingHandler = async (id: string) => {
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
    <div>
      {/* Full account information */}
      <div>
        {/* Title */}
        <h1>Profile</h1>
        {/* Account details */}
        <div>
          <h2>Account details</h2>
          <div>
            <h3>Email</h3>
            <p>{user?.email}</p>
            <hr />
            <h3>Mobile</h3>
            <p>{user?.phone}</p>
          </div>
        </div>

        {/* My bookings */}
        <div>
          <h2>My bookings</h2>
          {userBookings.length > 0 &&
            userBookings.map((b) => <Booking booking={b} />)}
        </div>

        {/* My listings */}
        <div>
          <h2>My listings</h2>
          {userListings.length > 0 &&
            userListings.map((c) => (
              <>
                <CreatedListing
                  castle={c}
                  listingEditorHandler={listingEditorHandler}
                  removeListingHandler={removeListingHandler}
                />
                {listingEditorHandler &&
                  castleToEdit !== null &&
                  castleToEdit == c && (
                    <div>
                      <h1>Edit castle {c.title}</h1>
                      <UpdateListingForm
                        castle={c}
                        listingEditorHandler={listingEditorHandler}
                        setIsListingUpdated={setIsListingUpdated}
                      />
                    </div>
                  )}
              </>
            ))}
        </div>

        {/* Create new castle listing */}
        <div>
          <h2>Create new castle listing</h2>
          <ListingForm setIsListingUpdated={setIsListingUpdated} />
        </div>
      </div>
    </div>
  );
};
export default Profile;
