import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { ETabs } from "../../pages/tracker-manager";
import { useState } from "react";

const Footer = ({
  enemiesClick,
  bossesClick,
  charactersClick,
  bossesLabel,
  charactersLabel,
  enemiesLabel,
}) => {
  const [value, setValue] = useState(ETabs.ENEMIES);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
        boxShadow: "0px 2px 19px #888",
      }}
    >
      <BottomNavigationAction
        label={enemiesLabel}
        value={ETabs.ENEMIES}
        style={{
          fontWeight: "bold",
        }}
        onClick={enemiesClick}
      />
      <BottomNavigationAction
        label={bossesLabel}
        value={ETabs.BOSSES}
        style={{
          fontWeight: "bold",
        }}
        onClick={bossesClick}
      />
      <BottomNavigationAction
        label={charactersLabel}
        value={ETabs.CHARACTERS}
        style={{
          fontWeight: "bold",
        }}
        onClick={charactersClick}
      />
    </BottomNavigation>
  );
};

export { Footer };
