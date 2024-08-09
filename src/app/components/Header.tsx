import Link from 'next/link';
import { signOut } from '../auth';

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

  const buttonStyle = {
    ...linkStyle,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href='/' style={linkStyle}>
          Home
        </Link>
        <Link href='/auth/signIn' style={linkStyle}>
          SignIn
        </Link>
        <Link href='/auth/register' style={linkStyle}>
          Register
        </Link>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
          style={{ margin: 0 }}
        >
          <button type='submit' style={buttonStyle}>
            Logout
          </button>
        </form>
      </nav>
    </header>
  );
}
