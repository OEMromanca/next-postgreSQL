'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import crypto from 'crypto';

function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const secretKey = process.env.SECRET_KEY as string;

export async function fetchData(): Promise<User[]> {
  try {
    const { rows } = await sql`
      SELECT username, email, id
      FROM users 
    `;
    return rows as User[];
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}

const RegistrationSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1),
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function registerUser(formData: FormData) {
  const { username, email, password } = RegistrationSchema.parse({
    username: formData.get('username')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  });

  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (username, email, password)
    VALUES (${username}, ${email}, ${hashedPassword})
  `;

  revalidatePath('/');
  redirect('/');
}

export async function loginUser(formData: FormData) {
  const csrfToken = formData.get('csrfToken')?.toString();
  const storedCsrfToken = cookies().get('csrfToken')?.value;

  if (csrfToken !== storedCsrfToken) {
    throw new Error('CSRF token mismatch');
  }

  const { email, password } = LoginSchema.parse({
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  });

  if (!email || !password) {
    throw new Error('Invalid email or password');
  }

  const { rows } = await sql`
    SELECT id, username, password
    FROM users
    WHERE email = ${email}
  `;

  if (rows.length === 0) {
    throw new Error('Invalid email or password');
  }

  const user = rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      email: user.email,
    },
    secretKey,
    { expiresIn: '15min' }
  );

  cookies().set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 900,
    secure: true,
  });

  cookies().set('csrfToken', generateCsrfToken(), {
    httpOnly: true,
    path: '/',
    secure: true,
  });

  redirect('/');
}

export async function logoutUser() {
  cookies().set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: true,
  });

  cookies().set('csrfToken', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    secure: true,
  });

  redirect('/auth/login');
}

export async function deleteUser(id: string) {
  try {
    const result = await sql`
      DELETE FROM users
      WHERE id = ${id}
    `;

    revalidatePath('/');

    if (result.rowCount === 0) {
      throw new Error('User not found');
    }

    return { message: `User '${id}' deleted successfully` };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Internal Server Error');
  }
}
