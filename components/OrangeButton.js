import styled from "styled-components";

export default function OrangeButton({text, name, disabled, onClick}) {
  return (
    <StyledButton className={name} disabled={disabled} onClick={onClick}>
      {text}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  box-sizing: border-box;
  background-color: var(--yellow);
  border-radius: 12px;
  border: 0;
  color: #000;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  padding: 10px 15px;
  width: 30%;
  position: relative;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;

  &.plan {
    width: 100%;
  }
  &.more {
    margin: 1.4em 0 15vh 0;
    ${props => props.disabled && "background-color: grey"};
  }
  &.save {
    margin-bottom: 1em;
  }
  &:after {
    content: "";
    display: block;
    position: absolute;
    border-radius: 4em;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: all 0.5s;
    box-shadow: 0 0 10px 40px white;
  }

  &:active:after {
    ${props =>
      !props.disabled &&
      `
      box-shadow: 0 0 0 0 white;
      position: absolute;
      border-radius: 4em;
      left: 0;
      top: 0;
      opacity: 1;
      transition: 0s;
    `}
  }

  &:active {
    ${props =>
      !props.disabled &&
      `
      top: 1px;
    `}
  }
`;
