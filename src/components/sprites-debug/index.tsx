import { Sprite } from "../sprite";

const SpritesDebug = ({ textureObject, source }) => {
  return (
    <>
      {Object.entries(textureObject).map(([id, data], index) => {
        return (
          <Sprite
            texture={data}
            source={source}
            key={index}
            title={id}
          ></Sprite>
        );
      })}
    </>
  );
};

export { SpritesDebug };
