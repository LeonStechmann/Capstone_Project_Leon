import styled from "styled-components";
import {useState, useEffect} from "react";
import Map from "../components/Map";
import {FormHome} from "../components/Form";

export default function Home() {
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [status, setStatus] = useState(null);

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
      <FormHome />
      <Map userLat={userLat} userLng={userLng} status={status} />
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
