import GlobalStyles from "../styles/GlobalStyles";
import {useLoadScript} from "@react-google-maps/api";
import {useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import Layout from "../components/Layout";

const libraries = ["places", "geometry"];

function MyApp({Component, pageProps}) {
  const [selected, setSelected] = useLocalStorage("selected", null);
  const [selectedDest, setSelectedDest] = useLocalStorage("selectedDest", null);
  const [radius, setRadius] = useLocalStorage("radius", 0);
  const [stops, setStops] = useLocalStorage("stops", 0);
  const [bars, setBars] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component
          {...pageProps}
          isLoaded={isLoaded}
          selected={selected}
          setSelected={setSelected}
          selectedDest={selectedDest}
          setSelectedDest={setSelectedDest}
          radius={radius}
          setRadius={setRadius}
          stops={stops}
          setStops={setStops}
          bars={bars}
          setBars={setBars}
          waypoints={waypoints}
          setWaypoints={setWaypoints}
          directionsResponse={directionsResponse}
          setDirectionsResponse={setDirectionsResponse}
        />
      </Layout>
    </>
  );
}

export default MyApp;
