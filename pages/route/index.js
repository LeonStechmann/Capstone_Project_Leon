import styled, {keyframes} from "styled-components";
import {useState, useEffect} from "react";
import animationDataBeer from "../../public/lotties/beer.json";
import Lottie from "react-lottie";
import Map from "../../components/Map";
import BarList from "../../components/BarList";
import OrangeButton from "../../components/OrangeButton";

export default function CurrentRoute({
  isLoaded,
  selected,
  selectedDest,
  setSelectedDest,
  radius,
  stops,
  bars,
  waypoints,
  setBars,
  setWaypoints,
  directionsResponse,
  setDirectionsResponse,
}) {
  const [pagination, setPagination] = useState(null);
  const [route, setRoute] = useState({});
  const [showContent, setShowContent] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const defaultOptionsBeer = {
    loop: false,
    animationData: animationDataBeer,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const eventListeners = [
    {
      eventName: "complete",
      callback: () => onAnimationComplete(),
    },
  ];

  useEffect(() => {
    if (directionsResponse)
      setRoute({
        start: directionsResponse.routes[0].legs[0].start_address,
        destination:
          directionsResponse.routes[0].legs[
            directionsResponse.routes[0].legs.length - 1
          ].end_address,
        selected: selected,
        selectedDest: selectedDest,
        stops: stops,
        radius: radius,
        bars: directionsResponse.routes[0].waypoint_order
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
          .map(bar => (bar ? bar.name : null)),
      });
  }, [directionsResponse]);

  const addRoute = async () => {
    await fetch("/api/routes", {
      method: "POST",
      body: JSON.stringify(route),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setDisabled(true);
  };

  const handleFindMoreBarsClicked = () => {
    if (pagination && pagination.hasNextPage) {
      pagination.nextPage();
    }
  };

  const onAnimationComplete = () => {
    setShowContent(true);
  };

  const isWaypoint = bar => {
    if (!bar || !bar.geometry || !bar.geometry.location) {
      return false;
    }
    return waypoints.some(
      waypoint =>
        waypoint.location.lat === bar.geometry.location.lat() &&
        waypoint.location.lng === bar.geometry.location.lng()
    );
  };

  if (!selected || !radius || !stops)
    return <Fallbacktex>get going, plan a route!</Fallbacktex>;

  return (
    <>
      {!showContent && (
        <Lottie options={defaultOptionsBeer} eventListeners={eventListeners} />
      )}
      {showContent && (
        <RouteContainer className={showContent ? "animated" : ""}>
          {isLoaded && (
            <Map
              isLoaded={isLoaded}
              selected={selected}
              selectedDest={selectedDest}
              setSelectedDest={setSelectedDest}
              radius={radius}
              stops={stops}
              bars={bars}
              waypoints={waypoints}
              setBars={setBars}
              setWaypoints={setWaypoints}
              directionsResponse={directionsResponse}
              setDirectionsResponse={setDirectionsResponse}
              pagination={pagination}
              setPagination={setPagination}
              isWaypoint={isWaypoint}
            />
          )}
          <OrangeButton
            name={"save"}
            onClick={() => {
              addRoute();
            }}
            disabled={disabled}
            text={"save route"}
          />

          {directionsResponse && bars.length > 0 && (
            <BarList
              bars={bars}
              waypoints={waypoints}
              setWaypoints={setWaypoints}
              directionsResponse={directionsResponse}
              isWaypoint={isWaypoint}
            />
          )}
          <OrangeButton
            name={"more"}
            onClick={() => handleFindMoreBarsClicked()}
            disabled={!pagination || !pagination.hasNextPage}
            text={"find more Bars"}
          />
        </RouteContainer>
      )}
    </>
  );
}

const Fallbacktex = styled.p`
  align-self: center;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1);
  }
`;

const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out, ${scaleUp} 0.5s ease-in-out;
  animation-fill-mode: forwards;
`;
