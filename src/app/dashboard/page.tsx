import { redirect } from 'next/navigation';
import { auth } from '../auth';
import User from '../user/page';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/auth/signIn');
  }

  return (
    <div>
      <User session={session} />
    </div>
  );
}
