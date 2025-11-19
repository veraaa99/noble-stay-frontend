import { useEffect } from "react";
import { useCastleListing } from "@/contexts/CastleListingContext";

type GuestsCounterProps = {
  castleListing?: CastleListing | undefined;
  onChange?: (...event: any[]) => void;
  selected?: any;
};

const AddGuestsCounter = ({
  castleListing,
  onChange,
  selected,
}: GuestsCounterProps) => {
  const { selectedGuests, actions } = useCastleListing();
  const newAllGuests: Guest[] = [...selectedGuests];

  const checkMaxAmountOfGuests = () => {
    if (castleListing) {
      for (let i = 0; i < selectedGuests.length; i++) {
        if (selectedGuests[i].number > castleListing.guests[i].number) {
          const updatedGuest: Guest = {
            ...selectedGuests[i],
            number: castleListing.guests[i].number,
          };
          newAllGuests[i] = updatedGuest;
        }
      }
      actions.updateSelectedGuests(newAllGuests);
    }
  };

  useEffect(() => {
    checkMaxAmountOfGuests();
  }, []);

  const handleAmountOfGuests = (
    category: guestCategory,
    type: "add" | "subtract"
  ) => {
    const guestIndex: number | undefined = newAllGuests.findIndex(
      (g) => g.category == category
    );
    const guestToUpdate: Guest | undefined = newAllGuests.find(
      (g) => g.category == category
    );
    const guestToUpdateCastleListing: Guest | undefined =
      castleListing?.guests.find((g) => g.category == category);

    if (guestToUpdate != undefined && guestIndex != undefined) {
      let updatedGuest: Guest = guestToUpdate;

      if (type == "add") {
        if (
          guestToUpdateCastleListing &&
          guestToUpdate.number >= guestToUpdateCastleListing.number
        ) {
          updatedGuest = {
            ...guestToUpdate,
            number: guestToUpdateCastleListing.number,
          };
        } else {
          updatedGuest = {
            ...guestToUpdate,
            number: guestToUpdate.number + 1,
          };
        }
      } else if (type == "subtract") {
        if (guestToUpdate.number == 0) {
          updatedGuest = {
            ...guestToUpdate,
            number: guestToUpdate.number,
          };
        } else {
          updatedGuest = {
            ...guestToUpdate,
            number: guestToUpdate.number - 1,
          };
        }
      }
      newAllGuests[guestIndex] = updatedGuest;
      actions.updateSelectedGuests(newAllGuests);

      if (onChange) {
        onChange(newAllGuests);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="border-2 rounded-lg grid grid-cols-3 px-3 py-1 items-center">
        <div className="col-span-2">
          <p>Adults</p>
          <p className="caption">Ages 13 or above</p>
        </div>
        <div className="grid grid-cols-3 items-center">
          <button
            className="col-span-1 border-2 rounded-full border-(-color--gray) px-2 text-3xl font-light text-center"
            onClick={(e) => {
              e.preventDefault(), handleAmountOfGuests("adult", "subtract");
            }}
          >
            -
          </button>
          <p className="col-span-1 text-center">
            {selected ? selected[0].number : newAllGuests[0].number}
          </p>
          <button
            className="col-span-1 border-2 rounded-full border-(-color--gray) px-2 text-3xl font-light"
            onClick={(e) => {
              e.preventDefault(), handleAmountOfGuests("adult", "add");
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="border-2 rounded-lg grid grid-cols-3 px-3 py-1 items-center">
        <div className="col-span-2">
          <p>Children</p>
          <p className="caption">Under 13</p>
        </div>
        <div className="grid grid-cols-3 items-center">
          <button
            className="col-span-1 border-2 rounded-full border-(-color--gray) px-2 text-3xl font-light text-center"
            onClick={(e) => {
              e.preventDefault(), handleAmountOfGuests("child", "subtract");
            }}
          >
            -
          </button>
          <p className="col-span-1 text-center">
            {selected ? selected[1].number : newAllGuests[1].number}
          </p>
          <button
            className="col-span-1 border-2 rounded-full border-(-color--gray) px-2 text-3xl font-light"
            onClick={(e) => {
              e.preventDefault(), handleAmountOfGuests("child", "add");
            }}
          >
            +
          </button>
        </div>
      </div>

      <div className="border-2 rounded-lg grid grid-cols-3 px-3 py-1 items-center">
        <div className="col-span-2">
          <p>Pets</p>
        </div>
        <div className="grid grid-cols-3 items-center">
          <button
            className="border-2 rounded-full border-(-color--gray) px-2 text-3xl font-light text-center"
            onClick={(e) => {
              e.preventDefault(), handleAmountOfGuests("pet", "subtract");
            }}
          >
            -
          </button>
          <p className="col-span-1 text-center">
            {selected ? selected[2].number : newAllGuests[2].number}
          </p>
          <button
            className="border-2 rounded-full border-(-color--gray) px-2 text-3xl font-light"
            onClick={(e) => {
              e.preventDefault(), handleAmountOfGuests("pet", "add");
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddGuestsCounter;
