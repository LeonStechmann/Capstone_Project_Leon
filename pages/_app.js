import GlobalStyles from "../styles/GlobalStyles";
import Layout from "../components/Layout";
import {useState} from "react";
import {useLoadScript} from "@react-google-maps/api";

const libraries = ["places", "geometry"];

function MyApp({Component, pageProps}) {
  const [selected, setSelected] = useState(null);
  const [selectedDest, setSelectedDest] = useState(null);
  const [radius, setRadius] = useState(0);
  const [stops, setStops] = useState(0);
  const [bars, setBars] = useState(null);
  const [waypoints, setWaypoints] = useState([]);

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
        />
      </Layout>
    </>
  );
}

export default MyApp;
