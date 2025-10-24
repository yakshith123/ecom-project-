import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProducts, createProduct, updateProduct, Product } from '../redux/productSlice';

interface ProductForm {
  name: string;
  description: string;
  price: string;
  images: string;
  stock: string;
}

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>({
    name: '',
    description: '',
    price: '',
    images: '',
    stock: ''
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const imagesArr = form.images.split(',').map(s => s.trim()).filter(Boolean);
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      images: imagesArr,
      stock: parseInt(form.stock)
    };

    if (editing) {
      await dispatch(updateProduct({ id: editing, product: payload }));
    } else {
      await dispatch(createProduct(payload));
    }

    setForm({
      name: '',
      description: '',
      price: '',
      images: '',
      stock: ''
    });
    setEditing(null);
  };

  const handleEdit = (product: Product) => {
    setEditing(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      images: product.images?.join(',') || product.image || '',
      stock: product.stock.toString()
    });
  };

  if (loading) return (
    <div style={{ 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        background: 'white',
        padding: '2rem 3rem',
        borderRadius: '12px',
        fontSize: '1.25rem',
        color: '#666'
      }}>
        Loading products...
      </div>
    </div>
  );
  
  if (error) return (
    <div style={{ 
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{ 
        background: 'white',
        padding: '2rem 3rem',
        borderRadius: '12px',
        fontSize: '1.25rem',
        color: '#f44336'
      }}>
        Error: {error}
      </div>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          📦 Product Management
        </h1>

        {/* Product Form */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#333',
            fontSize: '1.75rem'
          }}>
            {editing ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem'
          }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                Product Name
              </label>
              <input
                placeholder="Enter product name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1565c0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                Description
              </label>
              <textarea
                placeholder="Product description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                required
                rows={4}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1565c0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1565c0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                Stock
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.stock}
                onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1565c0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                Image URLs (comma separated)
              </label>
              <input
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                value={form.images}
                onChange={e => setForm(f => ({ ...f, images: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#1565c0'}
                onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', gridColumn: '1 / -1' }}>
              <button 
                type="submit" 
                style={{ 
                  flex: 1,
                  padding: '1rem', 
                  background: editing ? '#ff9800' : 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  boxShadow: '0 2px 10px rgba(76, 175, 80, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(76, 175, 80, 0.3)';
                }}
              >
                {editing ? '✅ Update Product' : '➕ Add Product'}
              </button>
              
              {editing && (
                <button 
                  type="button" 
                  onClick={() => {
                    setEditing(null);
                    setForm({
                      name: '',
                      description: '',
                      price: '',
                      images: '',
                      stock: ''
                    });
                  }}
                  style={{ 
                    flex: 1,
                    padding: '1rem', 
                    backgroundColor: '#f44336', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d32f2f';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f44336';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  ❌ Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Product List */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            margin: '0 0 1.5rem 0', 
            color: '#333',
            fontSize: '1.75rem'
          }}>
            📋 Product List ({products.length})
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gap: '1.5rem', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' 
          }}>
            {products.map(product => (
              <div 
                key={product.id} 
                style={{ 
                  border: '2px solid #e0e0e0', 
                  padding: '1.5rem', 
                  borderRadius: '12px',
                  background: '#fafafa',
                  transition: 'all 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1565c0';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {product.images?.[0] && (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '180px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      marginBottom: '1rem'
                    }}
                  />
                )}
                <h3 style={{ 
                  margin: '0 0 0.5rem 0',
                  color: '#333',
                  fontSize: '1.25rem'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  margin: '0 0 0.5rem 0',
                  color: '#666',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {product.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '1rem 0'
                }}>
                  <div>
                    <p style={{ 
                      margin: 0,
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1565c0'
                    }}>
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>
                  <div style={{
                    padding: '0.5rem 1rem',
                    background: product.stock > 0 ? '#e8f5e9' : '#ffebee',
                    color: product.stock > 0 ? '#4CAF50' : '#f44336',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    Stock: {product.stock}
                  </div>
                </div>
                <button
                  onClick={() => handleEdit(product)}
                  style={{ 
                    padding: '0.75rem 1rem', 
                    background: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    width: '100%',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ✏️ Edit Product
                </button>
              </div>
            ))}
          </div>
          
          {products.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#999'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📦</div>
              <p>No products yet. Add your first product above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;