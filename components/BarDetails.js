import styled from "styled-components";

export default function BarDetails({bars, waypoints, setWaypoints}) {
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
    <>
      <BarDetailsContainer>
        {waypoints &&
          bars.map((bar, index) => {
            return (
              <>
                <StyledDetailCard
                  isWaypoint={waypoints.findIndex(waypoint => {
                    return (
                      bar.geometry.location.lat() === waypoint.location.lat &&
                      bar.geometry.location.lng() === waypoint.location.lng
                    );
                  })}
                >
                  {waypoints.findIndex(waypoint => {
                    return (
                      bar.geometry.location.lat() === waypoint.location.lat &&
                      bar.geometry.location.lng() === waypoint.location.lng
                    );
                  }) == -1 ? (
                    <AddBarFromBarsToRouteButton
                      onClick={() =>
                        handleAddBarFromBarsToRoute({
                          lat: bar.geometry.location.lat(),
                          lng: bar.geometry.location.lng(),
                        })
                      }
                    >
                      +
                    </AddBarFromBarsToRouteButton>
                  ) : (
                    <DeleteBarFromRouteButton
                      onClick={() =>
                        handleDeleteWaypointFromRoute({
                          lat: bar.geometry.location.lat(),
                          lng: bar.geometry.location.lng(),
                        })
                      }
                    >
                      X
                    </DeleteBarFromRouteButton>
                  )}
                  <h2>{index + 1} .Stop</h2>
                  <h3>{bar.name}</h3>

                  <p>
                    {bar.rating}⭐({bar.user_ratings_total})
                  </p>
                  <p>{bar.vicinity}</p>
                </StyledDetailCard>
              </>
            );
          })}
      </BarDetailsContainer>
    </>
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
  ${props =>
    props.isWaypoint !== -1
      ? "background-color: green"
      : "background-color: red"};
`;

const DeleteBarFromRouteButton = styled.button`
  position: absolute;
  right: 9.45%;
`;

const AddBarFromBarsToRouteButton = styled.button`
  position: absolute;
  right: 9.45%;
`;
