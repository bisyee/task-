import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './logo2.png'; 

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const Header = () => {
    return (
      <header style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1px',
        backgroundColor: '#090f2d',
        color: '#e0e1dd',
        position: 'fixed',  
        top: '0',
        left: '0',
        width: '100vw', 
        zIndex: '1000' 
      }}>
        <img src={logo} alt="Logo" style={{ minWidth: '80px', height: '80px', marginLeft: '1%', MarginRight: '1%' }} />
      </header>
    );
  };
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleEdit = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  const handleSave = () => {
    axios.put(`http://127.0.0.1:8000/users/${editedUser.id}`, editedUser) 
      .then((response) => {
        const updatedUser = response.data;
        setSelectedUser(updatedUser);
        setIsEditing(false);
        setUsers((prevUsers) => 
          prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user),
          console.log(users))
        );
      })
      .catch((error) => console.error('Error updating user:', error));
  };
  

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    
    <div className="container" style={{ display: 'flex', fontFamily: 'madefor-display-bold, helveticaneuew01-65medi, helveticaneuew02-65medi, helveticaneuew10-65medi, sans-serif' }}>
      <Header />
      {/* Sidebar */}
      <aside className="sidebar" style={{
        backgroundColor: '#090f2d',
        padding: '1rem',
        color: '#e0e1dd',
        minWidth: '13%',
        height: '90vh',
        marginTop: '4%',
        overflowY: 'auto'
      }}>
        <h2 className="text-lg font-bold mb-4">User List</h2>
        <ul>
         
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className="user-item"
              style={{
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                color: '#e0e1dd'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#415a77'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ padding: '2rem', 
        flexGrow: 1,
        backgroundColor: '#ffffff',
        borderRadius: '8px', 
        border: '1px solid #0d1b2a', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        margin: '1rem', 
          marginTop: '7%'
      }}>
        <h1 style={{ fontSize: '1.5rem', color: '#0d1b2a', fontWeight: 'bold', marginBottom: '1rem' }}>User Details</h1>
        {selectedUser ? (
          <div>
            {isEditing ? (
              <div>
                <p><strong>ID:</strong> {editedUser.id}</p>
                <label>
                  First Name:
                  <input
                    type="text"
                    value={editedUser.firstName}
                    onChange={(e) => handleEdit('firstName', e.target.value)}
                    className="input-field"
                    style={{ border: '1px solid #0d1b2a', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}
                  />
                </label>
                <br />
                <label>
                  Last Name:
                  <input
                    type="text"
                    value={editedUser.lastName}
                    onChange={(e) => handleEdit('lastName', e.target.value)}
                    className="input-field"
                    style={{ border: '1px solid #0d1b2a', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}
                  />
                </label>
                <br />
                <label>
                  Age:
                  <input
                    type="number"
                    value={editedUser.age}
                    onChange={(e) => handleEdit('age', e.target.value)}
                    className="input-field"
                    style={{ border: '1px solid #0d1b2a', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}
                  />
                </label>
                <br />
                <label>
                  Gender:
                  <input
                    type="text"
                    value={editedUser.gender}
                    onChange={(e) => handleEdit('gender', e.target.value)}
                    className="input-field"
                    style={{ border: '1px solid #0d1b2a', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}
                  />
                </label>
                <br />
                <label>
                  Email:
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleEdit('email', e.target.value)}
                    className="input-field"
                    style={{ border: '1px solid #0d1b2a', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}
                  />
                </label>
                <br />
                <label>
                  Phone:
                  <input
                    type="text"
                    value={editedUser.phone}
                    onChange={(e) => handleEdit('phone', e.target.value)}
                    className="input-field"
                    style={{ border: '1px solid #0d1b2a', padding: '5px', borderRadius: '5px', marginBottom: '10px' }}
                  />
                </label>
                <br />
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: '#ea6020',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '10px',
                    font: 'normal normal normal calc(29 * var(--theme-spx-ratio)) / 1.4em madefor-display-bold, helveticaneuew01-65medi, helveticaneuew02-65medi, helveticaneuew10-65medi, sans-serif',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#ff8c1a'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ea6020'}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: '1px solid #0d1b2a',
                    marginLeft: '10px',
                    marginTop: '10px',
                    font: 'normal normal normal calc(29 * var(--theme-spx-ratio)) / 1.4em madefor-display-bold, helveticaneuew01-65medi, helveticaneuew02-65medi, helveticaneuew10-65medi, sans-serif',
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                <p><strong>Age:</strong> {selectedUser.age}</p>
                <p><strong>Gender:</strong> {selectedUser.gender}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    backgroundColor: '#ea6020',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    border: 'none',
                    marginTop: '10px',
                    font: 'normal normal normal calc(29 * var(--theme-spx-ratio)) / 1.4em madefor-display-bold, helveticaneuew01-65medi, helveticaneuew02-65medi, helveticaneuew10-65medi, sans-serif',
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#ff8c1a'} // Change to a lighter orange
                  onMouseOut={(e) => e.target.style.backgroundColor = '#ea6020'}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Select a user from the list to see details.</p>
        )}
      </main>
    </div>
  );
}

export default App;
