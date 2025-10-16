type CastleProps = {
    castle: CastleListing
} 

const CastleCardBig = ({ castle }: CastleProps) => {
  return (
    <div>
        <div>
            <div>
                <img src="" alt="" />
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
    </div>
  )
}
export default CastleCardBig