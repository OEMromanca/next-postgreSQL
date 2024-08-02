import { loginUser } from '@/app/lib/data';

export default async function LoginPage() {
  return (
    <form action={loginUser}>
      <label>
        Email:
        <input type='email' name='email' required autoComplete='email' />
      </label>
      <br />
      <label>
        Password:
        <input
          type='password'
          name='password'
          required
          autoComplete='current-password'
        />
      </label>
      <br />
      <button type='submit'>Login</button>
    </form>
  );
}
