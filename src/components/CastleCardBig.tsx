import { Link } from "react-router"

type CastleProps = {
    castle: CastleListing
} 

const CastleCardBig = ({ castle }: CastleProps) => {
  return (
    <div className="h-full w-[369px] rounded-xl overflow-hidden custom-shadow m-auto mb-8">
        <Link to={`/castles/${castle.id}`}>
            <div>
                <div>
                    <img src={castle.images[0]} alt="" />
                </div>
                <div className="p-5">
                    <div className="flex gap-5 items-start">
                        <div className="">
                            <h2>{castle.title}</h2>
                            <p className="caption">{castle.location}</p>
                        </div>
                        <div className="mt-1">
                            <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">Event avaliable</p>
                        </div>
                    </div>
                    <div>
                        <p>{castle.description}</p>
                    </div>
                </div>
            </div>
            <hr className="w-80 m-auto border-(--color-foreground)"/>
            <div className="p-5 flex justify-between items-center">
                <p className="caption">{castle.rooms[0].price} kr / night</p>
                <button className="btn-primary">Read more</button>
            </div>
        </Link>
    </div>
  )
}
export default CastleCardBig