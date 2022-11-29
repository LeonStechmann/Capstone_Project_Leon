import styled from "styled-components";
import {Navigation} from "./Navbar";

const Layout = ({children}) => {
  return (
    <>
      <StyledHeading>Kneipen-Tour App</StyledHeading>
      {children}
      <Navigation />
    </>
  );
};

const StyledHeading = styled.h1`
  text-align: center;
`;

export default Layout;
