import styled from "styled-components";
import Link from "next/link";
import {useRouter} from "next/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {faRoute} from "@fortawesome/free-solid-svg-icons";
import {faBars} from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const router = useRouter();

  return (
    <Navbar>
      <NavList>
        <ListItems>
          <Link href="/">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={router.pathname === "/" ? "black" : "grey"}
            />
          </Link>
        </ListItems>
        <ListItems>
          <Link href="/route">
            <FontAwesomeIcon
              icon={faRoute}
              color={router.pathname === "/route" ? "black" : "grey"}
            />
          </Link>
        </ListItems>
        <ListItems>
          <Link href="/previous-routes">
            <FontAwesomeIcon
              icon={faBars}
              color={router.pathname === "/previous-routes" ? "black" : "grey"}
            />
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
  background-color: white;
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
