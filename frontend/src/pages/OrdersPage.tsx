import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  productId: number;
  quantity: number;
}

interface Order {
  id: number;
  total_amount: string;
  status: string;
  created_at: string;
  products?: OrderItem[];
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/orders", { withCredentials: true })
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return '#ff9800';
      case 'completed': return '#4CAF50';
      case 'cancelled': return '#f44336';
      case 'processing': return '#2196F3';
      default: return '#999';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return '⌛';
      case 'completed': return '✅';
      case 'cancelled': return '❌';
      case 'processing': return '🔄';
      default: return '📦';
    }
  };

  if (loading) {
    return (
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
          Loading your orders...
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ 
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          textAlign: 'center',
          background: 'white',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>📦</div>
          <h2 style={{ color: '#333', marginBottom: '1rem' }}>No Orders Yet</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>You haven't placed any orders yet. Start shopping to see your orders here!</p>
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
          📦 My Orders
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orders.map(order => (
            <div 
              key={order.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1.5rem',
                paddingBottom: '1rem',
                borderBottom: '2px solid #f0f0f0'
              }}>
                <div>
                  <h3 style={{ 
                    margin: '0 0 0.5rem 0',
                    fontSize: '1.5rem',
                    color: '#333'
                  }}>
                    Order #{order.id}
                  </h3>
                  <p style={{ 
                    margin: 0,
                    color: '#999',
                    fontSize: '0.9rem'
                  }}>
                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div style={{
                  padding: '0.5rem 1.25rem',
                  borderRadius: '20px',
                  background: getStatusColor(order.status) + '20',
                  color: getStatusColor(order.status),
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>{getStatusIcon(order.status)}</span>
                  <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
                </div>
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ 
                  margin: '0 0 1rem 0',
                  color: '#666',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  Order Details:
                </h4>
                {order.products && order.products.length > 0 ? (
                  <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {order.products.map((p: any, idx: number) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#f5f7fa',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          color: '#666'
                        }}
                      >
                        Product #{p.productId} × {p.quantity}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>No item details available</p>
                )}
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1rem',
                borderTop: '2px solid #f0f0f0'
              }}>
                <div>
                  <span style={{ color: '#999', fontSize: '0.9rem' }}>Total Amount:</span>
                  <p style={{ 
                    margin: '0.25rem 0 0 0',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1565c0'
                  }}>
                    ₹{parseFloat(order.total_amount).toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => alert('Order tracking coming soon!')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(102, 126, 234, 0.3)';
                  }}
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;