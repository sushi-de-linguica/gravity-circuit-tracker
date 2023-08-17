import { SpritesDebug } from "../components/sprites-debug";
import BestiaryImage from "../assets/bestiary.png";
import { elements, textures } from "../options";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";

import "../config";
import { useFirebase } from "../hooks/use-firebase";
import { useParams } from "react-router-dom";
import { setNode } from "../services/firebase";

export enum ETabs {
  BOSSES = "BOSSES",
  CHARACTERS = "CHARACTERS",
  ENEMIES = "ENEMIES",
}

export const DefaultData = {
  [ETabs.ENEMIES]: [],
  [ETabs.BOSSES]: [],
  [ETabs.CHARACTERS]: [],
};

const TrackerManagerPage = () => {
  const { userId } = useParams();
  const [showTab, setShowTab] = useState(ETabs.ENEMIES);
  const [tip, setTip] = useState(null);

  const { data, isLoading } = useFirebase({
    url: userId!,
    defaultData: DefaultData,
  });

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (event.target) {
        const tip = (event.target as any).getAttribute("title");
        if (tip) {
          window.dispatchEvent(
            new CustomEvent("SHOW_TIP", {
              detail: {
                tip,
              },
            })
          );
        }
      }
    });

    window.addEventListener("SHOW_TIP", (event) => {
      console.log("eventTip", event);
      setTip((event as any).detail.tip);
    });
  });

  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const toggleFirebaseValueByKey = (key: string, value: any) => {
    if (data && data[key]) {
      if (data[key].includes(value)) {
        setNode(userId, {
          ...data,
          [key]: data[key].filter((currentValue) => currentValue != value),
        });
        return;
      }
      const newValue = [...data[key]];
      newValue.push(value);
      setNode(userId, {
        ...data,
        [key]: newValue,
      });
      return;
    }

    setNode(userId, {
      ...data,
      [key]: [value],
    });
  };

  return (
    <>
      {isLoading && "loading..."}
      {!isLoading && (
        <>
          <Button
            color="error"
            onClick={() => {
              if (
                confirm(
                  "You're going to reset all your progress, are you sure?"
                )
              ) {
                setNode(userId, DefaultData);
              }
            }}
          >
            Reset
          </Button>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "var(--grid-template-columns)",
              gridTemplateRows: "var(--grid-template-rows)",
              gridAutoFlow: "dense",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showTab === ETabs.ENEMIES && (
              <SpritesDebug
                firebaseData={
                  data && data[ETabs.ENEMIES] ? data[ETabs.ENEMIES] : []
                }
                textureObject={textures.enemies}
                information={elements.enemies}
                source={BestiaryImage}
                onClick={(id) => {
                  toggleFirebaseValueByKey(ETabs.ENEMIES, id);
                }}
              />
            )}

            {showTab === ETabs.BOSSES && (
              <SpritesDebug
                firebaseData={
                  data && data[ETabs.BOSSES] ? data[ETabs.BOSSES] : []
                }
                textureObject={textures.bosses}
                information={elements.bosses}
                source={BestiaryImage}
                onClick={(id) => {
                  toggleFirebaseValueByKey(ETabs.BOSSES, id);
                }}
              />
            )}

            {showTab === ETabs.CHARACTERS && (
              <SpritesDebug
                firebaseData={
                  data && data[ETabs.CHARACTERS] ? data[ETabs.CHARACTERS] : []
                }
                textureObject={textures.characters}
                information={elements.characters}
                source={BestiaryImage}
                onClick={(id) => {
                  toggleFirebaseValueByKey(ETabs.CHARACTERS, id);
                }}
              />
            )}

            {tip && (
              <Alert
                variant="filled"
                severity="info"
                style={{
                  position: "fixed",
                  bottom: "65px",
                  left: "0",
                  right: "0",
                  cursor: "pointer",
                }}
                onClick={() => setTip(null)}
              >
                {tip}
              </Alert>
            )}

            <Footer
              bossesClick={() => {
                if (showTab === ETabs.BOSSES) {
                  handleScrollToTop();
                  return;
                }
                setShowTab(ETabs.BOSSES);
              }}
              charactersClick={() => {
                if (showTab === ETabs.CHARACTERS) {
                  handleScrollToTop();
                  return;
                }
                setShowTab(ETabs.CHARACTERS);
              }}
              enemiesClick={() => {
                if (showTab === ETabs.ENEMIES) {
                  handleScrollToTop();
                  return;
                }
                setShowTab(ETabs.ENEMIES);
              }}
              active={showTab}
            />
          </div>
        </>
      )}
    </>
  );
};

export { TrackerManagerPage };
