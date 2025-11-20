import { Link } from "react-router";

type CastleProps = {
  castle: CastleListing;
};

const CastleCardBig = ({ castle }: CastleProps) => {
  return (
    <div className="h-full w-88 rounded-xl overflow-hidden custom-shadow  mb-8 sm:w-50 md:w-112">
      <Link to={`/castles/${castle._id}`}>
        <div>
          <div>
            <img className="w-full" src={castle.images[0]} alt="" />
          </div>
          <div className="p-5 sm:py-3">
            <div className="flex gap-5 items-start sm:items-baseline md:justify-between">
              <div>
                <h2 className="md:hidden">{castle.title}</h2>
                <h3 className="hidden md:block">{castle.title}</h3>
                <p className="caption">{castle.location}</p>
              </div>
              <div>
                <p className="w-fit caption text-(--primary) border-3 border-(--primary)/40 rounded-xl py-0.5 px-1">
                  Event avaliable
                </p>
              </div>
            </div>
            <div className="md:mt-3">
              <p>{castle.description}</p>
            </div>
          </div>
        </div>
        <hr className="w-80 m-auto border-(--color-foreground) sm:w-40 md:w-100" />
        <div className="p-5 flex justify-between items-center md:my-3">
          <p className="caption">{castle.rooms[0].price} kr / night</p>
          <button className="btn-primary">Read more</button>
        </div>
      </Link>
    </div>
  );
};
export default CastleCardBig;
