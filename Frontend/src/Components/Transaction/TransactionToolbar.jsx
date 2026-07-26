import {
  SearchIcon,
  FilterIcon,
  ChevronIcon,
  PlusIcon,
} from "./icons";
import styles from "../../Styles/transactionStyles";


export default function TransactionToolbar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  categoryFilter,
  setCategoryFilter,
  onAdd,
  categories,
}) {
  return (
    <div style={styles.toolbar}>
      {/* Search */}
      <div style={styles.searchBox}>
        <SearchIcon />

        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Type Filter */}
      <div style={styles.selectWrap}>
        <FilterIcon />

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          style={styles.select}
        >
          <option>All Types</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <ChevronIcon />
      </div>

      {/* Category Filter */}
      <div style={styles.selectWrap}>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.select}
        >
          <option>All Categories</option>

         {categories.map((category) => (
  <option
    key={category.categoryId}
    value={category.categoryId}
  >
    {category.name}
  </option>
))}
        </select>

        <ChevronIcon />
      </div>

      {/* Add Button */}
     <button
  type="button"
  style={styles.addButton}
  onClick={onAdd}
>
  <PlusIcon />
  Add Transaction
</button>
    </div>
  );
}