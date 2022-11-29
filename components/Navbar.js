import styled from "styled-components";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
import {faRoute} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export function Navigation() {
  return (
    <Navbar>
      <NavList>
        <ListItems>
          <Link href="/">
            <FontAwesomeIcon icon={faHouse} alt="home icon" />
          </Link>
        </ListItems>
        <ListItems>
          <Link href="/route">
            <FontAwesomeIcon icon={faRoute} alt="route icon" />
          </Link>
        </ListItems>
        <ListItems>
          <Link href="/previous-routes">
            <FontAwesomeIcon icon={faBars} alt="menu icon" />
          </Link>
        </ListItems>
      </NavList>
    </Navbar>
  );
}

const Navbar = styled.nav`
  border-top: 3px solid black;
  position: fixed;
  bottom: 0;
  width: 100%;
`;

const NavList = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 10vh;
`;

const ListItems = styled.li`
  font-size: 2.5rem;
  text-decoration: none;
`;
