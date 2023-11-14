// components/Navbar.tsx
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="flex justify-between p-4 bg-gray-200">
      <div className="logo">Logo</div>
      <div>
        {session ? (
          <button onClick={() => signOut()} className="text-red-500">Logout</button>
        ) : (
          <button onClick={() => signIn()} className="text-green-500">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
