import styled from "styled-components";

import {useRouter} from "next/router";
import {FormHome} from "../components/Form";
import OrangeButton from "../components/OrangeButton";

export default function Home({
  isLoaded,
  setSelected,
  setSelectedDest,
  setWaypoints,
  setBars,
  setDirectionsResponse,
  radius,
  setRadius,
  stops,
  setStops,
}) {
  const router = useRouter();

  const handlePlanRouteClick = () => {
    setWaypoints([]);
    setBars([]);
    setDirectionsResponse(null);
    router.push("/route");
  };

  return (
    <HomeContainer>
      {isLoaded ? (
        <FormHome
          setSelected={setSelected}
          setSelectedDest={setSelectedDest}
          radius={radius}
          setRadius={setRadius}
          stops={stops}
          setStops={setStops}
        />
      ) : (
        "Loading..."
      )}

      <OrangeButton
        text={"Plan Route"}
        name={"plan"}
        onClick={() => handlePlanRouteClick()}
      />
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  margin: 1.2em 0 0 0;
`;
