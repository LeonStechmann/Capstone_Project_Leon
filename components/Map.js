import {GoogleMap, Marker} from "@react-google-maps/api";
import {useMemo} from "react";

export default function Map({userLat, userLng, selected, selectedDest}) {
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  if (userLat && userLng)
    return (
      <>
        <GoogleMap
          zoom={13}
          center={{lat: userLat, lng: userLng}}
          mapContainerStyle={{
            height: "30vh",
            width: "80%",
          }}
          options={options}
        >
          <Marker position={{lat: userLat, lng: userLng}} />
          {selected && <Marker position={selected} />}
          {selectedDest && <Marker position={selectedDest} />}
        </GoogleMap>
      </>
    );
}
