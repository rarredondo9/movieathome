import Watchlist from "./Watchlist.mjs";
import WatchlistPage from "./WatchlistPage.mjs";
import { qs } from './utils.mjs';

const page = new WatchlistPage(qs('#watchlist'), qs('#status'), new Watchlist());
page.init();