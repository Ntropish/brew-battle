import { Container, useMediaQuery } from "@mui/material";

import { Outlet } from "react-router-dom";

function App() {
  const isSmall = useMediaQuery("(max-width:900px)");
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: `100%`,
        width: `100%`,
        display: "flex",
        flexDirection: "column",
        minHeight: "0",
      }}
      disableGutters={isSmall}
    >
      <Outlet />
    </Container>
  );
}

export default App;
