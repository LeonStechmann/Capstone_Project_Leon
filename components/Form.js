import styled from "styled-components";

export function FormHome() {
  return (
    <FormContainer method="get">
      <span>Starting Point:</span>
      <label htmlFor="start">
        <input
          type="text"
          name="start"
          required
          placeholder="Musterstraße 12"
        />
      </label>
      <span>Destination:</span>
      <label htmlFor="destination">
        <input
          type="text"
          name="destination"
          id="destination"
          placeholder="Zielstraße 15"
        />
      </label>
      <span>Amount of stops:</span>
      <label htmlFor="stops">
        <input type="number" name="stops" id="stops" required />
      </label>
      <StyledButton type="submit">Submit</StyledButton>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const StyledButton = styled.button`
  box-sizing: border-box;
  background-color: #fff000;
  border-radius: 12px;
  border: 0;
  color: #000;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 10px 15px;
  width: 60%;
`;
