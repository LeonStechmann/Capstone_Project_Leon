import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import planBarLogo from "../public/assets/planBarLogo.png";

export default function Heading() {
  return (
    <Link href="/" style={{textDecoration: "none"}}>
      <HeadingContainer>
        <Image
          src={planBarLogo}
          width={200}
          height={63.66}
          alt={"planBar Logo"}
        />
      </HeadingContainer>
    </Link>
  );
}

const StyledHeading = styled.h1`
  color: white;
`;

const HeadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em 0 2.2em 0;
`;
