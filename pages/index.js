import styled from "styled-components";
import Link from "next/link";
import {FormHome} from "../components/Form";
import OrangeButton from "../components/OrangeButton";

export default function Home({
  isLoaded,
  setSelected,
  setSelectedDest,
  radius,
  setRadius,
  stops,
  setStops,
}) {
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
      <Link href="/route">
        <OrangeButton text={"Plan Route"} name={"plan"} />
      </Link>
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
