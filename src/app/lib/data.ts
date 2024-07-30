import { sql } from '@vercel/postgres';

export async function fetchData() {
  try {
    const { rows } = await sql`
      SELECT username, email , id
      FROM users 
      LIMIT 5
    `;
    return rows;
  } catch (error) {
    console.error('Error fetching card data:', error);
    return [];
  }
}
