import { Session } from 'next-auth';
import React from 'react';

interface UserProps {
  session: Session;
}

export default function User({ session }: UserProps) {
  return (
    <div>
      <h1>Username:</h1>
      <p>{session.user?.username}</p>
      <h1>Email:</h1>
      <p>{session.user?.email}</p>
    </div>
  );
}
