import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { login } from '../redux/userSlice';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status } = useAppSelector(state => state.user);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=1080&fit=crop")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%',
        padding: '3rem', 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: '2rem',
          color: '#333',
          fontWeight: '600'
        }}>Welcome Back</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              style={{ 
                width: '100%',
                padding: '0.75rem 1rem', 
                borderRadius: '8px', 
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1565c0'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              required
              style={{ 
                width: '100%',
                padding: '0.75rem 1rem', 
                borderRadius: '8px', 
                border: '2px solid #e0e0e0',
                fontSize: '1rem',
                transition: 'border-color 0.3s',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#1565c0'}
              onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
            />
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{
              padding: '0.875rem',
              backgroundColor: status === 'loading' ? '#ccc' : '#1565c0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: '600',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s',
              marginTop: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (status !== 'loading') {
                e.currentTarget.style.backgroundColor = '#1976d2';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(21, 101, 192, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (status !== 'loading') {
                e.currentTarget.style.backgroundColor = '#1565c0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </button>
        </form>
        {status === 'failed' && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            backgroundColor: '#ffebee',
            borderLeft: '4px solid #f44336',
            borderRadius: '4px',
            color: '#c62828'
          }}>
            Login failed. Please check your credentials.
          </div>
        )}
        <p style={{ 
          marginTop: '1.5rem', 
          textAlign: 'center',
          color: '#666'
        }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ 
            color: '#1565c0', 
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;