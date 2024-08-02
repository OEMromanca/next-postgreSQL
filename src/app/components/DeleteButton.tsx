import { deleteUser } from '../lib/data';

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        'use server';
        await deleteUser(id);
      }}
    >
      <button type='submit' className='rounded-md border p-2 hover:bg-gray-100'>
        Delete
      </button>
    </form>
  );
}
