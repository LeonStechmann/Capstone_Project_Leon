import styled from "styled-components";
import {useState, useEffect} from "react";
import RouteCard from "../../components/RouteCard";
import loadingOrange from "../../public/lotties/loadingOrange.json";
import Lottie from "react-lottie";

export default function PastRoutes({
  setSelectedDest,
  setSelected,
  setRadius,
  setStops,
  setWaypoints,
  setDirectionsResponse,
  setBars,
}) {
  const [shouldReload, setShouldReload] = useState(true);
  const [prevRoutes, setPrevRoutes] = useState([]);

  const defaultOptionsLoadingOrange = {
    animationData: loadingOrange,
    loop: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getRoutes = async () => {
      if (shouldReload) {
        try {
          const response = await fetch("api/routes/");
          if (response.ok) {
            const data = await response.json();
            setPrevRoutes(data);
          } else {
            throw new Error(
              `Fetch fehlgeschlagen mit Status: ${response.status}`
            );
          }
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      }
    };
    getRoutes();
    setShouldReload(false);
  }, [shouldReload]);

  return (
    <Container>
      <Headline>Previous Routes</Headline>
      {shouldReload && <Lottie options={defaultOptionsLoadingOrange} />}
      {prevRoutes.map(route => {
        return (
          <RouteCard
            setSelected={setSelected}
            setSelectedDest={setSelectedDest}
            setRadius={setRadius}
            setShouldReload={setShouldReload}
            setStops={setStops}
            setWaypoints={setWaypoints}
            setDirectionsResponse={setDirectionsResponse}
            setBars={setBars}
            key={route._id}
            route={route}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 15vh;
`;

const Headline = styled.h1`
  text-align: center;
  font-size: 1.2rem;
  margin: 2em 0 1.5em 0;
  text-decoration: underline;
`;
