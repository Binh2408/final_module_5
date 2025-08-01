function SearchComponent({
  searchName,
  setSearchName,
  categoryList = [],
  selectedCate,
  setSelectedCate,
  placeholder = "Search By Name...",
}) {
  return (
    <div style={{ margin: "10px 0" }}>
      <div className="row g-2">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCate}
            onChange={(e) => setSelectedCate(e.target.value)}
          >
            <option value="">-----------All-Category-----------</option>
            {categoryList.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
