import styled from "styled-components";
import {useState} from "react";
import Image from "next/image";
import barfallbackimage from "../public/assets/barfallbackimage.jpg";
import Lottie from "react-lottie";
import loading from "../public/lotties/loading.json";
import challenges from "../_data/challenges.json";
import Barrating from "./Barrating";

export default function BarDetails({bar, isExpanded, isWaypoint}) {
  const [isLoading, setIsLoading] = useState(true);
  const randomId = Math.floor(Math.random() * 15) + 1;
  return (
    <BarDetailsContainer>
      <BarName>{bar.name}</BarName>
      {isExpanded && (
        <>
          {!isLoading && (
            <Barrating
              bar={bar}
              fillColor={"var(--black)"}
              emptyColor={"white"}
            />
          )}

          <ChallengeContainer>
            {isLoading && (
              <Lottie
                options={{
                  animationData: loading,
                  loop: true,
                  height: 30,
                  width: 30,
                }}
              />
            )}
            <StyledImage
              src={bar.url ? `${bar.url}` : barfallbackimage}
              width={bar.url ? bar.photos[0].width : "6em"}
              height={bar.url ? bar.photos[0].height : "6em"}
              alt={`Picture of the bar: ${bar.name}`}
              onLoad={() => setIsLoading(false)}
              style={{opacity: isLoading ? 0 : 1}}
            />
            {!isLoading && isWaypoint(bar) && (
              <Challenge>
                <span style={{fontWeight: "bold"}}>Challange:</span>
                <br></br>
                {challenges.map(challenge => {
                  if (challenge.id === randomId) return challenge.challenge;
                })}
              </Challenge>
            )}
          </ChallengeContainer>
          {!isLoading && (
            <BarAddress>
              {bar.vicinity.substring(0, bar.vicinity.indexOf(","))}
            </BarAddress>
          )}
        </>
      )}
    </BarDetailsContainer>
  );
}

const BarAddress = styled.p`
  font-size: 0.8rem;
  max-width: 6em;
  overflow-wrap: break-word;
`;

const BarDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin: 2px;
  }
`;

const BarName = styled.h3`
  margin: 0;
  align-items: center;
`;

const Challenge = styled.p`
  font-size: 0.9rem;
  margin-left: 1.6em;
  text-align: center;
`;

const ChallengeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 6em;
  height: 6em;
  border-radius: 15px;
  margin-top: 10px;
  transition: opacity 0.5s ease-in;
`;
