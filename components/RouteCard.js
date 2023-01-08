import {useState, Fragment} from "react";
import {useRouter} from "next/router";
import styled from "styled-components";
import BlackButton from "./BlackButton";

export default function RouteCard({
  route,
  setSelectedDest,
  setSelected,
  setRadius,
  setStops,
  setShouldReload,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  const deleteRoute = async id => {
    try {
      const response = await fetch(`/api/routes/${id}`, {method: "DELETE"});
      if (response.ok) {
        setShouldReload(true);
      } else {
        throw new Error(`Fetch fehlgeschlagen mit Status: ${response.status}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const redoRoute = async id => {
    try {
      const response = await fetch(`/api/routes/${id}`, {method: "GET"});
      if (response.ok) {
        const data = await response.json();
        setSelected(data.selected);
        setSelectedDest(data.selectedDest);
        setRadius(data.radius);
        setStops(data.stops);
      } else {
        throw new Error(`Fetch fehlgeschlagen mit Status ${response.status}`);
      }
    } catch (error) {
      alert(error.message);
    }
    router.replace("/route");
  };

  return (
    <StyledRoutesContainer onClick={() => setIsExpanded(!isExpanded)}>
      <RouteDetails>
        <RouteHeadline route={route} />
        <BlackButton
          name={"delete"}
          text={"X"}
          onClick={event => {
            event.stopPropagation();
            deleteRoute(route._id);
          }}
        />
      </RouteDetails>
      {isExpanded && (
        <BarsContainer>
          {route.bars.map((bar, index) => {
            return (
              <Fragment key={`${bar}_${route._id}`}>
                <StyledBars>{bar}</StyledBars>
                {index !== route.bars.length - 1 && "⬇"}
              </Fragment>
            );
          })}
          <BlackButton
            name={"redo"}
            onClick={event => {
              event.stopPropagation();
              redoRoute(route._id);
            }}
            text={"redo"}
          />
        </BarsContainer>
      )}
    </StyledRoutesContainer>
  );
}

const BarsContainer = styled.div`
  text-align: center;
  margin-top: 1em;
`;

const HeadlineContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1em;
  text-align: center;
`;

const RouteDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RouteHeadline = ({route}) => {
  const start = route.start;
  const destination = route.destination;
  return (
    <HeadlineContainer>
      <StyledAdress>
        {start.substring(0, start.indexOf(",", start.indexOf(",") + 1))} -{" "}
      </StyledAdress>
      <StyledAdress>
        {destination.substring(
          0,
          destination.indexOf(",", destination.indexOf(",") + 1)
        )}
      </StyledAdress>
    </HeadlineContainer>
  );
};

const StyledAdress = styled.p`
  font-weight: bold;
  margin: 0.2em 0;
`;

const StyledBars = styled.p`
  margin: 0.2em 0;
  font-weight: bold;
`;

const StyledRoutesContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em 2em 2em;
  padding: 0.5em 0 0.5em 0;
  border-radius: 20px;
  background-color: var(--yellow);
  color: var(--black);
`;
