'use client';

import { useFormState } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function Form() {
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction}>
      <input name='email' type='email' required />
      <input name='password' type='password' required />
      <button type='submit'>Sign in</button>
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
