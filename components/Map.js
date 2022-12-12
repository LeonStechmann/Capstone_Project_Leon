import {
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {useState, useEffect, useMemo} from "react";

export default function Map({
  isLoaded,
  selected,
  selectedDest,
  radius,
  stops,
  waypoints,
  bars,
  setBars,
  setWaypoints,
}) {
  const [status, setStatus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markerClicked, setMarkerClicked] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  const google = window.google;

  const options = useMemo(
    () => ({
      mapId: "85f5ea377099f185",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  const circleOptions = {
    fillColor: "green",
    fillOpacity: 0.05,
    strokeWeight: 3,
    strokeOpacity: 0.3,
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

  useEffect(() => {
    if (!userLocation) return;
    map.panTo(userLocation);
  }, [userLocation, map]);

  useEffect(() => {
    getWaypoints();
  }, [bars]);

  useEffect(() => {
    calculateRoute();
  }, [waypoints]);

  const onLoadMap = map => {
    setMap(map);
    getNearbyBars(selected, map);
  };

  const handleMarkerClicked = id => {
    setMarkerClicked(id);
  };

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Fail. Your browser does not support Geolocation.");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        position => {
          setStatus(null);
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setStatus("Locating failed");
        }
      );
    }
  };

  const getNearbyBars = (location, map) => {
    const request = {
      location: location,
      radius: radius,
      type: ["bar"],
    };
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status !== "OK" || !results) return;
      setBars(
        results.filter(
          bar =>
            !bar.types.includes("restaurant") &&
            bar.business_status === "OPERATIONAL"
        )
      );
    });
  };

  const getWaypoints = () => {
    if (!bars) return;

    const getWaypointsFromBars = bar => {
      const lat = bar.geometry.location.lat();
      const lng = bar.geometry.location.lng();
      const location = {lat: lat, lng: lng};
      setWaypoints(waypoints => [
        ...waypoints,
        {location: location, stopover: true},
      ]);
    };

    if (stops < bars.length) {
      bars.slice(0, stops).forEach(bar => getWaypointsFromBars(bar));
    } else if (stops > bars.length) {
      alert(
        "Not enough bars found in your area. Please increase radius or lower the amount of stops!"
      );
    } else {
      bars.forEach(bar => getWaypointsFromBars(bar));
    }
  };

  const calculateRoute = async () => {
    if (!waypoints) return;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: selected,
      destination: selectedDest,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
  };

  const logfunction = () => {
    console.log("bars");
    console.log(bars);
    console.log("directionsResponse");
    console.log(directionsResponse);
    console.log("waypoints");
    console.log(waypoints);
    console.log("selected");
    console.log(selected);
    console.log("directionsResponse");
    console.log(directionsResponse);
  };

  if (!isLoaded) return "Loading Map...";

  //the mapping on markers for nearby bars has to be set, so that only bars that are not waypoints are being mapped.
  return (
    <>
      <GoogleMap
        id={"85f5ea377099f185"}
        zoom={14.5}
        center={selected}
        mapContainerStyle={{
          height: "30vh",
          width: "80%",
        }}
        options={options}
        onLoad={onLoadMap}
      >
        {bars && (
          <>
            <Circle center={selected} radius={radius} options={circleOptions} />
            {bars.map(bar => {
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
                        <p>{bar.vicinity}</p>
                      </div>
                    </InfoWindow>
                  )}
                </>
              );
            })}
            {userLocation && (
              <Marker icon={markerIconLocation} position={userLocation} />
            )}
            <Marker position={selected} />
            <Marker icon={markerIconDest} position={selectedDest} />
          </>
        )}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>

      <button onClick={getUserLocation}>locate</button>
      <button onClick={logfunction}>log mich</button>
      <p>{status}</p>
    </>
  );
}
