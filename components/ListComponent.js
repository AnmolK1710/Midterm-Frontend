import styles from './styles/ListComponent.module.css';

export default function ListComponent({ items, onItemClick, selectedItem }) {
  return (
    <div className={styles.listWrapper}>
      <h2 className={styles.listHeader}>Product List ({items.length} items)</h2>
      <ul className={styles.productList}>
        {items.map(item => (
          <li 
            key={item.id}
            onClick={() => onItemClick(item)}
            className={`${styles.listItem} ${selectedItem?.id === item.id ? styles.selected : ''}`}
          >
            <span className={styles.itemName}>{item.name}</span>
            <span className={styles.itemPrice}>{item.price}</span>
            <span className={styles.itemCategory}>{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}