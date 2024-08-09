'use server';

import { AuthError } from 'next-auth';
import { signIn } from '../auth';
import { redirect } from 'next/navigation';

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    const result = await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    if (result?.error) {
      return result.error;
    }

    redirect('/dashboard');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
