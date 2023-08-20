import { SpritesDebug } from "../components/sprites-table";
import { elements, textures } from "../options";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { Alert, Button } from "@mui/material";

import "../config/firebase";
import { useFirebase } from "../hooks/use-firebase";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/use-local-storage";

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

  const {
    data,
    isLoading,
    actions: { setNode },
  } = useFirebase({
    url: userId!,
    defaultData: DefaultData,
  });

  // const {
  //   data,
  //   isLoading,
  //   actions: { setNode },
  // } = useLocalStorage({
  //   url: userId!,
  //   defaultData: DefaultData,
  // });

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
              gridAutoRows: "var(--grid-auto-rows)",
              marginBottom: "var(--grid-auto-rows)",
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
                cursor="pointer"
                textureObject={textures.enemies}
                information={elements.enemies}
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
                cursor="pointer"
                textureObject={textures.bosses}
                information={elements.bosses}
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
                cursor="pointer"
                textureObject={textures.characters}
                information={elements.characters}
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
              bossesLabel={
                <>
                  Bosses
                  <br />[
                  {data && data[ETabs.BOSSES] ? data[ETabs.BOSSES].length : 0}/
                  {Object.keys(elements.bosses).length}]
                </>
              }
              charactersClick={() => {
                if (showTab === ETabs.CHARACTERS) {
                  handleScrollToTop();
                  return;
                }
                setShowTab(ETabs.CHARACTERS);
              }}
              charactersLabel={
                <>
                  Characters
                  <br />[
                  {data && data[ETabs.CHARACTERS]
                    ? data[ETabs.CHARACTERS].length
                    : 0}
                  /{Object.keys(elements.characters).length}]
                </>
              }
              enemiesClick={() => {
                if (showTab === ETabs.ENEMIES) {
                  handleScrollToTop();
                  return;
                }
                setShowTab(ETabs.ENEMIES);
              }}
              enemiesLabel={
                <>
                  Enemies
                  <br />[
                  {data && data[ETabs.ENEMIES] ? data[ETabs.ENEMIES].length : 0}
                  /{Object.keys(elements.enemies).length}]
                </>
              }
            />
          </div>
        </>
      )}
    </>
  );
};

export { TrackerManagerPage };
