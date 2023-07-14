import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { trpc } from '../utils/trpc';

export default function Home() {
  const usersQuery = trpc.users.list.useQuery();

  return (
    <div className="h-screen flex flex-col justify-center items-center prose prose-headings:text-white">
      <h1 className="">Welcome to Chat-app</h1>
      <a href="/login" className="grow-0">
        <Button label="Login" />
      </a>
      <h2>Users registered</h2>
      <DataTable
        value={usersQuery.data}
        loading={usersQuery.isLoading}
        className="w-80"
        rows={5}
        stripedRows
      >
        <Column field="id" header="ID" />
        <Column field="username" header="Username" />
        <Column field="email" header="Email" />
      </DataTable>
    </div>
  );
}
