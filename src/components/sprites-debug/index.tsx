import { v4 as uuidv4 } from "uuid";
import { Sprite } from "../sprite";
import { useEffect, useState } from "react";

const SpritesDebug = ({
  textureObject,
  information,
  source,
  onClick,
  objectName,
}) => {
  const [finisheds, setFinisheds] = useState([]);

  const handleStorageUpdate = () => {
    console.log("updated local storage");
    const obj = localStorage.getItem(objectName);
    if (!obj) {
      localStorage.setItem(objectName, JSON.stringify([]));
      return;
    }

    const json = JSON.parse(obj);
    setFinisheds(json);
  };

  useEffect(() => {
    handleStorageUpdate();

    window.addEventListener("UPDATE_LOCAL_STORAGE", handleStorageUpdate);

    return () => {
      window.removeEventListener("UPDATE_LOCAL_STORAGE", handleStorageUpdate);
    };
  }, []);
  return (
    <>
      {Object.entries(textureObject).map(([id, data], index) => (
        <Sprite
          texture={data}
          source={source}
          key={uuidv4()}
          title={information[id] && information[id].locationText}
          id={id}
          style={{
            transform:
              data && data.scale
                ? `scale(calc(var(--scale-size) / ${data.scale}))`
                : "scale(var(--scale-size))",
            cursor: "pointer",
            opacity: finisheds.includes(id) ? "0.1" : "1",
          }}
          showCardId
          onClick={() => onClick(id)}
        />
      ))}
    </>
  );
};

export { SpritesDebug };
