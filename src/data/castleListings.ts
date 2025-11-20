import { dummyGuests } from "./guests.ts";
import { dummyRooms } from "./rooms.ts";
import { dummyUsers } from "./users.ts";

export const dummyCastleListings: CastleListing[] = [
  {
    _id: "1",
    title: "Castle 1",
    // Photo by Christer Lässman on Unsplash.com
    images: [
      "https://images.unsplash.com/photo-1715603518834-02ffe9f996f0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1472",
    ],
    location: "Örebro",
    description: "Lorem ipsum",
    amneties: [
      { id: "breakfast_included", label: "Breakfast included" },
      { id: "lunch_included", label: "Lunch included" },
      { id: "gym_nearby", label: "Gym nearby" },
    ],
    rules: [{ id: "no_smoking", label: "No smoking" }],
    dates: ["2025-12-01", "2025-12-02", "2025-12-03"],
    guests: dummyGuests,
    rooms: dummyRooms,
    castleOwner: dummyUsers[0],
    events: [{ id: "dance_party", label: "Dance party" }],
  },
];
