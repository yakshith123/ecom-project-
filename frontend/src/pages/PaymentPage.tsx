import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import axios from "axios";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const cart = useAppSelector(state => state.cart.items);
  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Place order
      const res = await axios.post("/api/orders", {
        products: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }, { withCredentials: true });

      // 2. Mock payment
      await axios.post("/api/payment/checkout", {
        orderId: res.data.id,
        amount: res.data.total,
        method: paymentMethod
      }, { withCredentials: true });

      dispatch(clearCart());
      alert("✅ Payment successful! Order placed.");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Payment/order failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ 
        maxWidth: '800px', 
        margin: '4rem auto', 
        padding: '3rem',
        textAlign: 'center',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#666' }}>Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '1.5rem',
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
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          Checkout
        </h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Order Summary */}
          <div style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div key={item.productId} style={{ 
                  display: 'flex', 
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f8f9fa',
                  borderRadius: '8px',
                  alignItems: 'center'
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      objectFit: 'cover', 
                      borderRadius: '6px' 
                    }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, marginBottom: '0.25rem', fontSize: '0.95rem' }}>{item.name}</h4>
                    <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                  </div>
                  <div style={{ fontWeight: '600', color: '#1565c0' }}>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1.5rem', 
              borderTop: '2px solid #e0e0e0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>Total</span>
              <span style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1565c0' }}>
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment Form */}
          <div style={{ 
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#333' }}>Payment Method</h2>
            
            {/* Payment Method Selector */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              {[{ value: 'card', label: '💳 Card' }, { value: 'upi', label: '📱 UPI' }, { value: 'cod', label: '💵 COD' }].map(method => (
                <button
                  key={method.value}
                  onClick={() => setPaymentMethod(method.value as any)}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    background: paymentMethod === method.value ? '#1565c0' : '#f5f5f5',
                    color: paymentMethod === method.value ? 'white' : '#333',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 0.3s'
                  }}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {/* Card Payment Form */}
            {paymentMethod === 'card' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={e => setCardDetails(c => ({ ...c, number: e.target.value }))}
                    maxLength={19}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={e => setCardDetails(c => ({ ...c, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={e => setCardDetails(c => ({ ...c, expiry: e.target.value }))}
                      maxLength={5}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={e => setCardDetails(c => ({ ...c, cvv: e.target.value }))}
                      maxLength={3}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '2px solid #e0e0e0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Payment */}
            {paymentMethod === 'upi' && (
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
                  UPI ID
                </label>
                <input
                  type="text"
                  placeholder="yourname@upi"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            )}

            {/* COD Message */}
            {paymentMethod === 'cod' && (
              <div style={{ 
                padding: '1rem', 
                background: '#e8f5e9', 
                borderRadius: '8px',
                color: '#2e7d32',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0 }}>💵 Pay ₹{total.toFixed(2)} in cash on delivery</p>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              style={{
                width: '100%',
                marginTop: '2rem',
                padding: '1rem',
                background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.15rem',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }
              }}
            >
              {loading ? 'Processing...' : `Pay ₹${total.toFixed(2)}`}
            </button>

            <p style={{ marginTop: '1rem', textAlign: 'center', color: '#999', fontSize: '0.85rem' }}>
              🔒 Your payment information is secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;