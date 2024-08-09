'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

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

  redirect('/auth/login');
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchUserData(id: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const result = await sql`
      DELETE FROM users
      WHERE id = ${id}
    `;

    revalidatePath('/dasbhoard');

    if (result.rowCount === 0) {
      throw new Error('User not found');
    }

    return { message: `User '${id}' deleted successfully` };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Internal Server Error');
  }
}
