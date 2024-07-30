import { fetchData } from './lib/data';

export default async function Home() {
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found or an error occurred.</p>
      )}
    </div>
  );
}
