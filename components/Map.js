import {GoogleMap, Marker, InfoWindow, Circle} from "@react-google-maps/api";
import {useState, useEffect, useMemo} from "react";

export default function Map({selected, selectedDest, radius}) {
  const [status, setStatus] = useState(null);
  const [center, setCenter] = useState(null);
  const [bars, setBars] = useState(null);
  const [markerClicked, setMarkerClicked] = useState(null);

  const google = window.google;

  const options = useMemo(
    () => ({
      mapId: "85f5ea377099f185",
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
      radius: radius,
      type: ["bar"],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
        setBars(
          results.filter(
            bar =>
              !bar.types.includes("restaurant") &&
              bar.business_status === "OPERATIONAL"
          )
        );
      }
    }
  };

  const handleMarkerClicked = id => {
    setMarkerClicked(id);
  };

  const markerIconBar = {
    url: "../assets/beericon.svg",
    scaledSize: new google.maps.Size(30, 30),
  };

  const markerIconLocation = {
    url: "../assets/currentlocation.svg",
    scaledSize: new google.maps.Size(40, 40),
  };

  const markerIconDest = {
    url: "../assets/goal.svg",
    scaledSize: new google.maps.Size(30, 30),
  };

  const circleOptions = {
    fillColor: "green",
    fillOpacity: 0.05,
    strokeWeight: 3,
    strokeOpacity: 0.3,
  };

  return (
    <>
      {center && (
        <GoogleMap
          id={"85f5ea377099f185"}
          zoom={14.5}
          center={center}
          mapContainerStyle={{
            height: "30vh",
            width: "80%",
          }}
          options={options}
          onLoad={onLoad}
        >
          <Circle center={center} radius={radius} options={circleOptions} />

          {bars &&
            bars.map(bar => {
              return (
                <>
                  <Marker
                    onClick={() => handleMarkerClicked(bar.place_id)}
                    key={bar.place_id}
                    icon={markerIconBar}
                    position={bar.geometry.location}
                    animation={google.maps.Animation.DROP}
                  />
                  {markerClicked === bar.place_id && (
                    <InfoWindow position={bar.geometry.location}>
                      <div>
                        <h3>{bar.name}</h3>
                        <p>
                          {bar.rating}⭐({bar.user_ratings_total})
                        </p>
                        <p>{bar.isOpen ? "open" : "closed"}</p>
                        <p>{bar.vicinity}</p>
                      </div>
                    </InfoWindow>
                  )}
                </>
              );
            })}
          <Marker icon={markerIconLocation} position={center} />
          {selected && <Marker position={selected} />}
          {selectedDest && (
            <Marker icon={markerIconDest} position={selectedDest} />
          )}
        </GoogleMap>
      )}
      <p>{status}</p>
    </>
  );
}
