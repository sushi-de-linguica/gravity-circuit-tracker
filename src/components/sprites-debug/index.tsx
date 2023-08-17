import { v4 as uuidv4 } from "uuid";
import { Sprite } from "../sprite";

const SpritesDebug = ({
  firebaseData,
  textureObject,
  information,
  opacityWhenExist = true,
  source,
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
            cursor: "pointer",
            opacity: opacityWhenExist
              ? firebaseData.includes(id)
                ? "0.1"
                : "1"
              : firebaseData.includes(id)
              ? "1"
              : "0.1",
          }}
          showCardId={showCardId}
          onClick={() => onClick(id)}
        />
      ))}
    </>
  );
};

export { SpritesDebug };
