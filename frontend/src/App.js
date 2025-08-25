import { useState } from 'react';
import Navbar from './components/Navbar';
import ResumeForm from './components/ResumeForm';
import PreviewResume from './components/PreviewResume';
import ATSScore from './components/ATSScore';

function App() {
  const [resumeData, setResumeData] = useState(null);
  const [atsScore, setATSScore] = useState(null);

  return (
    <>
      <Navbar />
      <ResumeForm setResumeData={setResumeData} setATSScore={setATSScore} />
      <ATSScore score={atsScore} />
      <PreviewResume data={resumeData} />
    </>
  );
}

export default App;
