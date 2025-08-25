from flask import Blueprint, request, jsonify, current_app as app
from .ats_score import extract_keywords, calculate_ats_score
from .resume_generator import generate_pdf_resume

bp = Blueprint('main', __name__)

@bp.route('/')
def root():
    return "Resumize Backend Running", 200

@bp.route('/health')
def health():
    return jsonify({'status': 'ok'}), 200

@bp.route('/api/generate-resume', methods=['POST'])
def generate_resume():
    if not request.is_json:
        return jsonify({'error': 'Request must be JSON'}), 400

    try:
        data = request.get_json(force=True)

        # Extract keywords from job description
        jd_text = data.get('jobDescription', '')
        jd_keywords = extract_keywords(jd_text)

        # Calculate ATS score based on user's input against JD keywords
        ats_score = calculate_ats_score(data, jd_keywords)

        # Generate PDF Resume, returning url to access/download
        pdf_url = generate_pdf_resume(data, jd_keywords)

        # Prepare response with ATS score, resume data, PDF URL
        response_data = {
            'ats_score': ats_score,
            'resume_data': data,
            'pdf_url': pdf_url
        }
        return jsonify(response_data)

    except Exception as e:
        app.logger.error(f"Error generating resume: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
