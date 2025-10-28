type amnityCategory = 'pets allowed' | 'gym nearby' | 'breakfast included'
type guestCategory = 'adult' | 'child' | 'pet'
type eventCategory = 'ghost hunting' | 'dance night' | 'ball' | 'photoshoot'

type CastleListing = {
    id: number,
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
    bookingId: number,
    castle: CastleListing,

    bookedUser: User,
    bookedDates: string[],
    bookedRooms: Room[],
    bookedGuests: Guest[],
    bookedEvents?: eventCategory[],
    
    totalPrice: number
}

type Room = {
    id: number,
    title: string,
    caption: string,
    description: string[],
    price: number
}

type User = {
    id: number,
    email: string,
    phone: string,
    password: string,
}

type Guest = {
    id: number,
    category: guestCategory,
    number: number,
}

type Filter = {
    name: string,
    options: string[],
    selectedOptions: string[]
}