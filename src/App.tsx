import { Container, useMediaQuery } from "@mui/material";

import { Outlet } from "react-router-dom";

function App() {
  const isSmall = useMediaQuery("(max-width:900px)");
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: `100%`,
        width: `100%`,
        display: "flex",
        flexDirection: "column",
        minHeight: "0",
        pb: isSmall ? 0 : 1,
      }}
      disableGutters={isSmall}
    >
      <Outlet />
    </Container>
  );
}

export default App;
