import styles from './styles/DetailsComponent.module.css';

export default function DetailsComponent({ item }) {
  return (
    <div className={styles.detailsCard}>
      <div className={styles.detailsHeader}>
        <h2>{item.name}</h2>
        <span className={styles.priceTag}>{item.price}</span>
      </div>
      
      <div className={styles.detailsBody}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Category:</span>
          <span className={styles.detailValue}>{item.category}</span>
        </div>
        
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Stock Available:</span>
          <span className={styles.detailValue}>
            {item.stock} units
            <span className={`${styles.stockIndicator} ${
              item.stock > 20 ? styles.inStock : 
              item.stock > 5 ? styles.lowStock : styles.outOfStock
            }`}></span>
          </span>
        </div>
        
        <div className={styles.description}>
          <h3>Description</h3>
          <p>{item.description}</p>
        </div>
      </div>
      
      <div className={styles.detailsFooter}>
        <button className={styles.actionButton}>Edit Product</button>
        <button className={`${styles.actionButton} ${styles.deleteButton}`}>Delete</button>
      </div>
    </div>
  );
}