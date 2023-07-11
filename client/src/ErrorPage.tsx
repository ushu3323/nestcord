import { Button } from 'primereact/button';
import { useNavigate, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error: { statusText: string, message: string } = useRouteError() as any;
  console.error(error);

  return (
    <div className="flex flex-col justify-center gap-5 h-screen">
      <div className="prose text-white text-center min-w-full">
        <h1 className="text-white">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>
            {error.statusText || error.message}
          </i>
        </p>
        <Button onClick={() => navigate('/')} label="Go home" severity="info" text />
      </div>
    </div>
  );
}
