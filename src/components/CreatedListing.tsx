import { useState } from "react";
import { Link } from "react-router";

type CreatedListingProps = {
  castle: CastleListing;
  listingEditorHandler: (castle: CastleListing) => void;
  removeListingHandler: (id: string) => void;
};

const CreatedListing = ({
  castle,
  listingEditorHandler,
  removeListingHandler,
}: CreatedListingProps) => {
  return (
    <div>
      <div>
        <img src={castle.images[0]} alt="" />
      </div>
      <h3>{castle.title}</h3>
      <p>{castle.location}</p>
      <p>
        {castle.dates[0]} - {castle.dates[castle.dates.length - 1]}
      </p>
      <p>{castle.rooms.map((r) => r.title + " ")}</p>
      <p>{castle.guests.map((g) => g.number + " " + g.category + " ")}</p>
      <p>{castle.rules}</p>
      <p>{castle.amneties?.join(" ")}</p>
      <button onClick={() => listingEditorHandler(castle)}>Edit listing</button>
      <button onClick={() => removeListingHandler(castle._id)}>
        Remove listing
      </button>
    </div>
  );
};
export default CreatedListing;
