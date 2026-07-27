import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Box, Typography, LinearProgress } from "@mui/material";

import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  const { currency, symbol } = CryptoState();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
      } catch (error) {
        console.error("Error fetching coin:", error);
      }
    };

    if (id) {
      fetchCoin();
    }
  }, [id]);

  if (!coin) {
    return <LinearProgress color="warning" />;
  }

  const description =
    coin?.description?.en
      ?.replace(/<[^>]*>/g, "")
      ?.split(". ")[0] || "No description available";

  const currentPrice =
    coin?.market_data?.current_price?.[currency?.toLowerCase()] ?? 0;

  const marketCap =
    coin?.market_data?.market_cap?.[currency?.toLowerCase()] ?? 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 3,
          p: 3,
          borderRight: {
            xs: "none",
            md: "2px solid rgba(255,255,255,0.2)",
          },
        }}
      >
        <Box
          component="img"
          src={coin?.image?.large}
          alt={coin?.name}
          sx={{
            height: 200,
            mb: 2,
          }}
        />

        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
          }}
        >
          {coin?.name}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            width: "100%",
            textAlign: "justify",
            mb: 3,
          }}
        >
          {description}.
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Rank:
            </Typography>

            <Typography variant="h6">
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Current Price:
            </Typography>

            <Typography variant="h6">
              {symbol}
              {numberWithCommas(currentPrice)}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="h6" fontWeight="bold">
              Market Cap:
            </Typography>

            <Typography variant="h6">
              {symbol}
              {numberWithCommas(Math.round(marketCap / 1000000))}
              M
            </Typography>
          </Box>
        </Box>
      </Box>

      <CoinInfo coin={coin} />
    </Box>
  );
};

export default CoinPage;