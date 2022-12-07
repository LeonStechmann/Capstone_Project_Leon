import {GoogleMap, Marker, InfoWindow} from "@react-google-maps/api";
import {useState, useEffect, useMemo} from "react";

export default function Map({selected, selectedDest}) {
  const [status, setStatus] = useState(null);
  const [center, setCenter] = useState(null);
  const [bars, setBars] = useState(null);
  const [markerClicked, setMarkerClicked] = useState(null);

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

  const handleMarkerClicked = id => {
    setMarkerClicked(id);
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
                  <Marker
                    onClick={() => handleMarkerClicked(bar.place_id)}
                    key={bar.place_id}
                    position={bar.geometry.location}
                  />
                  {markerClicked === bar.place_id && (
                    <InfoWindow position={bar.geometry.location}>
                      <div>
                        <p>Name:{bar.name}</p>
                        <p>Rating:{bar.rating}</p>
                        <p>Adress:{bar.vicinity}</p>
                      </div>
                    </InfoWindow>
                  )}
                </>
              );
            })}
          <Marker
            icon={{
              path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
              scale: 7,
              strokeColor: "green",
            }}
            label={"You"}
            position={center}
          />
          {selected && <Marker label={"Start"} position={selected} />}
          {selectedDest && <Marker label={"End"} position={selectedDest} />}
        </GoogleMap>
      )}
      <p>{status}</p>
    </>
  );
}
