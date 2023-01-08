import styled from "styled-components";
import PlacesAutocomplete from "./PlacesAutoComplete";
import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
} from "@reach/slider";
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
    <FormContainer method="get">
      <StyledSpan>Starting Point:</StyledSpan>
      <PlacesAutocomplete setSelected={setSelected} positionStatus={"Start"} />
      <StyledSpan>Destination:</StyledSpan>
      <PlacesAutocomplete
        setSelectedDest={setSelectedDest}
        positionStatus={"Dest"}
      />
      <StyledSpan>Bars: {stops}</StyledSpan>
      <StyledSliderInput
        min={0}
        max={25}
        value={stops}
        onChange={newValue => handleChangeStops(newValue)}
      >
        <SliderTrack>
          <StyledSliderRange></StyledSliderRange>
          <StyledSliderHandle />
        </SliderTrack>
      </StyledSliderInput>
      <StyledSpan>Radius: {radius}m</StyledSpan>
      <StyledSliderInput
        min={0}
        max={4000}
        step={500}
        value={radius}
        onChange={newValue => handleChangeRadius(newValue)}
      >
        <SliderTrack>
          <StyledSliderRange />
          <StyledSliderHandle />
        </SliderTrack>
      </StyledSliderInput>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const StyledSliderInput = styled(SliderInput)`
  width: 60vw;
`;

const StyledSliderHandle = styled(SliderHandle)`
  background-color: var(--black);
  border: 2px solid white;
  width: 1.5em;
`;

const StyledSliderRange = styled(SliderRange)`
  background-color: var(--yellow);
`;

const StyledSpan = styled.span`
  font-size: 1.2rem;
`;
