type amnityCategory =
  | { id: "pets_allowed"; label: "Pets allowed" }
  | { id: "breakfast_included"; label: "Breakfast included" }
  | { id: "lunch_included"; label: "Lunch included" }
  | { id: "gym_nearby"; label: "Gym nearby" };
type guestCategory = "adult" | "child" | "pet";
type eventCategory =
  | { id: "ghost_hunting"; label: "Ghost hunting" }
  | { id: "dance_party"; label: "Dance party" }
  | { id: "photoshoot"; label: "Photoshoot" }
  | { id: "guided_tour"; label: "Guided tour" };

type RegisterInputs = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

type LoginInputs = {
  email: string;
  password: string;
};

type BookingInputs = {
  castle: string;
  bookedDates: Date[];
  bookedRooms: Room[];
  bookedGuests: Guest[];
};

type ListingInputs = {
  title: string;
  images: string[];
  location: string;
  description: string;

  amneties?: amnityCategory[];
  rules: rulesCategory[];
  dates: {
    from: Date | undefined;
    to?: Date | undefined;
  };
  guests: Guest[];
  rooms: Room[];

  events?: eventCategory[];
};

type CastleListing = {
  _id: string;
  title: string;
  images: string[];
  location: string;
  description: string;
  amneties?: amnityCategory[];
  rules: rulesCategory[];
  dates: string[];
  guests: Guest[];
  rooms: Room[];

  castleOwner: User;

  events?: eventCategory[];
};

type Booking = {
  _id: string;
  castle: CastleListing;

  bookedUser: User;
  bookedDates: Date[];
  bookedRooms: Room[];
  bookedGuests: Guest[];

  totalPrice: number;
};

type Room = {
  title: string;
  caption: string;
  description: string[];
  price: number;
};

type User = {
  _id: string;
  email: string;
  phone: string;
  password: string;
};

type Guest = {
  category: guestCategory;
  number: number;
};

type Filter = {
  name: string;
  options: FilterOption[];
  selectedOptions: string[];
};

type FilterOption = {
  id: string;
  label: string;
};
