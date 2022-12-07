import styled from "styled-components";
import {useState} from "react";
import Map from "../components/Map";
import {FormHome} from "../components/Form";
import {useLoadScript} from "@react-google-maps/api";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  return (
    <HomeContainer>
      {isLoaded ? (
        <FormHome setSelected={setSelected} setSelectedDest={setSelectedDest} />
      ) : (
        "Loading..."
      )}
      {isLoaded ? (
        <Map
          selected={selected}
          selectedDest={selectedDest}
          isLoaded={isLoaded}
        />
      ) : (
        "Loading..."
      )}
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
`;
