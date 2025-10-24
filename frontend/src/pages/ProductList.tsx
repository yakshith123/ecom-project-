import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { fetchProducts } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import type { Product } from '../redux/productSlice';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.products);
  const user = useAppSelector(state => state.user.user);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Toast notification helper
  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Category matcher helper
  const matchesCategory = (product: Product, category: string): boolean => {
    if (category === 'All') return true;
    
    const name = product.name.toLowerCase();
    const desc = (product.description || '').toLowerCase();
    
    switch(category) {
      case 'Electronics':
        return name.includes('tv') || name.includes('camera') || name.includes('drone') || 
               name.includes('doorbell') || name.includes('thermostat') || name.includes('hue') ||
               desc.includes('smart home') || desc.includes('electronics');
      case 'Laptops':
        return name.includes('laptop') || name.includes('macbook') || name.includes('thinkpad') ||
               name.includes('dell') || name.includes('hp') || name.includes('asus') ||
               name.includes('msi') || name.includes('acer') || name.includes('surface') ||
               name.includes('razer') || name.includes('lg gram') || name.includes('galaxy book');
      case 'Smartphones':
        return name.includes('iphone') || name.includes('galaxy') || name.includes('pixel') ||
               name.includes('oneplus') || name.includes('xiaomi') || name.includes('vivo') ||
               name.includes('oppo') || name.includes('nothing') || name.includes('motorola') ||
               name.includes('realme') || name.includes('phone');
      case 'Accessories':
        return name.includes('watch') || name.includes('keyboard') || name.includes('mouse') ||
               name.includes('ssd') || name.includes('charger') || name.includes('case') ||
               name.includes('sd card') || name.includes('magic keyboard') || name.includes('logitech') ||
               desc.includes('accessory') || desc.includes('accessories');
      case 'Audio':
        return name.includes('headphone') || name.includes('airpods') || name.includes('earbuds') ||
               name.includes('speaker') || name.includes('buds') || name.includes('sony wh') ||
               name.includes('bose') || name.includes('jbl') || name.includes('sonos') ||
               name.includes('sennheiser') || name.includes('beats');
      case 'Wearables':
        return name.includes('watch') || name.includes('band') || name.includes('tracker') ||
               name.includes('fitness') || desc.includes('wearable');
      default:
        return false;
    }
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(p => {
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           p.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = matchesCategory(p, selectedCategory);
      return matchesPrice && matchesSearch && categoryMatch;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return b.id - a.id; // newest first
      }
    });

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #1565c0',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      Loading amazing products...
    </div>
  );

  if (error) return (
    <div style={{ 
      padding: '2rem', 
      textAlign: 'center', 
      color: '#f44336'
    }}>
      Error: {error}
    </div>
  );

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
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
          animation: 'slideIn 0.3s ease-out',
          fontWeight: '500'
        }}>
          <style>{`
            @keyframes slideIn {
              from { transform: translateX(400px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
          `}</style>
          ✓ {toastMessage}
        </div>
      )}

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 100%)',
        padding: '3rem',
        borderRadius: '12px',
        marginBottom: '3rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to Our Store</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Discover amazing products at great prices</p>
        
        {/* Search Bar */}
        <div style={{ 
          maxWidth: '600px', 
          margin: '0 auto 2rem auto',
          position: 'relative' 
        }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {!user && (
          <Link to="/register" style={{
            background: 'white',
            color: '#1565c0',
            padding: '0.75rem 2rem',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'inline-block'
          }}>
            Get Started
          </Link>
        )}
      </div>

      {/* Categories */}
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ marginBottom: '1.5rem', color: '#333', fontSize: '1.5rem' }}>Shop by Category</h2>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          overflowX: 'auto', 
          padding: '0.5rem 0' 
        }}>
          {[
            { name: 'All', image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=200&h=120&fit=crop' },
            { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=120&fit=crop' },
            { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=120&fit=crop' },
            { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=120&fit=crop' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=120&fit=crop' },
            { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=120&fit=crop' },
            { name: 'Wearables', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=120&fit=crop' }
          ].map(category => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              style={{
                padding: 0,
                backgroundColor: 'transparent',
                border: selectedCategory === category.name ? '3px solid #1565c0' : '2px solid #e0e0e0',
                borderRadius: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                minWidth: '180px',
                transition: 'all 0.3s ease',
                transform: selectedCategory === category.name ? 'scale(1.05)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category.name) {
                  e.currentTarget.style.borderColor = '#1565c0';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category.name) {
                  e.currentTarget.style.borderColor = '#e0e0e0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <div style={{ position: 'relative' }}>
                <img 
                  src={category.image} 
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100px',
                    objectFit: 'cover',
                    borderRadius: '10px 10px 0 0',
                    opacity: selectedCategory === category.name ? 1 : 0.8
                  }}
                />
                {selectedCategory === category.name && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    background: '#1565c0',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
                <div style={{
                  padding: '0.75rem',
                  fontSize: '0.95rem',
                  fontWeight: selectedCategory === category.name ? '700' : '600',
                  color: selectedCategory === category.name ? '#1565c0' : '#333',
                  textAlign: 'center',
                  background: 'white'
                }}>
                  {category.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filters and Sort */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.1rem' }}>Price Range</h3>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem',
            background: 'white',
            padding: '1rem',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#666', display: 'block', marginBottom: '0.25rem' }}>Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <span style={{ color: '#999', marginTop: '1.5rem' }}>-</span>
            <div>
              <label style={{ fontSize: '0.85rem', color: '#666', display: 'block', marginBottom: '0.25rem' }}>Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                style={{
                  width: '100px',
                  padding: '0.5rem',
                  border: '2px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <button
              onClick={() => setPriceRange([0, 100000])}
              style={{
                marginTop: '1.5rem',
                padding: '0.5rem 1rem',
                background: '#f5f5f5',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                color: '#666',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#e0e0e0'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#f5f5f5'}
            >
              Reset
            </button>
          </div>
        </div>
        
        <div>
          <h3 style={{ margin: '0 0 1rem 0', color: '#333', fontSize: '1.1rem' }}>Sort By</h3>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: '2px solid #e0e0e0',
              background: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              minWidth: '200px'
            }}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
      </div>

      {/* Products Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem' 
      }}>
        <h2 style={{ color: '#333', fontSize: '1.75rem' }}>
          Featured Products
          <span style={{ fontSize: '1rem', color: '#999', marginLeft: '1rem' }}>({filteredProducts.length} items)</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {filteredProducts.length === 0 ? (
          <div style={{ 
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#999'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ color: '#666' }}>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button
              onClick={() => {
                setPriceRange([0, 100000]);
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 2rem',
                background: '#1565c0',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600'
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #eee', 
              padding: '1.5rem', 
              borderRadius: '12px', 
              background: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'translateY(-4px)';
              target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              const target = e.currentTarget;
              target.style.transform = 'none';
              target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
            }}
          >
            <img 
              src={product.images?.[0] || product.image || '/placeholder.png'} 
              alt={product.name}
              style={{ 
                width: '100%', 
                height: '200px', 
                objectFit: 'cover', 
                borderRadius: '8px',
                marginBottom: '1rem'
              }}
            />
            <h3 style={{ 
              fontSize: '1.25rem', 
              marginBottom: '0.5rem',
              color: '#333'
            }}>
              {product.name}
            </h3>
            <p style={{ 
              fontSize: '1.5rem', 
              color: '#1565c0', 
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}>
              ₹{product.price.toFixed(2)}
            </p>
            <p style={{ 
              color: product.stock > 0 ? '#4caf50' : '#f44336',
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to={`/products/${product.id}`}
                style={{ 
                  padding: '0.75rem',
                  backgroundColor: '#f5f5f5',
                  textDecoration: 'none',
                  color: '#333',
                  borderRadius: '6px',
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0e0e0';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                }}
              >
                View Details
              </Link>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addToCart({ 
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images?.[0] || product.image || '/placeholder.png'
                  }));
                  showNotification(`${product.name} added to cart!`);
                }}
                disabled={product.stock === 0}
                style={{
                  padding: '0.75rem',
                  backgroundColor: product.stock > 0 ? '#1565c0' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                  flex: 1,
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (product.stock > 0) {
                    e.currentTarget.style.backgroundColor = '#1976d2';
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.stock > 0) {
                    e.currentTarget.style.backgroundColor = '#1565c0';
                  }
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;