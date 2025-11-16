// Source - https://stackoverflow.com/a
// Posted by Vadim Gremyachev, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-13, License - CC BY-SA 4.0
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl } from "leaflet-geosearch";

const SearchControl = (props: any) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: props.provider,
      ...props,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", searchEventHandler);
    // e.Locations.forEach(function (Location) {
    //     // Location.Label = full address
    //     // Location.X = longitude
    //     // Location.Y = latitude
    //     // Location.bounds = boundaries
    // });

    return () => map.removeControl(searchControl);
  }, [props]);

  function searchEventHandler(result) {
    console.log(result.location.label);
  }

  return null;
};

export default SearchControl;
