import { Link } from "react-router"

type CastleProps = {
    castle: CastleListing
} 
const CastleCardSmall = ({ castle }: CastleProps) => {
  return (
    <div>
      <Link to={`/castles/${castle.id}`}>
          <div>
              <img src={castle.images[0]} alt="" />
          </div>
          <h3>{castle.title}</h3>
          <p>{castle.description}</p>
          <p>{castle.rooms[0].price}</p>
      </Link>
    </div>
  )
}
export default CastleCardSmall