import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import styled from "styled-components";

const PlacesAutocomplete = ({setSelected, setSelectedDest, positionStatus}) => {
  const handleSelected = latlngObject => {
    setSelected(latlngObject);
  };

  const handleSelectedDest = latlngObject => {
    setSelectedDest(latlngObject);
  };

  const {
    ready,
    value,
    setValue,
    suggestions: {status, data},
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async address => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({address});
    const {lat, lng} = await getLatLng(results[0]);
    if (positionStatus === "Start") handleSelected({lat, lng});
    if (positionStatus === "Dest") handleSelectedDest({lat, lng});
  };

  return (
    <Combobox onSelect={handleSelect}>
      <StyledComboboxInput
        value={value}
        onChange={e => setValue(e.target.value)}
        disabled={!ready}
        className="combobox-input"
        placeholder="Search an address"
      />
      <ComboboxPopover>
        <StyledComboboxList>
          {status === "OK" &&
            data.map(({place_id, description}) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </StyledComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
export default PlacesAutocomplete;

const StyledComboboxInput = styled(ComboboxInput)`
  width: 60vw;
  height: 4vh;
  font-size: 1rem;
  text-align: center;
  border-radius: 100px;
`;

const StyledComboboxList = styled(ComboboxList)`
  color: black;
`;
