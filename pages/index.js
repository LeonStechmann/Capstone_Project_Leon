import styled from "styled-components";
import Link from "next/link";
import {FormHome} from "../components/Form";

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
      )}{" "}
      <Link href="/route">
        <StyledButton>Plan Route</StyledButton>
      </Link>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  background-color: #fff000;
  border-radius: 12px;
  border: 0;
  color: #000;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 10px 15px;
  width: 60%;
`;
