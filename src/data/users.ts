import { dummyBookings } from "./bookings";
import { dummyCastleListings } from "./castleListings";

export const dummyUsers: User[] = [
    {
        id: 1,
        email: 'test@mail.com',
        phone: '+46721234567',
        password: '12345678910',
        bookings: [],
        listings: [dummyCastleListings[0]]
    },
    {
        id: 2,
        email: 'test2@mail.com',
        phone: '+46727654321',
        password: '10987654321',
        bookings: [dummyBookings[0]],
        listings: []
    }
]