import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";

export default function Map({userLat, userLng}) {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <h1>Loading...</h1>;
  if (userLat && userLng)
    return (
      <>
        <GoogleMap
          zoom={13}
          center={{lat: userLat, lng: userLng}}
          mapContainerStyle={{
            height: "30vh",
            width: "80%",
          }}
        >
          <Marker position={{lat: userLat, lng: userLng}} />
        </GoogleMap>
      </>
    );
}
