function PreviewResume({ data }) {
  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto p-4 mt-8 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Resume Preview</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      
      {/* Render education */}
      <h3 className="mt-4 font-semibold">Education</h3>
      <ul className="list-disc pl-6">
        {data.education.map((edu, i) => (
          <li key={i}>{edu.degree} at {edu.institution} ({edu.years})</li>
        ))}
      </ul>
      
      {/* Render experience */}
      <h3 className="mt-4 font-semibold">Experience</h3>
      <ul className="list-disc pl-6">
        {data.experience.map((exp, i) => (
          <li key={i}>
            <p><strong>{exp.role}</strong> at {exp.company} ({exp.duration})</p>
            <p>{exp.responsibilities}</p>
          </li>
        ))}
      </ul>
      
      {/* Skills, certifications, portfolio */}
      <h3 className="mt-4 font-semibold">Skills</h3>
      <p>{data.skills}</p>
      
      <h3 className="mt-4 font-semibold">Certifications</h3>
      <p>{data.certifications}</p>
      
      <h3 className="mt-4 font-semibold">Portfolio</h3>
      <p>{data.portfolio}</p>

      {/* Download PDF Link */}
      {data.pdf_url && (
        <a
          href={`http://127.0.0.1:5001${data.pdf_url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          download
        >
          Download Resume PDF
        </a>
      )}
    </div>
  );
}

export default PreviewResume;
