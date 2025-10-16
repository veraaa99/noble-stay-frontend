import { dummyCastleListings } from "./castleListings.ts";
import { dummyGuests } from "./guests.ts";
import { dummyRooms } from "./rooms.ts";
import { dummyUsers } from "./users.ts";

export const dummyBookings: Booking[] = [
    // {
    //     bookingId: 1,
    //     castle: dummyCastleListings[0],
    //     bookedUser: dummyUsers[1],
    //     bookedDates: dummyCastleListings[0].dates,
    //     bookedRooms: [dummyCastleListings[0].rooms[0]],
    //     bookedGuests: [dummyCastleListings[0].guests[0]],
    //     bookedEvents: dummyCastleListings[0].events,
    //     totalPrice: dummyCastleListings[0].rooms[0].price * dummyCastleListings[0].guests[0].number
    // },
    {
        bookingId: 1,
        castle: dummyCastleListings[0],
        bookedUser: dummyUsers[1],
        bookedDates: ['2025-12-01', '2025-12-02', '2025-12-03'],
        bookedRooms: [dummyRooms[0]],
        bookedGuests: [dummyGuests[0]],
        bookedEvents: dummyCastleListings[0].events,
        totalPrice: dummyRooms[0].price * dummyGuests[0].number
    }
]