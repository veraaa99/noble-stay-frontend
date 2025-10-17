type RoomCardProps = {
  room: Room
}

const RoomCard = ({ room }: RoomCardProps ) => {
  return (
    <div>
        <div>
            <h3>{room.title}</h3>
            <p>{room.caption}</p>
            <ul>
              {room.description.map(d => 
                <li>{d}</li>
              )}
            </ul>
        </div>
        <hr />
        <div>
            <p>{room.price}</p>
            <div>
              <p>Select this room</p>
              <input type="radio" name="" id="" />
            </div>
        </div>
    </div>
  )
}
export default RoomCard