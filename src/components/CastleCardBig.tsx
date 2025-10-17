import { Link } from "react-router"

type CastleProps = {
    castle: CastleListing
} 

const CastleCardBig = ({ castle }: CastleProps) => {
  return (
    <div>
        <Link to={`/castles/${castle.id}`}>
            <div>
                <div>
                    <img src={castle.images[0]} alt="" />
                </div>
                <div>
                    <div>
                        <h2>{castle.title}</h2>
                        <p>{castle.location}</p>
                    </div>
                    <p>{castle.events}</p>
                    <div>
                        <p>{castle.description}</p>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <p>{castle.rooms[0].price} kr / night</p>
                <button>Read more</button>
            </div>
        </Link>
    </div>
  )
}
export default CastleCardBig