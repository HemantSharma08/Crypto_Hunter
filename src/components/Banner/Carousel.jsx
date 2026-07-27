import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const { currency, symbol } = CryptoState();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      console.error("Error fetching coins:", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={2}
        loop={trending.length >= 5}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          512: {
            slidesPerView: 4,
          },
        }}
        style={{ width: "100%" }}
      >
        {trending.map((coin) => {
          const profit = coin?.price_change_percentage_24h >= 0;

          return (
            <SwiperSlide key={coin.id}>
              <Link
                to={`/coins/${coin.id}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                <img
                  src={coin?.image}
                  alt={coin?.name}
                  height="80"
                  style={{ marginBottom: 10 }}
                />

                <span>
                  {coin?.symbol}
                  &nbsp;
                  <span
                    style={{
                      color: profit ? "rgb(14, 203, 129)" : "red",
                      fontWeight: 500,
                    }}
                  >
                    {profit && "+"}
                    {coin?.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </span>

                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 500,
                  }}
                >
                  {symbol}
                  {numberWithCommas(
                    coin?.current_price?.toFixed(2)
                  )}
                </span>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};


export default Carousel;
