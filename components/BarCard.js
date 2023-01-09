import styled from "styled-components";
import {useState} from "react";
import BarDetails from "./BarDetails";

export default function BarCard({
  bar,
  index,
  waypoints,
  setWaypoints,
  isWaypoint,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

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
    <Container
      isWaypoint={isWaypoint(bar)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <BarDetails
        bar={bar}
        index={index}
        isExpanded={isExpanded}
        isWaypoint={isWaypoint}
      />
      {!isWaypoint(bar) ? (
        <AddOrDeleteButton
          onClick={event => {
            event.stopPropagation();
            handleAddBarFromBarsToRoute({
              lat: bar.geometry.location.lat(),
              lng: bar.geometry.location.lng(),
            });
          }}
        >
          +
        </AddOrDeleteButton>
      ) : (
        <AddOrDeleteButton
          onClick={event => {
            event.stopPropagation();
            handleDeleteWaypointFromRoute({
              lat: bar.geometry.location.lat(),
              lng: bar.geometry.location.lng(),
            });
          }}
        >
          X
        </AddOrDeleteButton>
      )}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  justify-content: space-between;
  padding: 1em;
  margin: 10px 0 10px 0;
  border-radius: 20px;
  background-color: var(--yellow);
  color: var(--black);
  ${props => !props.isWaypoint && "background-color: #5FB3B7"};
`;

const AddOrDeleteButton = styled.button`
  box-sizing: border-box;
  background-color: var(--black);
  color: white;
  border: 2px solid var(--black);
  border-radius: 30px;
  font-weight: bold;
  font-size: 16px;
  height: 27px;
  width: 27px;
`;
