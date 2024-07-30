import Link from 'next/link';

export default function Header() {
  const headerStyle = {
    backgroundColor: '#282c34',
    padding: '10px 20px',
    color: 'white',
    borderBottom: '2px solid #61dafb',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '60px',
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#61dafb',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '5px',
    backgroundColor: '#333',
    transition: 'background-color 0.3s, color 0.3s',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href='/' style={linkStyle}>
          Home
        </Link>
        <Link href='/auth/login' style={linkStyle}>
          Login
        </Link>
        <Link href='/auth/register' style={linkStyle}>
          Register
        </Link>
      </nav>
    </header>
  );
}
