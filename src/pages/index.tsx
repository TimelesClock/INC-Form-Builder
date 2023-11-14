// pages/index.tsx
import Navbar from '../components/Navbar';
import FormCreationSection from '../components/FormCreationSection';
import FormsDisplay from '../components/FormsDisplay';

interface Form {
  id: string;
  title: string;
  // Add more form details here
}

const fakeForms:Form[] = [
  {title:"no",id:"1"},
  {title:"yes",id:"2"}
];

const Home = () => {
  return (
    <div>
      <Navbar />
      <FormCreationSection />
      <FormsDisplay forms={fakeForms} />
    </div>
  );
};

export default Home;
