import styled from "styled-components";
import {useState, useEffect} from "react";
import Map from "../components/Map";
import {FormHome} from "../components/Form";
import {useLoadScript} from "@react-google-maps/api";

export default function Home() {
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [status, setStatus] = useState(null);
  const [selected, setSelected] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);

  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("Fail. Your browser does not support Geolocation.");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        position => {
          setStatus(null);
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
        },
        () => {
          setStatus("Locating failed");
        }
      );
    }
  }, []);

  return (
    <HomeContainer>
      {isLoaded ? (
        <FormHome setSelected={setSelected} setSelectedDest={setSelectedDest} />
      ) : (
        "Loading..."
      )}
      {isLoaded ? (
        <Map
          userLat={userLat}
          userLng={userLng}
          selected={selected}
          selectedDest={selectedDest}
          isLoaded={isLoaded}
        />
      ) : (
        "Loading..."
      )}
      <p>{status}</p>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vh;
`;
