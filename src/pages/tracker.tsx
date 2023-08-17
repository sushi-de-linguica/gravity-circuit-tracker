import { SpritesDebug } from "../components/sprites-debug";
import BestiaryImage from "../assets/bestiary.png";
import { textures } from "../options";

const TrackerPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <SpritesDebug textureObject={textures.bestiary} source={BestiaryImage} /> */}
      <SpritesDebug textureObject={textures.bosses} source={BestiaryImage} />
    </div>
  );
};

export { TrackerPage };
