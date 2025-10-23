import { Link } from "react-router"

type CreatedListingProps = {
  castle: CastleListing
}


const CreatedListing = ({ castle }: CreatedListingProps ) => {
  return (
    <div>
      <Link to={`/castles/${castle.id}`}>
        <div>
            <div>
                <img src={castle.images[0]} alt="" />
            </div>
            <h3>{castle.title}</h3>
            <p>{castle.location}</p>
            <p>{castle.dates[0]} - {castle.dates[2]}</p>
            <p>{castle.rooms.map(r => r.title + ' ')}</p>
            <p>{castle.guests.map(g => g.number + ' ' + g.category + ' ')}</p>
            <p>{castle.rules}</p>
            <p>{castle.amneties?.join(' ')}</p>
        </div>  
      </Link>
    </div>
  )
}
export default CreatedListing