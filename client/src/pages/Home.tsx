import { Button } from 'primereact/button';

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="">Welcome to Chat-app</h1>
      <a href="/login" className="grow-0">
        <Button label="Login" />
      </a>
    </div>
  );
}
