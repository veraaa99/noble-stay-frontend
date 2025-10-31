import { useEffect } from "react"
import { useCastleListing } from "@/contexts/CastleListingContext"

type GuestsCounterProps = {
    castleListing?: CastleListing | undefined,
}

const AddGuestsCounter = ({ castleListing }: GuestsCounterProps) => {
    const { selectedGuests, actions } = useCastleListing()
    const newAllGuests: Guest[] = [...selectedGuests]
    
    const checkMaxAmountOfGuests = () => {
        if(castleListing) {
            for (let i = 0; i < selectedGuests.length; i++) {
                if(selectedGuests[i].number > castleListing.guests[i].number) {
                    const updatedGuest: Guest = {
                        ...selectedGuests[i],
                        number: castleListing.guests[i].number
                    }
                    newAllGuests[i] = updatedGuest
                }
            }
            actions.updateSelectedGuests(newAllGuests)
        }
    }

    useEffect(() => {
        checkMaxAmountOfGuests()
    }, [])

    const handleAmountOfGuests = (category: guestCategory, type: 'add' | 'subtract') => {
        const guestIndex: number | undefined = newAllGuests.findIndex(g => g.category == category)
        const guestToUpdate: Guest | undefined = newAllGuests.find(g => g.category == category)
        const guestToUpdateCastleListing: Guest | undefined = castleListing?.guests.find(g => g.category == category)

        if (guestToUpdate != undefined && guestIndex != undefined) {
            let updatedGuest: Guest = guestToUpdate

            if(type == 'add') {
                if(guestToUpdateCastleListing && guestToUpdate.number >= guestToUpdateCastleListing.number) {
                    updatedGuest = {
                        ...guestToUpdate,
                        number: guestToUpdateCastleListing.number
                    }
                } else {
                    updatedGuest = {
                        ...guestToUpdate,
                        number: guestToUpdate.number + 1
                    }
                }
            } else if (type == 'subtract') {
                if(guestToUpdate.number == 0) {
                    updatedGuest = {
                    ...guestToUpdate,
                    number: guestToUpdate.number
                    }
                } else {
                    updatedGuest = {
                        ...guestToUpdate,
                        number: guestToUpdate.number - 1
                    }
                }
            }
            newAllGuests[guestIndex] = updatedGuest
            actions.updateSelectedGuests(newAllGuests)
        }
    }
    

  return (
    <div>
        <div>
            <div>
                <p>Adults</p>
                <p>Ages 13 or above</p>
            </div>
            <div>
                <button onClick={() => handleAmountOfGuests('adult', 'subtract')}>-</button>
                <p>{newAllGuests[0].number}</p>
                <button onClick={() => handleAmountOfGuests('adult', 'add')}>+</button>
            </div>
        </div>

        <div>
            <div>
                <p>Children</p>
                <p>Under 13</p>
            </div>
            <div>
                <button onClick={() => handleAmountOfGuests('child', 'subtract')}>-</button>
                <p>{newAllGuests[1].number}</p>
                <button onClick={() => handleAmountOfGuests('child', 'add')}>+</button>
            </div>
        </div>
        
        <div>
            <div>
                <p>Pets</p>
            </div>
            <div>
                <button onClick={() => handleAmountOfGuests('pet', 'subtract')}>-</button>
                <p>{newAllGuests[2].number}</p>
                <button onClick={() => handleAmountOfGuests('pet', 'add')}>+</button>
            </div>
        </div>
    </div>
  )
}
export default AddGuestsCounter