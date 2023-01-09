import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

export default function Barrating({bar, fillColor, emptyColor}) {
  return (
    <BarRating>
      <FontAwesomeIcon
        icon={faStar}
        color={bar.rating > 0.5 ? fillColor : emptyColor}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={bar.rating > 1.5 ? fillColor : emptyColor}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={bar.rating > 2.5 ? fillColor : emptyColor}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={bar.rating > 3.5 ? fillColor : emptyColor}
      />
      <FontAwesomeIcon
        icon={faStar}
        color={bar.rating > 4.5 ? fillColor : emptyColor}
      />
      ({bar.user_ratings_total})
    </BarRating>
  );
}

const BarRating = styled.p`
  font-size: 0.6rem;
`;
