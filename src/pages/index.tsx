
import Navbar from '../components/Navbar';
import FormCreationSection from '../components/FormCreationSection';
import FormsDisplay from '../components/FormsDisplay';

import { useSession, signIn, signOut } from "next-auth/react"
import { api } from '~/utils/api';
import { useRouter } from 'next/router';

interface Form {
  id: string;
  title: string;
  // Add more form details here
}

const fakeForms: Form[] = [
  { title: "no", id: "1" },
  { title: "yes", id: "2" }
];

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto p-4">
          <h1 className="text-xl font-bold mb-4">You are not signed in</h1>
          <button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <FormCreationSection />
      <FormsDisplay forms={fakeForms} />
    </div>
  );
};

export default Home;
