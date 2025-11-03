import { Link } from "react-router"

type CastleProps = {
    castle: CastleListing
} 
const CastleCardSmall = ({ castle }: CastleProps) => {
  return (
    <div className="h-52 w-40 rounded-md overflow-hidden custom-shadow my-3">
      <Link to={`/castles/${castle.id}`}>
          <div className='flex align-middle object-contain'>
              <img src={castle.images[0]} alt="" />
          </div>
          <div className="grid p-1 gap-0.5">
            <p className="body-small font-medium">{castle.title}</p>
            <p className="caption text-(--border)">{castle.description}</p>
            <p className="caption">{castle.rooms[0].price} kr/night</p>
            {
              castle.events &&
              <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">Event avaliable</p>
            }
          </div>
      </Link>
    </div>
  )
}
export default CastleCardSmall