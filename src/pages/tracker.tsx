import { SpritesDebug } from "../components/sprites-debug";
import BestiaryImage from "../assets/bestiary.png";
import { elements, textures } from "../options";
import { Footer } from "../components/footer";
import { useEffect, useState } from "react";
import { toggleValueInsideLocalStorage } from "../helpers/local-storage";
import { Alert } from "@mui/material";

enum ETabs {
  BOSSES = "BOSSES",
  CHARACTERS = "CHARACTERS",
  ENEMIES = "ENEMIES",
}

const TrackerPage = () => {
  const [showTab, setShowTab] = useState(ETabs.ENEMIES);
  const [tip, setTip] = useState(null);

  useEffect(() => {
    document.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      if (event.target) {
        const tip = event.target.getAttribute("title");
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
      setTip(event.detail.tip);
    });
  });

  return (
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
          objectName={ETabs.ENEMIES}
          textureObject={textures.enemies}
          information={elements.enemies}
          source={BestiaryImage}
          onClick={(id) => toggleValueInsideLocalStorage(ETabs.ENEMIES, id)}
        />
      )}

      {showTab === ETabs.BOSSES && (
        <SpritesDebug
          objectName={ETabs.BOSSES}
          textureObject={textures.bosses}
          information={elements.bosses}
          source={BestiaryImage}
          onClick={(id) => toggleValueInsideLocalStorage(ETabs.BOSSES, id)}
        />
      )}

      {showTab === ETabs.CHARACTERS && (
        <SpritesDebug
          objectName={ETabs.CHARACTERS}
          textureObject={textures.characters}
          information={elements.characters}
          source={BestiaryImage}
          onClick={(id) => toggleValueInsideLocalStorage(ETabs.CHARACTERS, id)}
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
        bossesClick={() => setShowTab(ETabs.BOSSES)}
        charactersClick={() => setShowTab(ETabs.CHARACTERS)}
        enemiesClick={() => setShowTab(ETabs.ENEMIES)}
        active={showTab}
      />
    </div>
  );
};

export { TrackerPage };
