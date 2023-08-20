import { useParams } from "react-router-dom";
import "../config";
import { useFirebase } from "../hooks/use-firebase";
import { DefaultData, ETabs } from "./tracker-manager";
import { SpritesDebug } from "../components/sprites-debug";
import { elements, textures } from "../options";
import BestiaryImage from "../assets/bestiary.png";

import styled from "@emotion/styled";

const ViewContainer = styled.div`
  --column-size: 100px;
  --grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  --grid-template-rows: repeat(25, 125px);
  --card-margin-bottom: 15px;
  --scale-size: 1;
`;

const TrackerViewPage = () => {
  const { userId } = useParams();

  if (!userId) {
    return <>Sem usuário...</>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useFirebase({
    url: userId!,
    defaultData: DefaultData,
  });

  const insideContainerStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  };

  const containerStyle = { display: "flex", flexDirection: "column" };

  const titleStyle = { fontSize: "18px" };

  return (
    <ViewContainer>
      {isLoading && "loading..."}
      {!isLoading && (
        <>
          <div style={containerStyle as any}>
            <h1 style={titleStyle as any}>
              Enemies [
              {data && data[ETabs.ENEMIES] ? data[ETabs.ENEMIES].length : 0}/
              {Object.keys(elements.enemies).length}]
            </h1>
            <div style={insideContainerStyle as any}>
              <SpritesDebug
                firebaseData={
                  data && data[ETabs.ENEMIES] ? data[ETabs.ENEMIES] : []
                }
                textureObject={textures.enemies}
                information={elements.enemies}
                source={BestiaryImage}
                showCardId={false}
                opacityWhenExist={false}
                onClick={() => {}}
              />
            </div>
          </div>

          <div style={containerStyle as any}>
            <h1 style={titleStyle as any}>
              Bosses [
              {data && data[ETabs.BOSSES] ? data[ETabs.BOSSES].length : 0}/
              {Object.keys(elements.bosses).length}]
            </h1>
            <div style={insideContainerStyle as any}>
              <SpritesDebug
                firebaseData={
                  data && data[ETabs.BOSSES] ? data[ETabs.BOSSES] : []
                }
                textureObject={textures.bosses}
                information={elements.bosses}
                source={BestiaryImage}
                showCardId={false}
                opacityWhenExist={false}
                onClick={() => {}}
              />
            </div>
          </div>

          <div style={containerStyle as any}>
            <h1 style={titleStyle as any}>
              Characters [
              {data && data[ETabs.CHARACTERS]
                ? data[ETabs.CHARACTERS].length
                : 0}
              /{Object.keys(elements.characters).length}]
            </h1>
            <div style={insideContainerStyle as any}>
              <SpritesDebug
                firebaseData={
                  data && data[ETabs.CHARACTERS] ? data[ETabs.CHARACTERS] : []
                }
                textureObject={textures.characters}
                information={elements.characters}
                source={BestiaryImage}
                showCardId={false}
                opacityWhenExist={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </>
      )}
    </ViewContainer>
  );
};

export { TrackerViewPage };
