import { useCastleListing } from "@/contexts/CastleListingContext";
import { useEffect, useState } from "react";

type RoomCardProps = {
  room: Room;
  isBookingRoom: boolean;
  onChange?: (...event: any[]) => void;
  selected?: any;
  isRoomInCastleListing?: boolean;
};

const RoomCard = ({
  room,
  isBookingRoom,
  onChange,
  selected,
  isRoomInCastleListing,
}: RoomCardProps) => {
  const { selectedRooms, actions } = useCastleListing();
  const [radioChecked, setRadioChecked] = useState(false);
  const [checked, setChecked] = useState(isRoomInCastleListing ? true : false);

  const handleOnChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange();
    }
  };

  useEffect(() => {
    if (radioChecked) {
      actions.updateSelectedRooms(room);
    } else if (selectedRooms.length > 0 && !radioChecked) {
      actions.updateSelectedRooms(room);
    }
  }, [radioChecked]);

  return (
    <div className="custom-shadow rounded-lg px-4 py-2">
      <div className="mb-2">
        <h2>{room.title}</h2>
        <p className="caption text-(--gray)">{room.caption}</p>
        <ul className="list-disc ml-8">
          {room.description.map((d) => (
            <li>{d}</li>
          ))}
        </ul>
      </div>
      <hr className="w-60 m-auto border-(--color-foreground)" />
      <div className="flex justify-between my-3">
        <p className="caption">{room.price}kr / night</p>
        {isBookingRoom ? (
          <div className="flex gap-2">
            <p className="caption">Select this room</p>
            <label className="container w-fit">
              <input
                // Ändra till radio button? kolla senare
                type="checkbox"
                checked={radioChecked}
                name="Select room"
                onChange={() => {
                  setRadioChecked((radioChecked) => !radioChecked);
                }}
              />
              <span className="checkmark"></span>
            </label>
          </div>
        ) : (
          <div className="flex gap-2">
            <label htmlFor="addRoom">Add room</label>
            <label className="container w-fit">
              <input
                type="checkbox"
                checked={checked}
                id="addRoom"
                onChange={handleOnChange}
              />
              <span className="checkmark"></span>
            </label>

            {/* <input
              type="checkbox"
              id="addRoom"
              checked={checked}
              onChange={handleOnChange}
            /> */}
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomCard;
