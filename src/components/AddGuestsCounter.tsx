import { useState } from "react"
import { dummyGuests } from "../data/guests"

const AddGuestsCounter = () => {

    const [allGuests, setAllGuests] = useState<Guest[]>(dummyGuests)

    const handleAmountOfGuests = (category: guestCategory, type: 'add' | 'subtract') => {
        const newAllGuests = [...allGuests]
        const guestIndex: number | undefined = newAllGuests.findIndex(g => g.category == category)
        const guestToUpdate: Guest | undefined = newAllGuests.find(g => g.category == category)

        if (guestToUpdate != undefined && guestIndex != undefined) {
            if(type == 'add') {
                const updatedGuest: Guest = {
                    ...guestToUpdate,
                    number: guestToUpdate.number++
                }
                newAllGuests[guestIndex] = updatedGuest
                setAllGuests(newAllGuests)
                console.log(allGuests)

            } else if (type == 'subtract') {
                const updatedGuest: Guest = {
                    ...guestToUpdate,
                    number: guestToUpdate.number--
                }
                newAllGuests[guestIndex] = updatedGuest
                setAllGuests(newAllGuests)
                console.log(allGuests)
            }
            return allGuests
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
                <p>{allGuests[0].number}</p>
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
                <p>{allGuests[1].number}</p>
                <button onClick={() => handleAmountOfGuests('child', 'add')}>+</button>
            </div>
        </div>
        
        <div>
            <div>
                <p>Pets</p>
            </div>
            <div>
                <button onClick={() => handleAmountOfGuests('pet', 'subtract')}>-</button>
                <p>{allGuests[2].number}</p>
                <button onClick={() => handleAmountOfGuests('pet', 'add')}>+</button>
            </div>
        </div>
    </div>
  )
}
export default AddGuestsCounter