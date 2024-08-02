import React from 'react';
import { registerUser } from '@/app/lib/data';

const RegisterPage = async () => {
 

  return (
    <form action={registerUser}>
      <label>
        Username:
        <input type='text' name='username' required />
      </label>
      <label>
        Email:
        <input type='email' name='email' required />
      </label>
      <label>
        Password:
        <input type='password' name='password' required />
      </label>
      <button type='submit'>Register</button>
    </form>
  );
};

export default RegisterPage;
