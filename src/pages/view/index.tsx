import { useParams } from "react-router-dom";

import "../../config/firebase";
import { useFirebase } from "../../hooks/use-firebase";
import { DefaultData, ETabs } from "../tracker-manager";
import { SpritesDebug } from "../../components/sprites-table";
import { elements, textures } from "../../options";
import {
  ViewContainer,
  containerStyle,
  insideContainerStyle,
  titleStyle,
} from "./styles";

const ViewPage = () => {
  const { userId } = useParams();

  if (!userId) {
    return <>Invalid user...</>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, isLoading } = useFirebase({
    url: userId!,
    defaultData: DefaultData,
  });

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

export { ViewPage as TrackerViewPage };
