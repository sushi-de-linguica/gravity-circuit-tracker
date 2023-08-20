import { v4 as uuidv4 } from "uuid";
import { Sprite } from "../sprite";
import BestiaryImage from "../../assets/bestiary.png";

const SpritesTable = ({
  firebaseData,
  textureObject,
  information,
  opacityWhenExist = true,
  source = BestiaryImage,
  cursor = "default",
  onClick,
  showCardId = true,
}) => {
  const getTitleById = (id: any) => {
    if (!information || id == null || id == undefined) {
      return "";
    }

    const object = information.find((info) => info.id == id);
    if (!object) {
      return "";
    }

    return object.locationText;
  };
  return (
    <>
      {Object.entries(textureObject).map(([id, data]: any) => (
        <Sprite
          texture={data}
          source={source}
          key={uuidv4()}
          title={getTitleById(id)}
          id={id}
          style={{
            transform:
              data && data.scale
                ? `scale(calc(var(--scale-size) / ${data.scale}))`
                : "scale(var(--scale-size))",
            cursor,
            opacity: opacityWhenExist
              ? firebaseData.includes(id)
                ? "var(--inactive-item-opacity)"
                : "var(--active-item-opacity)"
              : firebaseData.includes(id)
              ? "var(--active-item-opacity)"
              : "var(--inactive-item-opacity)",
          }}
          showCardId={showCardId}
          onClick={() => onClick(id)}
        />
      ))}
    </>
  );
};

export { SpritesTable as SpritesDebug };
