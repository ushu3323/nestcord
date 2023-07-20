import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { Route, Routes } from 'react-router-dom';

import { trpc } from './utils/trpc';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_TRPC_HTTP_URL,
    }),
  ],
});
export default function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
