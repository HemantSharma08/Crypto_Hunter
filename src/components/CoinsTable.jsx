import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import {
  Container,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

export function numberWithCommas(x) {
  if (x === null || x === undefined) return "N/A";
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchCoins = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(CoinList(currency));
// Debug API response
      // console.log(data); 

      setCoins(data || []);
    } catch (error) {
      // console.error("Error fetching coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name?.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol?.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            margin: 3,
            fontFamily: "Montserrat",
          }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search for a Cryptocurrency..."
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{
            mb: 3,
            "& .MuiInputBase-input": {
              color: "white",
            },
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "gold",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "gold",
              },
            },
          }}
        />

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress sx={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map(
                    (head) => (
                      <TableCell
                        key={head}
                        align={head === "Coin" ? "left" : "right"}
                        sx={{
                          color: "black",
                          fontWeight: 700,
                          fontFamily: "Montserrat",
                        }}
                      >
                        {head}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>

              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, page * 10)
                  .map((row) => {
                    const profit =
                      row.price_change_percentage_24h !== null &&
                      row.price_change_percentage_24h !== undefined &&
                      row.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        key={row.id}
                        hover
                        onClick={() => navigate(`/coins/${row.id}`)}
                        sx={{
                          cursor: "pointer",
                          backgroundColor: "#16171a",
                          "&:hover": {
                            backgroundColor: "#131111",
                          },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                          />

                          <div>
                            <Typography
                              sx={{
                                textTransform: "uppercase",
                                fontWeight: 600,
                                fontSize: 20,
                              }}
                            >
                              {row.symbol}
                            </Typography>

                            <Typography
                              variant="body2"
                              sx={{ color: "gray" }}
                            >
                              {row.name}
                            </Typography>
                          </div>
                        </TableCell>

                        {/* PRICE */}
                        <TableCell align="right">
                          {row.current_price !== null &&
                          row.current_price !== undefined
                            ? `${symbol}${numberWithCommas(
                                row.current_price.toFixed(2)
                              )}`
                            : "N/A"}
                        </TableCell>

                        {/* 24H CHANGE */}
                        <TableCell
                          align="right"
                          sx={{
                            color:
                              row.price_change_percentage_24h == null
                                ? "white"
                                : profit
                                ? "rgb(14,203,129)"
                                : "red",
                            fontWeight: 500,
                          }}
                        >
                          {row.price_change_percentage_24h !== null &&
                          row.price_change_percentage_24h !== undefined ? (
                            <>
                              {profit && "+"}
                              {row.price_change_percentage_24h.toFixed(2)}%
                            </>
                          ) : (
                            "N/A"
                          )}
                        </TableCell>

                        {/* MARKET CAP */}
                        <TableCell align="right">
                          {row.market_cap !== null &&
                          row.market_cap !== undefined
                            ? `${symbol}${numberWithCommas(
                                (row.market_cap / 1000000).toFixed(0)
                              )} M`
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        {!loading && (
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
              "& .MuiPaginationItem-root": {
                color: "gold",
              },
            }}
            count={Math.ceil(handleSearch().length / 10)}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              window.scrollTo({
                top: 450,
                behavior: "smooth",
              });
            }}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;