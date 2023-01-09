import {
  GoogleMap,
  Marker,
  InfoWindow,
  Circle,
  DirectionsRenderer,
} from "@react-google-maps/api";
import {useState, useEffect, useMemo, Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationArrow} from "@fortawesome/free-solid-svg-icons";
import Barrating from "./Barrating";
import styled from "styled-components";

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
  directionsResponse,
  setDirectionsResponse,
  pagination,
  setPagination,
  isWaypoint,
}) {
  const [status, setStatus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [markerClicked, setMarkerClicked] = useState(null);
  const [searchresults, setSearchresults] = useState([]);

  const google = window.google;

  const options = useMemo(
    () => ({
      mapId: "85f5ea377099f185",
      disableDefaultUI: true,
      clickableIcons: false,
      gestureHandling: "greedy",
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
    labelOrigin: {x: 13, y: -8.5},
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
    if (!bars.some(bar => searchresults.includes(bar.place_id))) {
      setBars([...bars, ...searchresults]);
    }
  }, [searchresults]);

  useEffect(() => {
    getWaypoints();
  }, [bars]);

  useEffect(() => {
    calculateRoute();
  }, [waypoints]);

  const onLoadMap = map => {
    setMap(map);
    setBars([]);
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
    if (!location || !radius) return;

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
      {location: location, radius: radius, type: ["bar"]},
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;

        const filteredBars = results.filter(
          bar =>
            !bar.types.includes("restaurant") &&
            bar.business_status === "OPERATIONAL" &&
            !bars.some(b => b.place_id === bar.place_id)
        );

        const filteredBarsWithUrl = filteredBars.map(bar => {
          return Array.isArray(bar.photos)
            ? {
                ...bar,
                url: bar.photos[0].getUrl(),
              }
            : bar;
        });
        setSearchresults(filteredBarsWithUrl);
        setPagination(pagination);
      }
    );
  };

  const getWaypoints = () => {
    if (bars.length === 0) return;

    const getWaypointsFromBars = bar => {
      const lat = bar.geometry.location.lat();
      const lng = bar.geometry.location.lng();
      const location = {lat: lat, lng: lng};
      if (
        !waypoints.some(
          waypoint =>
            waypoint.location.lat === lat && waypoint.location.lng === lng
        )
      ) {
        setWaypoints(waypoints => [
          ...waypoints,
          {location: location, stopover: true},
        ]);
      }
    };
    if (stops < bars.length) {
      bars.slice(0, stops).forEach(bar => getWaypointsFromBars(bar));
    } else if (stops > bars.length) {
      if (pagination && pagination.hasNextPage && stops > bars.length) {
        pagination.nextPage();
      } else
        alert(
          "Not enough bars found in your area. Please increase radius, lower the amount of stops or start your tour in a differen location."
        );
    } else {
      bars.forEach(bar => getWaypointsFromBars(bar));
    }
  };

  const calculateRoute = async () => {
    if (!selected || !selectedDest || !waypoints || waypoints.length === 0)
      return;

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

  if (!isLoaded) return "Loading Map...";
  return (
    <>
      <GoogleMap
        id={"85f5ea377099f185"}
        zoom={14.5}
        center={selected}
        mapContainerStyle={{
          height: "32vh",
          width: "80%",
          borderRadius: "18px",
          visibility: directionsResponse ? "100" : "0",
        }}
        options={options}
        onLoad={onLoadMap}
      >
        {directionsResponse && bars.length > 0 && waypoints.length > 0 && (
          <>
            <Circle center={selected} radius={radius} options={circleOptions} />

            {bars.map(bar => {
              return (
                <Fragment key={bar.place_id}>
                  <Marker
                    onClick={() => handleMarkerClicked(bar.place_id)}
                    icon={markerIconBar}
                    position={bar.geometry.location}
                    animation={google.maps.Animation.DROP}
                    label={{
                      text: isWaypoint(bar)
                        ? (
                            directionsResponse.routes[0].waypoint_order
                              .map(
                                index =>
                                  bars.filter(bar => {
                                    return directionsResponse.request.waypoints.some(
                                      entry =>
                                        entry.location.location.lat() ===
                                          bar.geometry.location.lat() &&
                                        entry.location.location.lat() ===
                                          bar.geometry.location.lat()
                                    );
                                  })[index]
                              )
                              .findIndex(
                                x =>
                                  x &&
                                  x.geometry.location &&
                                  x.geometry.location.lat() ===
                                    bar.geometry.location.lat() &&
                                  x.geometry.location.lng() ===
                                    bar.geometry.location.lng()
                              ) + 1
                          ).toString()
                        : " ",
                      color: "var(--black)",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                  />
                  {markerClicked === bar.place_id && (
                    <InfoWindow
                      position={bar.geometry.location}
                      options={{background: "black"}}
                    >
                      <InfoWindowContainer>
                        <h3>{bar.name}</h3>
                        <Barrating
                          bar={bar}
                          fillColor={"var(--yellow)"}
                          emptyColor={"var(--black)"}
                        />
                        <p>{bar.vicinity}</p>
                      </InfoWindowContainer>
                    </InfoWindow>
                  )}
                </Fragment>
              );
            })}
            {userLocation && (
              <Marker icon={markerIconLocation} position={userLocation} />
            )}
            <Marker position={selected} />
            <Marker icon={markerIconDest} position={selectedDest} />
          </>
        )}
        {directionsResponse && bars.length > 0 && (
          <DirectionsRenderer
            directions={directionsResponse}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: "#0088FF",
                strokeOpacity: 0.4,
                strokeWeight: 5,
              },
            }}
          />
        )}
        <LocateButton onClick={getUserLocation}>
          <FontAwesomeIcon icon={faLocationArrow} />
        </LocateButton>
      </GoogleMap>
      <p>{status}</p>
    </>
  );
}

const LocateButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  font-size: 1.25rem;
`;

const InfoWindowContainer = styled.div`
  color: var(--black);

  > * {
    margin: 0;
  }
`;
