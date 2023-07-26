import { Button } from 'primereact/button';
import { Navigate } from 'react-router-dom';
import { ProgressSpinner } from 'primereact/progressspinner';
import useUser from '../hooks/useUser';

export default function Chat() {
  const { logout, isLoading, user } = useUser();

  if (isLoading) {
    return <ProgressSpinner />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="prose prose-headings:text-white">
      <h1>Chat works!</h1>
      <h3>{`Hello ${user.username}!`}</h3>
      <Button onClick={() => logout()} label="Log out" />
    </div>
  );
}
