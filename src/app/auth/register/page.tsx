
import React from 'react';

export default function RegisterPage() {
  const pageStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
    margin: '0',
    padding: '0',
  };

  const containerStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  };

  const formStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: 'transparent',  
    color: '#333',  
    outline: 'none',  
  };

  const buttonStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#61dafb',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div style={pageStyle}>
      <main style={containerStyle}>
        <h1 style={{ color: '#282c34' }}>Register Page</h1>
        <form style={formStyle}>
          <input type='text' placeholder='Username' style={inputStyle} />
          <input type='email' placeholder='Email' style={inputStyle} />
          <input type='password' placeholder='Password' style={inputStyle} />
          <button type='submit' style={buttonStyle}>
            Register
          </button>
        </form>
      </main>
    </div>
  );
}
