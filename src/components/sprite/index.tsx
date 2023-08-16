import { PropsWithChildren } from "react";
interface ISpriteProps {
  texture: any;
  source: string;
  key: string | number;
}

const Sprite = ({
  texture,
  source,
  key,
  children,
  ...rest
}: ISpriteProps & PropsWithChildren & any) => {
  const { x, y, width, height, textureWidth, textureHeight } = texture as any;

  const style = {
    position: "relative",
    width: `${width}px`,
    height: `${height}px`,
    backgroundImage: `url(${source})`,
    backgroundPosition: `-${x}px -${y}px`,
    backgroundSize: `${textureWidth}px ${textureHeight}px`,
    marginBottom: "15px",
  };

  return (
    <div key={key} {...rest} style={style}>
      {children}
      {/* <span
        style={{
          background: "black",
          position: "absolute",
          bottom: "-15px",
          left: "0",
          right: "0",
          fontSize: "8px",
        }}
      >
        {name}
      </span> */}
    </div>
  );
};

export { Sprite };
