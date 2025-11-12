type amnityCategory = 'pets allowed' | 'gym nearby' | 'breakfast included'
type guestCategory = 'adult' | 'child' | 'pet'
type eventCategory = 'ghost hunting' | 'dance night' | 'ball' | 'photoshoot'

type RegisterInputs = {
  email: string, 
  phone: string,
  password: string,
  confirmPassword: string
}

type LoginInputs = {
  email: string, 
  password: string
}

type BookingInputs = {
    castleId: string,
    bookedDates: Date[],
    bookedRooms: Room[],
    bookedGuests: Guest[],
    bookedEvents?: eventCategory[]
}

type CastleListing = {
    _id: string,
    title: string,
    images: string[],
    location: string,
    description: string,
    amneties?: amnityCategory[],
    rules: string[],
    dates: string[],
    guests: Guest[],
    rooms: Room[],

    castleOwner: User,

    isEventAvaliable: boolean,
    events?: eventCategory[]
}

type Booking = {
    _id: string,
    castleId: CastleListing,

    bookedUser: User,
    bookedDates: Date[],
    bookedRooms: Room[],
    bookedGuests: Guest[],
    bookedEvents?: eventCategory[],
    
    totalPrice: number
}

type Room = {
    // _id: number,
    title: string,
    caption: string,
    description: string[],
    price: number
}

type User = {
    _id: string,
    email: string,
    phone: string,
    password: string,
}

type Guest = {
    // _id: number,
    category: guestCategory,
    number: number,
}

type Filter = {
    name: string,
    options: string[],
    selectedOptions: string[]
    // ändra selectedoptions så den har key-value par
}