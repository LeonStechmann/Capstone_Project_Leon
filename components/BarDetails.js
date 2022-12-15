import styled from "styled-components";
import {Fragment} from "react";

export default function BarDetails({
  bars,
  waypoints,
  setWaypoints,
  directionsResponse,
}) {
  const checkIncludesWaypoint = bar => {
    return waypoints.some(
      waypoint =>
        waypoint.location.lat === bar.geometry.location.lat() &&
        waypoint.location.lng === bar.geometry.location.lng()
    );
  };

  const handleDeleteWaypointFromRoute = location => {
    const waypointIndex = waypoints.findIndex(waypoint => {
      return (
        location.lat === waypoint.location.lat &&
        location.lng === waypoint.location.lng
      );
    });
    if (waypointIndex === -1) return;
    waypoints.splice(waypointIndex, 1);
    setWaypoints(waypoints => [...waypoints]);
  };

  const handleAddBarFromBarsToRoute = location => {
    setWaypoints(waypoints => [
      ...waypoints,
      {location: location, stopover: true},
    ]);
  };

  return (
    <BarDetailsContainer>
      {waypoints &&
        bars.map((bar, index) => {
          return (
            <Fragment key={`${bar.place_id}_${index}`}>
              <StyledDetailCard isWaypoint={checkIncludesWaypoint(bar)}>
                {!checkIncludesWaypoint(bar) ? (
                  <AddOrDeleteButton
                    onClick={() =>
                      handleAddBarFromBarsToRoute({
                        lat: bar.geometry.location.lat(),
                        lng: bar.geometry.location.lng(),
                      })
                    }
                  >
                    +
                  </AddOrDeleteButton>
                ) : (
                  <AddOrDeleteButton
                    onClick={() =>
                      handleDeleteWaypointFromRoute({
                        lat: bar.geometry.location.lat(),
                        lng: bar.geometry.location.lng(),
                      })
                    }
                  >
                    X
                  </AddOrDeleteButton>
                )}
                <h2>{index + 1} .Stop</h2>
                <h3>{bar.name}</h3>
                <p>
                  {bar.rating}⭐({bar.user_ratings_total})
                </p>
                <p>{bar.vicinity}</p>
              </StyledDetailCard>
              {directionsResponse && checkIncludesWaypoint(bar) && (
                <DistanceContainer>
                  <p>
                    {`Distance: ${directionsResponse.routes[0].legs[index].distance.text} `}
                    <span>
                      ({directionsResponse.routes[0].legs[index].duration.text})
                    </span>
                  </p>
                </DistanceContainer>
              )}
            </Fragment>
          );
        })}
    </BarDetailsContainer>
  );
}

const BarDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  margin-bottom: 17vh;
`;

const StyledDetailCard = styled.article`
  border: 2px solid black;
  padding-left: 1em;
  ${props =>
    props.isWaypoint ? "background-color: green" : "background-color: red"};
`;

const AddOrDeleteButton = styled.button`
  position: absolute;
  right: 9.45%;
`;

const DistanceContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
