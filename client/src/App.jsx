import { useEffect, useMemo, useState } from "react";
import { fetchGames } from "./api";
import SearchBar from "./components/SearchBar";
import GameCard from "./components/GameCard";
import "./App.css";

function useDebouncedValue(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function SkeletonCard() {
  return (
    <div className="card skeletonCard" aria-hidden="true">
      <div className="coverWrap">
        <div className="skeletonBox skeletonCover skeletonShimmer" />
        <div className="badges">
          <span className="badge skeletonPill skeletonShimmer" />
          <span className="badge muted skeletonPill skeletonShimmer" />
        </div>
      </div>

      <div className="cardBody">
        <div className="skeletonLine skeletonShimmer" style={{ width: "70%" }} />
        <div className="metaRow" style={{ marginTop: 10 }}>
          <span className="skeletonPillWide skeletonShimmer" />
          <span className="skeletonPillWide skeletonShimmer" />
        </div>
        <div className="priceRow" style={{ marginTop: 12 }}>
          <div className="skeletonLine skeletonShimmer" style={{ width: "35%", height: 18 }} />
        </div>
      </div>
    </div>
  );
}

function NoResults({ query }) {
  return (
    <div className="noResults">
      <div className="noResultsTitle">No results</div>
      <div className="noResultsText">
        {query ? (
          <>
            Nothing found for <span className="strong">“{query}”</span>. Try another query.
          </>
        ) : (
          <>Nothing to show. Try searching for a game.</>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({ count: 0, items: [] });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const [sort, setSort] = useState("default");
  const debouncedSearch = useDebouncedValue(search, 350);
  const title = useMemo(() => (debouncedSearch ? debouncedSearch : "All games"), [debouncedSearch]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr("");

    fetchGames(debouncedSearch)
      .then((d) => {
        if (!alive) return;
        setData(d);
      })
      .catch(() => {
        if (!alive) return;
        setErr("Failed to load games. Is the backend running?");
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [debouncedSearch]);

  const showNoResults = !loading && !err && (data?.items?.length ?? 0) === 0;
  const skeletons = Array.from({ length: 8 }, (_, i) => i);
  const sortedItems = useMemo(() => {
    const items = [...(data.items ?? [])];
    if (sort === "price_asc") items.sort((a,b) => a.price_eur - b.price_eur);
    if (sort === "price_desc") items.sort((a,b) => b.price_eur - a.price_eur);
    return items; // default = как пришло
}, [data.items, sort]);

  return (
    <div className="page">
      <div className="innerpage">
        <div className="topbar">
          <div className="brand">
            <img className="brandLogo" src="/eneba-logo.png" alt="Eneba logo" />
            <span>eneba</span>
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
          />
          <select
            className="sortSelect"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            title="Sort by"
          >
            <option value="default">Default</option>
            <option value="price_asc">Price ↑</option>
            <option value="price_desc">Price ↓</option>
          </select>

          


          <div className="rightIcons">
            <span className="pill">English | EUR</span>
            <button className="icon" type="button" tabIndex={0} title="Favorites">♡</button>
            <button className="icon" type="button" tabIndex={0} title="Cart">🛒</button>
            <button className="icon" type="button" tabIndex={0} title="Account">👤</button>
          </div>
        </div>

        <div className="content">
          <div className="subtitle">
            <span className="smallMuted">Results found:</span>{" "}
            <span className="strong">{loading ? "..." : data.count}</span>
            <span className="smallMuted" style={{ marginLeft: 12 }}>
              {title}
            </span>
          </div>

          {err && <div className="error">{err}</div>}

          {showNoResults ? (
            <NoResults query={debouncedSearch} />
          ) : (
            <div className="grid">
              {loading
                ? skeletons.map((i) => <SkeletonCard key={i} />)
                : sortedItems.map((g) => <GameCard key={g.id} g={g} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
