import {GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";
import {useState, useEffect, useMemo} from "react";

export default function Map({selected, selectedDest}) {
  const [status, setStatus] = useState(null);
  const [center, setCenter] = useState(null);
  const [map, setMap] = useState(null);
  const [bars, setBars] = useState(null);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Fail. Your browser does not support Geolocation.");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        position => {
          setStatus(null);
          setCenter({
            ...center,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Locating failed");
        }
      );
    }
  }, []);

  const onLoad = map => {
    setMap(map);

    const request = {
      location: center,
      radius: "500",
      type: ["bar"],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        setBars(results);
      }
    }
  };

  return (
    <>
      {center && (
        <GoogleMap
          zoom={13}
          center={center}
          mapContainerStyle={{
            height: "30vh",
            width: "80%",
          }}
          options={options}
          onLoad={onLoad}
        >
          {bars &&
            bars.map(bar => {
              return (
                <>
                  <Marker key={bar.place_id} position={bar.geometry.location} />
                </>
              );
            })}

          <Marker key={1} label={"You"} position={center} />
          {selected && <Marker key={2} label={"Start"} position={selected} />}
          {selectedDest && (
            <Marker key={3} label={"End"} position={selectedDest} />
          )}
        </GoogleMap>
      )}
      <p>{status}</p>
    </>
  );
}
