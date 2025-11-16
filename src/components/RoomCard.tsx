import { useState } from "react";

type RoomCardProps = {
  room: Room;
  isBookingRoom: boolean;
  onChange?: (...event: any[]) => void;
  selected?: any;
};

const RoomCard = ({
  room,
  isBookingRoom,
  onChange,
  selected,
}: RoomCardProps) => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = () => {
    setChecked(!checked);
    if (onChange) {
      onChange();
    }
  };

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
            <input type="radio" name="Select room" id={room.title} />
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
