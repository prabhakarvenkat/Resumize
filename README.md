# Resumize
Resume Builder Website with ATS Optimization

![Thumbnail Image](https://github.com/prabhakarvenkat/Resumize/blob/9a4917741a8c0437a396c3fde9dd5de8a9b828af/image.png)


Resumize is a full-stack resume builder application that helps users create tailored resumes optimized for Applicant Tracking System (ATS) scoring. The app allows users to enter their personal details, education, work experience, skills, certifications, and a job description (JD). It then generates an ATS-friendly PDF resume highlighting relevant keywords extracted from the JD.

---

## Features

- User-friendly React frontend for entering resume details.
- Flask backend processing with:
  - ATS keyword extraction and scoring.
  - Dynamic PDF resume generation.
- Downloadable PDF resumes stored securely on the server.
- Real-time ATS match score feedback.

---

## Project Structure

- `frontend/`: React application source code.
- `backend/`: Flask API backend code including PDF generation.
- `backend/static/`: Folder where generated PDF resumes are stored.

---

## Prerequisites

- Python 3.8+ with virtual environment support.
- Node.js and npm installed.
- Recommended: Create and activate a Python virtual environment for backend.

---

## Setup & Running Instructions

### Backend

1. Navigate to backend folder:

'''
cd backend
'''

2. Create and activate a Python virtual environment (optional but recommended):

'''
python3 -m venv venv
source venv/bin/activate # macOS/Linux
venv\Scripts\activate # Windows
'''

3. Install required Python packages:

'''
pip install -r requirements.txt
'''

4. Run the Flask backend server:

'''
python3 wsgi.py
'''

The backend will run at `http://127.0.0.1:5001`.

---

### Frontend

1. Navigate to frontend folder:

'''
cd frontend
'''

2. Install dependencies:

'''
npm install
'''

3. Start the React development server:

'''
npm start
'''

The app will open in your browser at `http://localhost:3000`.

---

## Using the Application

1. Fill the resume form fields including personal info, education, experience, skills, certifications, portfolio links, and job description.

2. Click **Generate Resume**.

3. The ATS score will display, and the application will generate a PDF resume tailored to the job description.

4. A **Download Resume PDF** button will appear—click to open or download your resume.

---

## Note on Generated PDF Storage

- All generated PDF resumes are saved **inside the backend’s `static` folder**.
- PDFs are accessible via URLs like:  
`http://127.0.0.1:5001/static/resume_<unique-id>.pdf`
- This folder should be kept secure if deployed publicly.

---

## Troubleshooting

- Make sure the backend server is running before using the frontend.
- Check for errors in backend terminal logs for insight on failures.
- Ensure frontend Axios base URL matches the backend URL.
- Verify your Python environment has all dependencies installed.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
