import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { removeFromCart, clearCart, addToCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart.items);
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!user) {
      alert("Please log in to checkout!");
      navigate("/login");
      return;
    }
    navigate("/payment");
  };

  if (cart.length === 0) {
    return (
      <div style={{ 
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>Your Cart is Empty</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.875rem 2rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ 
          color: '#333', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '700',
          textAlign: 'center'
        }}>
          🛒 Shopping Cart
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div 
                key={item.productId} 
                style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  padding: '1.5rem',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  alignItems: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ 
                    width: '120px', 
                    height: '120px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }} 
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.25rem',
                    color: '#333'
                  }}>{item.name}</h3>
                  <p style={{ 
                    margin: 0,
                    fontSize: '1.5rem',
                    color: '#1565c0',
                    fontWeight: '700'
                  }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                  <p style={{ 
                    margin: '0.25rem 0 0 0',
                    fontSize: '0.9rem',
                    color: '#999'
                  }}>₹{item.price.toFixed(2)} each</p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  background: '#f5f5f5',
                  padding: '0.5rem',
                  borderRadius: '8px'
                }}>
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        dispatch(removeFromCart(item.productId));
                        dispatch(addToCart({ ...item, quantity: item.quantity - 1 }));
                      } else {
                        dispatch(removeFromCart(item.productId));
                      }
                    }}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      borderRadius: '6px',
                      background: '#fff',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f44336'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    −
                  </button>
                  <span style={{ 
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    minWidth: '30px',
                    textAlign: 'center'
                  }}>{item.quantity}</span>
                  <button
                    onClick={() => {
                      dispatch(removeFromCart(item.productId));
                      dispatch(addToCart({ ...item, quantity: item.quantity + 1 }));
                    }}
                    style={{
                      width: '32px',
                      height: '32px',
                      border: 'none',
                      borderRadius: '6px',
                      background: '#fff',
                      color: '#666',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#4CAF50'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  style={{
                    padding: '0.75rem',
                    backgroundColor: '#fff',
                    color: '#f44336',
                    border: '2px solid #f44336',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f44336';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#fff';
                    e.currentTarget.style.color = '#f44336';
                  }}
                >
                  🗑️ Remove
                </button>
              </div>
            ))}
          </div>
          
          {/* Order Summary */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: '2rem'
            }}>
              <h2 style={{ 
                marginTop: 0, 
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                color: '#333'
              }}>Order Summary</h2>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <span style={{ color: '#666' }}>Items ({cart.length})</span>
                <span style={{ fontWeight: '600' }}>₹{total.toFixed(2)}</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                paddingBottom: '1rem',
                borderBottom: '1px solid #e0e0e0'
              }}>
                <span style={{ color: '#666' }}>Shipping</span>
                <span style={{ color: '#4CAF50', fontWeight: '600' }}>FREE</span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '2rem',
                paddingBottom: '1.5rem',
                borderBottom: '2px solid #333'
              }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Total</span>
                <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1565c0' }}>
                  ₹{total.toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handleCheckout}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.15rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginBottom: '0.75rem',
                  transition: 'all 0.3s',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  width: '100%',
                  padding: '0.875rem',
                  backgroundColor: 'transparent',
                  color: '#f44336',
                  border: '2px solid #f44336',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f44336';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#f44336';
                }}
              >
                Clear Cart
              </button>
              
              <div style={{ 
                marginTop: '1.5rem', 
                padding: '1rem',
                background: '#f0f7ff',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, color: '#1565c0', fontSize: '0.9rem' }}>
                  🔒 Secure Checkout
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;