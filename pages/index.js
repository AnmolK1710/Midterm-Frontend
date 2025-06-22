import { useState } from 'react';
import ListComponent from '../components/ListComponent';
import DetailsComponent from '../components/DetailsComponent';
import FormComponent from '../components/FormComponent'; // ✅ Import the form
import styles from '../styles/Home.module.css';

export default function Home() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', description: 'MacBook Pro 16" with M1 Pro chip', price: '$2499', category: 'Electronics', stock: 15 },
    { id: 2, name: 'Smartphone', description: 'iPhone 14 Pro Max 256GB', price: '$1199', category: 'Electronics', stock: 32 },
    { id: 3, name: 'Headphones', description: 'Sony WH-1000XM5 Wireless Noise Cancelling', price: '$399', category: 'Audio', stock: 28 },
    { id: 4, name: 'Smart Watch', description: 'Apple Watch Series 8 GPS + Cellular', price: '$499', category: 'Wearables', stock: 19 },
    { id: 5, name: 'Tablet', description: 'iPad Pro 12.9" with M2 chip', price: '$1099', category: 'Electronics', stock: 12 }
  ]);

  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // ✅ Add new item to the list
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filter.toLowerCase()) || 
                         item.description.toLowerCase().includes(filter.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(items.map(item => item.category))];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Product Inventory System</h1>
        <p className={styles.subtitle}>CPAN 144 - Midterm Practical Exam</p>
      </header>

      {/* ✅ New: Form to add product */}
      <FormComponent onAddItem={handleAddItem} />

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="search">Search Products:</label>
          <input
            id="search"
            type="text"
            placeholder="Type to filter..."
            value={filter}
            onChange={handleFilterChange}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category">Filter by Category:</label>
          <select 
            id="category"
            value={categoryFilter}
            onChange={handleCategoryChange}
            className={styles.categorySelect}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.listContainer}>
          <ListComponent 
            items={filteredItems} 
            onItemClick={handleItemClick} 
            selectedItem={selectedItem}
          />
        </div>

        <div className={styles.detailsContainer}>
          {selectedItem ? (
            <DetailsComponent item={selectedItem} />
          ) : (
            <div className={styles.emptySelection}>
              <h3>No Product Selected</h3>
              <p>Click on an item from the list to view details</p>
            </div>
          )}
        </div>
      </div>

      {filteredItems.length === 0 && (
        <div className={styles.emptyResults}>
          <p>No products match your search criteria.</p>
          <button 
            onClick={() => {
              setFilter('');
              setCategoryFilter('all');
            }}
            className={styles.resetButton}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
