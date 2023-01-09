import styled from "styled-components";

export default function BlackButton({text, name, onClick, disabled}) {
  return (
    <StyledButton disabled={disabled} onClick={onClick} className={name}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  box-sizing: border-box;
  background-color: var(--black);
  color: white;
  border: 2px solid var(--black);
  border-radius: 30px;
  font-weight: bold;
  font-size: 16px;

  &.delete {
    height: 27px;
    width: 27px;
    margin: 0.3em 0.3em 0 0;
  }

  &.redo {
    height: 27px;
    width: 80px;
    margin-top: 1em;
  }
`;
