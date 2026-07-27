import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, CircularProgress } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data";
import { CryptoState } from "../CryptoContext";
import SelectButton from "./SelectButton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const CoinInfo = ({ coin }) => {
  const { currency } = CryptoState();

  const [historicData, setHistoricData] = useState([]);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoricData = async () => {
      if (!coin?.id) return;

      try {
        setLoading(true);

        const { data } = await axios.get(
          HistoricalChart(coin.id, days, currency)
        );

        setHistoricData(data?.prices || []);
      } catch (err) {
        console.error(err);
        setHistoricData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoricData();
  }, [coin?.id, days, currency]);

  const chartData = useMemo(() => ({
    labels: historicData.map((item) => {
      const date = new Date(item[0]);

      return days === 1
        ? date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : date.toLocaleDateString();
    }),

    datasets: [
      {
        label: `Price (Past ${days} Days) (${currency})`,
        data: historicData.map((item) => item[1]),
        borderColor: "#EEBC1D",
        backgroundColor: "rgba(238,188,29,0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  }), [historicData, days, currency]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#fff",
        },
      },
      y: {
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "75%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress color="warning" size={80} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "75%" },
        p: 3,
      }}
    >
      <Box sx={{ height: 450 }}>
        <Line data={chartData} options={options} />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          mt: 3,
          gap: 1,
        }}
      >
        {chartDays.map((day) => (
          <SelectButton
            key={day.value}
            selected={day.value === days}
            onClick={() => setDays(day.value)}
          >
            {day.label}
          </SelectButton>
        ))}
      </Box>
    </Box>
  );
};

export default CoinInfo;