import styled from "styled-components";
import PlacesAutocomplete from "./PlacesAutoComplete";
import {Slider, SliderMarker} from "@reach/slider";
import "@reach/slider/styles.css";

export function FormHome({
  setSelected,
  setSelectedDest,
  radius,
  setRadius,
  stops,
  setStops,
}) {
  const handleChangeStops = newValue => {
    setStops(newValue);
  };

  const handleChangeRadius = newValue => {
    setRadius(newValue);
  };
  return (
    <>
      <FormContainer method="get">
        <span>Starting Point:</span>
        <PlacesAutocomplete
          setSelected={setSelected}
          positionStatus={"Start"}
        />
        <span>Destination:</span>
        <PlacesAutocomplete
          setSelectedDest={setSelectedDest}
          positionStatus={"Dest"}
        />
        <span>Amount of stops:</span>
        <StyledSlider
          min={0}
          max={25}
          value={stops}
          onChange={newValue => handleChangeStops(newValue)}
        >
          {new Array(26).fill("x").map((x, index) => (
            <SliderMarker value={index * 5} key={index}>
              <span>{index * 5}</span>
            </SliderMarker>
          ))}
        </StyledSlider>
        <span>Set radius:</span>
        <StyledSlider
          min={0}
          max={4000}
          step={500}
          defaultValue={0}
          value={radius}
          onChange={newValue => handleChangeRadius(newValue)}
        >
          {new Array(11).fill("x").map((x, index) => (
            <SliderMarker value={index * 1000} key={index * 1000}>
              <span>{index * 1}km</span>
            </SliderMarker>
          ))}
        </StyledSlider>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledSlider = styled(Slider)`
  width: 60vw;
`;
