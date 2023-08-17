import { Button, ButtonGroup } from "@mui/material";

const Footer = ({ enemiesClick, bossesClick, charactersClick, active }) => {
  return (
    <ButtonGroup
      variant="contained"
      style={{
        position: "fixed",
        height: "40px",
        bottom: "0",
        left: "0",
        right: "0",
        width: "100%",
      }}
    >
      <Button
        fullWidth
        onClick={enemiesClick}
        color={active === "ENEMIES" ? "secondary" : "primary"}
      >
        Enemies
      </Button>
      <Button
        fullWidth
        onClick={bossesClick}
        color={active === "BOSSES" ? "secondary" : "primary"}
      >
        Bosses
      </Button>
      <Button
        fullWidth
        onClick={charactersClick}
        color={active === "CHARACTERS" ? "secondary" : "primary"}
      >
        Characters
      </Button>
    </ButtonGroup>
  );
};

export { Footer };
