import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { formatCurrency } from '../utils/formatters';
import Modal from '../components/UI/Modal';
import { Plus, Search, Trash2 } from 'lucide-react';

const Products = () => {
    const { products, addProduct, deleteProduct } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct({ ...newProduct, price: Number(newProduct.price), stock: Number(newProduct.stock) });
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', top: '50%', left: '12px', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
                    <input className="form-input" style={{ width: '300px', paddingLeft: '40px' }} placeholder="Search products..." />
                </div>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-primary"><Plus size={18} /> Add Product</button>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style={{ paddingLeft: '24px' }}>Details</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td style={{ paddingLeft: '24px', fontWeight: 600 }}>{p.name}</td>
                                    <td>{p.category}</td>
                                    <td style={{ fontWeight: 600 }}>{formatCurrency(p.price)}</td>
                                    <td style={{ color: p.stock < 5 ? '#EF4444' : '#10B981', fontWeight: 600 }}>{p.stock}</td>
                                    <td><button onClick={() => deleteProduct(p.id)} className="icon-btn" style={{ color: '#EF4444' }}><Trash2 size={16} /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Product">
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label className="form-label">Name</label><input className="form-input" required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} /></div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div className="form-group"><label className="form-label">Price</label><input className="form-input" required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} /></div>
                        <div className="form-group"><label className="form-label">Stock</label><input className="form-input" required value={newProduct.stock} onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })} /></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', gap: '1rem' }}>
                        <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
export default Products;
