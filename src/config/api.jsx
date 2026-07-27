
const API_BASE = "https://api.coingecko.com/api/v3";

export const CoinList = (currency) =>
  `${API_BASE}/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;

export const SingleCoin = (id) =>
  `${API_BASE}/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${API_BASE}/coins/${id}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}&interval=daily`;

export const TrendingCoins = (currency) =>
  `${API_BASE}/coins/markets?vs_currency=${currency.toLowerCase()}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

