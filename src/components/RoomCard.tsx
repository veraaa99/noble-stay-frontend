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
    <div>
      <div>
        <h3>{room.title}</h3>
        <p>{room.caption}</p>
        <ul>
          {room.description.map((d) => (
            <li>{d}</li>
          ))}
        </ul>
      </div>
      <hr />
      <div>
        <p>{room.price}</p>
        {isBookingRoom ? (
          <div>
            <p>Select this room</p>
            <input
              type="checkbox"
              name="Select room"
              checked={radioChecked}
              id={room.title}
              onChange={() => {
                setRadioChecked((radioChecked) => !radioChecked);
              }}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="addRoom">Add room</label>
            <input
              type="checkbox"
              id="addRoom"
              checked={checked}
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default RoomCard;
