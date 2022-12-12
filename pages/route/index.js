import Map from "../../components/Map";
import BarDetails from "../../components/BarDetails";
import styled from "styled-components";

export default function CurrentRoute({
  isLoaded,
  selected,
  selectedDest,
  radius,
  stops,
  bars,
  waypoints,
  setBars,
  setWaypoints,
}) {
  return (
    <>
      <RouteContainer>
        <h1>CurrentRoute</h1>
        <Map
          isLoaded={isLoaded}
          selected={selected}
          selectedDest={selectedDest}
          radius={radius}
          stops={stops}
          bars={bars}
          waypoints={waypoints}
          setBars={setBars}
          setWaypoints={setWaypoints}
        />
        {bars && (
          <BarDetails
            bars={bars}
            waypoints={waypoints}
            setWaypoints={setWaypoints}
          />
        )}
      </RouteContainer>
    </>
  );
}

const RouteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
