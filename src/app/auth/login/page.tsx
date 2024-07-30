export default async function LoginPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form
        method='POST'
        action='/api/login'
        style={{ display: 'flex', flexDirection: 'column', width: '300px' }}
      >
        <h1>Login</h1>
        <label htmlFor='username'>Username</label>
        <input id='username' name='username' type='text' required />
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' required />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
