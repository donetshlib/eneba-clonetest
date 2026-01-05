export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="searchWrap">
      <div className="searchIcon">🔍</div>
      <input
        className="searchInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search games..."
      />
      {value?.length > 0 && (
        <button className="clearBtn" onClick={onClear} aria-label="Clear">
          ✕
        </button>
      )}
    </div>
  );
}
