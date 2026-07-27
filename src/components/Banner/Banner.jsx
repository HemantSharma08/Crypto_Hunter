import React from "react";
import { Box, Container, Typography } from "@mui/material";
import Carousel from "./Carousel";
import banner from "../../assets/banner2.jpg";

const Banner = () => {
  return (
        
    <Box
      sx={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          height: 400,
          display: "flex",
          flexDirection: "column",
          pt: 3,
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "40%",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Hunter
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Box>

        <Carousel />
      </Container>
    </Box>
    
  );
};

export default Banner;