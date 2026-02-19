import { useAuthContext } from '@/context/auth.context';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export function AuthLayout() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  return (
    <div className="h-screen grid md:grid-cols-2">
      <div className="bg-black text-white px-4  py-10 hidden md:flex justify-between flex-col">
        <h2 className="text-3xl"> AI writer Assistant</h2>
        <p>
          “This library has saved me countless hours of work and helped me
          deliver stunning designs to my clients faster than ever before.”
        </p>
      </div>
      <div className="flex items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  );
}
