import locationIcon from "../assets/Location_On.svg";

type CreatedListingProps = {
  castle: CastleListing;
  listingEditorHandler: (castle: CastleListing) => void;
  removeListingHandler: (id: string) => void;
  loading: boolean;
};

const CreatedListing = ({
  castle,
  listingEditorHandler,
  removeListingHandler,
  loading,
}: CreatedListingProps) => {
  return (
    <div>
      <div className="h-50 sm:h-60">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={castle.images[0]}
          alt=""
        />
      </div>

      <div>
        <div className="mb-5 mt-2 flex flex-col gap-1.5">
          <h2>{castle.title}</h2>
          <div className="flex gap-1 items-center">
            <img src={locationIcon} alt="" />
            <p className="caption">{castle.location}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <hr className="w-[70%] m-auto border-(--gray)" />
        <div>
          <h2 className="text-(--color-foreground)">Date:</h2>
          <div>
            <p>
              {new Date(castle.dates[0].toString()).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              →{" "}
              {new Date(castle.dates[castle.dates.length - 1]).toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              )}
            </p>
          </div>
        </div>
        <hr className="w-[70%] m-auto border-(--gray)" />
        <div>
          <h2 className="text-(--color-foreground)">Room/s:</h2>
          {castle.rooms.map((room) => (
            <div key={room.title} className="flex gap-2">
              <p>1 {room.title}</p>
            </div>
          ))}
        </div>
        <hr className="w-[70%] m-auto border-(--gray)" />
        <div>
          <h2 className="text-(--color-foreground)">Guests:</h2>
          {castle.guests.map((guest) => (
            <div key={guest.category} className="flex gap-2">
              <p>{guest.number}</p>
              <p>{guest.category}</p>
            </div>
          ))}
        </div>

        <hr className="w-[70%] m-auto border-(--gray)" />

        <div>
          <h2 className="text-(--color-foreground)">Rules:</h2>

          <ul className="text-[10px]">
            {castle.rules.map((rule) => (
              <li key={rule.id}>{rule.label}</li>
            ))}
          </ul>
        </div>

        <hr className="w-[70%] m-auto border-(--gray)" />

        <div>
          <h2 className="text-(--color-foreground)">Amneties:</h2>

          <ul className="text-[10px]">
            {castle.amneties?.map((amnety) => (
              <li key={amnety.id}>{amnety.label}</li>
            ))}
          </ul>
        </div>

        <hr className="w-[70%] m-auto border-(--gray)" />

        <div>
          <h2 className="text-(--color-foreground)">Events:</h2>
          {castle.events ? (
            <ul className="text-[10px]">
              {castle.events?.map((event) => (
                <li key={event.id}>{event.label}</li>
              ))}
            </ul>
          ) : (
            <p>No events</p>
          )}
        </div>

        <hr className="w-[70%] m-auto border-(--gray)" />

        <div className="flex justify-between sm:justify-start sm:gap-2">
          <button
            className="btn-secondary"
            onClick={() => listingEditorHandler(castle)}
          >
            Edit listing
          </button>
          <button
            className="btn-secondary text-(--error)"
            onClick={() => removeListingHandler(castle._id)}
            disabled={loading}
          >
            {" "}
            {loading ? "Deleting..." : "Remove listing"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatedListing;
