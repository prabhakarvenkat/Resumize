import { useState } from "react";
import axios from "../utils/api";

const emptyEducation = { degree: "", institution: "", years: "" };
const emptyExperience = { role: "", company: "", duration: "", responsibilities: "" };

function ResumeForm({ setResumeData, setATSScore }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    education: [emptyEducation],
    experience: [emptyExperience],
    skills: "",
    certifications: "",
    portfolio: "",
    jobDescription: "",
  });

  const [error, setError] = useState("");

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Updated Education handlers - immutable updates
  const handleEduChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newEducation = prev.education.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      );
      return { ...prev, education: newEducation };
    });
  };
  const addEducation = () =>
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, emptyEducation],
    }));
  const removeEducation = (index) => {
    setFormData((prev) => {
      const newEdu = prev.education.filter((_, i) => i !== index);
      return { ...prev, education: newEdu };
    });
  };

  // Updated Experience handlers - immutable updates
  const handleExpChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newExperience = prev.experience.map((item, i) =>
        i === index ? { ...item, [name]: value } : item
      );
      return { ...prev, experience: newExperience };
    });
  };
  const addExperience = () =>
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, emptyExperience],
    }));
  const removeExperience = (index) => {
    setFormData((prev) => {
      const newExp = prev.experience.filter((_, i) => i !== index);
      return { ...prev, experience: newExp };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/generate-resume", formData);
      setResumeData(res.data.resume_data);
      setATSScore(res.data.ats_score);
    } catch {
      setError("Failed to generate resume. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-semibold">Personal Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn URL"
        value={formData.linkedin}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <h2 className="text-xl font-semibold">Education</h2>
      {formData.education.map((edu, idx) => (
        <div key={idx} className="space-y-2 mb-4 border p-4 rounded">
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) => handleEduChange(idx, e)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="institution"
            placeholder="Institution"
            value={edu.institution}
            onChange={(e) => handleEduChange(idx, e)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="years"
            placeholder="Years (e.g. 2019-2023)"
            value={edu.years}
            onChange={(e) => handleEduChange(idx, e)}
            className="border p-2 w-full"
          />
          {formData.education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(idx)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addEducation}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Add Education
      </button>

      <h2 className="text-xl font-semibold">Work Experience</h2>
      {formData.experience.map((exp, idx) => (
        <div key={idx} className="space-y-2 mb-4 border p-4 rounded">
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => handleExpChange(idx, e)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => handleExpChange(idx, e)}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. Jan 2020 - Dec 2022)"
            value={exp.duration}
            onChange={(e) => handleExpChange(idx, e)}
            className="border p-2 w-full"
          />
          <textarea
            name="responsibilities"
            placeholder="Responsibilities"
            value={exp.responsibilities}
            onChange={(e) => handleExpChange(idx, e)}
            className="border p-2 w-full"
          />
          {formData.experience.length > 1 && (
            <button
              type="button"
              onClick={() => removeExperience(idx)}
              className="bg-red-600 text-white px-4 py-1 rounded"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addExperience}
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Add Experience
      </button>

      <h2 className="text-xl font-semibold">Skills, Certifications & Portfolio</h2>
      <textarea
        name="skills"
        placeholder="Technical & Soft Skills"
        value={formData.skills}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <textarea
        name="certifications"
        placeholder="Certifications / Achievements"
        value={formData.certifications}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="portfolio"
        placeholder="Portfolio Links (GitHub, Portfolio, Behance, etc.)"
        value={formData.portfolio}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <h2 className="text-xl font-semibold">Job Description (JD)</h2>
      <textarea
        name="jobDescription"
        placeholder="Paste or upload the Job Description here"
        value={formData.jobDescription}
        onChange={handleChange}
        required
        className="border p-2 w-full h-32"
      />

      <button
        type="submit"
        className="bg-blue-700 text-white px-8 py-3 rounded mt-4 hover:bg-blue-800 transition"
      >
        Generate Resume
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}

export default ResumeForm;
