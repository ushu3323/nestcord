import { Button } from 'primereact/button';
import useUser from '../hooks/useUser';

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <div className="prose prose-headings:text-white prose-headings:text-center mb-10">
        <h1 className="">Welcome to Chat-app</h1>
        <div className="flex justify-center gap-5">
          {
            user ? (
              <a href="/chat" className="block text-center">
                <Button label="Join" severity="success" className="w-24" rounded disabled={isLoading} />
              </a>
            ) : (
              <>
                <a href="/login" className="block text-center">
                  <Button label="Log in" severity="info" className="w-24" rounded disabled={isLoading} />
                </a>
                <a href="/register" className="block text-center">
                  <Button label="Register" severity="info" className="w-24" outlined rounded disabled={isLoading} />
                </a>
              </>
            )
          }
        </div>
      </div>
    </div>
  );
}
