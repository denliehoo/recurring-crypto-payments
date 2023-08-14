import { Box, Container } from "@mui/material";

const CentrePage = (props: any) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ height: "100vh", display: "flex", alignItems: "center" }}
    >
      <Box
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {props.children}
      </Box>
    </Container>
  );
};

export default CentrePage;
