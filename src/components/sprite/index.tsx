import { Popover } from "@mui/material";
import { PropsWithChildren } from "react";
interface ISpriteProps {
  texture: any;
  source: string;
  showCardId?: boolean;
  multiplySize?: number;
  id: string;
}

const Sprite = ({
  texture,
  source,
  showCardId,
  multiplySize,
  id,
  ...rest
}: ISpriteProps & PropsWithChildren & any) => {
  const { x, y, width, height, textureWidth, textureHeight } = texture as any;

  const resizeMultiply = multiplySize || 1;

  const style = {
    position: "relative",
    width: `${resizeMultiply * width}px`,
    height: `${resizeMultiply * height}px`,
    backgroundImage: `url(${source})`,
    backgroundPosition: `-${resizeMultiply * x}px -${resizeMultiply * y}px`,
    backgroundSize: `${resizeMultiply * textureWidth}px ${
      resizeMultiply * textureHeight
    }px`,
    marginBottom: showCardId ? "var(--card-margin-bottom)" : "0",
    justifySelf: "center",
    ...(rest.style ? rest.style : {}),
  };

  return (
    <div {...rest} style={style}>
      {showCardId && (
        <span
          style={{
            background: "black",
            position: "absolute",
            bottom: "-15px",
            left: "0",
            right: "0",
            fontSize: "8px",
            textAlign: "center",
            color: "white",
          }}
        >
          {id}
        </span>
      )}
    </div>
  );
};

export { Sprite };
