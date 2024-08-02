import { cookies } from 'next/headers';
import DeleteButton from './components/DeleteButton';
import { fetchData } from './lib/data';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  const csrfToken = cookieStore.get('csrfToken');

  if (!token || !csrfToken) {
    return redirect('/auth/login');
  }

  const users = await fetchData();

  return (
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Id: {user.id}</p>
              <DeleteButton id={user.id} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found or an error occurred.</p>
      )}
    </div>
  );
}
