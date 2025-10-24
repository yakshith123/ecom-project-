import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/useRedux';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useAppSelector(state => state.user.user);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate('/');
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users', { withCredentials: true });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      await axios.put(`/api/admin/user/${userId}`, { role: newRole }, { withCredentials: true });
      alert('✅ User role updated successfully!');
      fetchUsers();
    } catch (err) {
      alert('❌ Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`/api/admin/user/${userId}`, { withCredentials: true });
      alert('✅ User deleted successfully!');
      fetchUsers();
    } catch (err) {
      alert('❌ Failed to delete user');
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
          Loading users...
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
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '2rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          👥 User Management
        </h1>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '1rem',
            borderBottom: '2px solid #f0f0f0'
          }}>
            <h2 style={{ margin: 0, color: '#333' }}>
              All Users ({users.length})
            </h2>
            <button
              onClick={() => fetchUsers()}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#1565c0',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1976d2'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#1565c0'}
            >
              🔄 Refresh
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse'
            }}>
              <thead>
                <tr style={{ background: '#f5f7fa' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#555' }}>ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#555' }}>Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#555' }}>Email</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#555' }}>Role</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#555' }}>Created</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#555' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, index) => (
                  <tr 
                    key={u.id}
                    style={{ 
                      borderBottom: '1px solid #e0e0e0',
                      background: index % 2 === 0 ? 'white' : '#fafafa',
                      transition: 'background 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f0f7ff'}
                    onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fafafa'}
                  >
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#1565c0' }}>#{u.id}</td>
                    <td style={{ padding: '1rem', color: '#333' }}>{u.name}</td>
                    <td style={{ padding: '1rem', color: '#666' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                        style={{
                          padding: '0.5rem',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          background: u.role === 'admin' ? '#e3f2fd' : 'white',
                          color: u.role === 'admin' ? '#1565c0' : '#333',
                          fontWeight: u.role === 'admin' ? '600' : 'normal',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td style={{ padding: '1rem', color: '#999', fontSize: '0.9rem' }}>
                      {new Date(u.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        disabled={u.id === user?.id}
                        style={{
                          padding: '0.5rem 1rem',
                          background: u.id === user?.id ? '#ccc' : '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: u.id === user?.id ? 'not-allowed' : 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                          if (u.id !== user?.id) {
                            e.currentTarget.style.background = '#d32f2f';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (u.id !== user?.id) {
                            e.currentTarget.style.background = '#f44336';
                          }
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#999'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👥</div>
              <p>No users found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
