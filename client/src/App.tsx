import { Button } from 'primereact/button';
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <Button
          onClick={() => setCount((value) => value + 1)}
          label="Count is"
          badge={count.toString()}
          outlined
        />
      </div>
    </div>
  );
}
