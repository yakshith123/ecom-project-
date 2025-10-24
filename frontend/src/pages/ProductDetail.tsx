import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProduct } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import ProductGallery from '../components/ProductGallery';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const { selectedProduct: product, loading, error } = useAppSelector(state => state.products);

  const showNotification = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(Number(id)));
    }
  }, [dispatch, id]);

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #1565c0',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
  if (error) return <div style={{ padding: '2rem' }}>Error: {error}</div>;
  if (!product) return <div style={{ padding: '2rem' }}>Product not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      {/* Toast Notification */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          background: '#4caf50',
          color: 'white',
          padding: '1rem 1.5rem',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          animation: 'slideIn 0.3s ease-out'
        }}>
          ✓ Added to cart successfully!
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: '#1565c0',
          fontSize: '1rem',
          cursor: 'pointer',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        ← Back to Products
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
        <div>
          <ProductGallery images={product.images || [product.image || '/placeholder.png']} />
        </div>
        <div>
          <h1 style={{ marginTop: 0, fontSize: '2rem', color: '#333' }}>{product.name}</h1>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{ color: '#ffc107', fontSize: '1.2rem' }}>
              ★★★★☆
            </div>
            <span style={{ color: '#666' }}>(4.0 / 5.0 - 128 reviews)</span>
          </div>
          <p style={{ fontSize: '2rem', color: '#1565c0', margin: '1rem 0', fontWeight: 'bold' }}>
            ₹{product.price.toFixed(2)}
          </p>
          <p style={{ 
            color: product.stock > 0 ? '#4CAF50' : '#f44336',
            background: product.stock > 0 ? '#e8f5e9' : '#ffebee',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            display: 'inline-block',
            fontWeight: '500'
          }}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
          </p>
          <div style={{ 
            background: '#f5f5f5',
            padding: '1.5rem',
            borderRadius: '8px',
            marginTop: '1.5rem',
            lineHeight: '1.8'
          }}>
            <h3 style={{ marginTop: 0, color: '#333' }}>Product Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ fontWeight: '600', color: '#333' }}>Quantity:</label>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                style={{
                  padding: '0.75rem 1.25rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  background: 'white',
                  cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: quantity <= 1 ? '#ccc' : '#333'
                }}
              >
                -
              </button>
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                style={{
                  padding: '0.75rem 1.25rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '8px',
                  background: 'white',
                  cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: quantity >= product.stock ? '#ccc' : '#333'
                }}
              >
                +
              </button>
              <span style={{ marginLeft: '1rem', color: '#666' }}>
                Total: <strong style={{ color: '#1565c0', fontSize: '1.3rem' }}>₹{(product.price * quantity).toFixed(2)}</strong>
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <button
                onClick={() => {
                  dispatch(addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.images?.[0] || product.image || '/placeholder.png'
                  }));
                  showNotification();
                }}
                disabled={product.stock === 0}
                style={{
                  padding: '1rem 2rem',
                  background: product.stock > 0 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  flex: 1,
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'transform 0.2s',
                  boxShadow: product.stock > 0 ? '0 4px 12px rgba(102,126,234,0.3)' : 'none'
                }}
                onMouseEnter={(e) => product.stock > 0 && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => product.stock > 0 && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => {
                  dispatch(addToCart({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.images?.[0] || product.image || '/placeholder.png'
                  }));
                  navigate('/cart');
                }}
                disabled={product.stock === 0}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: product.stock > 0 ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  flex: 1,
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => product.stock > 0 && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => product.stock > 0 && (e.currentTarget.style.transform = 'translateY(0)')}
              >
                ⚡ Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;