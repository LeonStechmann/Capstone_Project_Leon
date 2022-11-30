import Heading from "./Header";
import Navigation from "./Navbar";

const Layout = ({children}) => {
  return (
    <>
      <Heading />
      {children}
      <Navigation />
    </>
  );
};

export default Layout;
