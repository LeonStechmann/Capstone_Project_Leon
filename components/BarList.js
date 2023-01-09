import styled from "styled-components";
import {Fragment} from "react";
import BarCard from "./BarCard";

export default function BarList({
  bars,
  setWaypoints,
  waypoints,
  directionsResponse,
  isWaypoint,
}) {
  if (!bars || !waypoints || !directionsResponse) return;

  return (
    <BarListContainer>
      <RouteStart directionsResponse={directionsResponse} />
      {directionsResponse.routes[0].waypoint_order
        .map(
          index =>
            bars.filter(bar => {
              return directionsResponse.request.waypoints.some(
                entry =>
                  entry.location.location.lat() ===
                    bar.geometry.location.lat() &&
                  entry.location.location.lat() === bar.geometry.location.lat()
              );
            })[index]
        )
        .map((bar, index) => {
          if (!bar) {
            return null;
          }
          return (
            <Fragment key={`${bar.place_id}_${index}`}>
              {directionsResponse &&
              directionsResponse.routes[0].legs[index] &&
              isWaypoint(bar) ? (
                <DistanceContainer>
                  <p>
                    {`⬇  Distance: ${directionsResponse.routes[0].legs[index].distance.text} `}
                    <span>
                      ({directionsResponse.routes[0].legs[index].duration.text})
                      ⬇
                    </span>
                  </p>
                </DistanceContainer>
              ) : null}
              <BarCard
                bar={bar}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
                isWaypoint={isWaypoint}
              />
              {index === waypoints.length - 1 ? (
                <>
                  <DistanceContainer>
                    <p>
                      {`⬇  Distance: ${
                        directionsResponse.routes[0].legs[index + 1].distance
                          .text
                      } `}
                      <span>
                        (
                        {
                          directionsResponse.routes[0].legs[index + 1].duration
                            .text
                        }
                        ) ⬇
                      </span>
                    </p>
                  </DistanceContainer>
                  <RouteEnd directionsResponse={directionsResponse} />
                </>
              ) : null}
            </Fragment>
          );
        })}
      <p style={{textAlign: "center"}}>Additional bars in your area:</p>
      {bars.map(bar => {
        return (
          <Fragment key={`${bar.place_id}_${bar.vicinity}`}>
            {!isWaypoint(bar) && (
              <BarCard
                bar={bar}
                waypoints={waypoints}
                setWaypoints={setWaypoints}
                isWaypoint={isWaypoint}
              />
            )}
          </Fragment>
        );
      })}
    </BarListContainer>
  );
}

const BarListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
`;

const DistanceContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const RouteStart = ({directionsResponse}) => {
  const startAddress = directionsResponse.routes[0].legs[0].start_address;
  return (
    <h3 style={{textAlign: "center"}}>
      {startAddress.substring(0, startAddress.indexOf(","))}
    </h3>
  );
};

const RouteEnd = ({directionsResponse}) => {
  const endAddress =
    directionsResponse.routes[0].legs[
      directionsResponse.routes[0].legs.length - 1
    ].end_address;
  return (
    <h3 style={{textAlign: "center"}}>
      {endAddress.substring(0, endAddress.indexOf(","))}
    </h3>
  );
};
