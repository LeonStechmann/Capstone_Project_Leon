import styled from "styled-components";
import Link from "next/link";

export default function Heading() {
  return (
    <Link href="/" style={{textDecoration: "none"}}>
      <StyledHeading>Kneipen-Tour App</StyledHeading>
    </Link>
  );
}

const StyledHeading = styled.h1`
  text-align: center;
  color: black;
`;
