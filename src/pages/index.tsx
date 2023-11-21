import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FormCreationSection from '../components/FormCreationSection';
import FormsDisplay from '../components/FormsDisplay';

import { useSession, signIn } from "next-auth/react"
import { api } from '~/utils/api';


interface Form {
  id: string;
  title: string;
  // Add more form details here
}

const Home = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [invitedForms, setInvitedForms] = useState<Form[]>([]);
  const { data: session, status } = useSession();

  const { data: form } = api.form.getForms.useQuery({});
  const { data: invitedForm } = api.form.getInvitedForms.useQuery({});

  useEffect(() => {
    if (form) {
      setForms(form);
    }
  }, [form])

  useEffect(() => {
    if (invitedForm) {
      setInvitedForms(invitedForm);
    }
  }, [invitedForm])

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
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
      <FormsDisplay forms={forms} invitedForms={invitedForms} />
    </div>
  );
};

export default Home;
