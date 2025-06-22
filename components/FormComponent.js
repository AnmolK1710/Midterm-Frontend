import { useState } from 'react';
import styles from './styles/FormComponent.module.css';

export default function FormComponent({ onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.price || !formData.category) {
      setError('Name, Price, and Category are required.');
      return;
    }

    const newItem = {
      ...formData,
      id: Date.now(),
      stock: Number(formData.stock)
    };

    onAddItem(newItem);
    setFormData({ name: '', description: '', price: '', category: '', stock: '' });
    setError('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      {error && <p className={styles.error}>{error}</p>}
      <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
      <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
      <input name="price" placeholder="Price (e.g. $299)" value={formData.price} onChange={handleChange} />
      <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
      <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} />
      <button type="submit">Add Product</button>
    </form>
  );
}
