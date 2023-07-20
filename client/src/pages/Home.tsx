import { Button } from 'primereact/button';

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center w-full">
      <div className="prose prose-headings:text-white prose-headings:text-center mb-10">
        <h1 className="">Welcome to Chat-app</h1>

        <div className="flex justify-center gap-5">
          <a href="/login" className="block text-center">
            <Button label="Log in" severity="info" className="w-24" rounded />
          </a>
          <a href="/register" className="block text-center">
            <Button label="Register" severity="info" className="w-24" outlined rounded />
          </a>
        </div>
      </div>
    </div>
  );
}
