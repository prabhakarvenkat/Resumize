import spacy

nlp = spacy.load("en_core_web_sm")

def extract_keywords(text):
    doc = nlp(text.lower())
    keywords = set()
    for token in doc:
        if token.is_stop or token.is_punct:
            continue
        if token.pos_ in ['NOUN', 'PROPN', 'ADJ', 'VERB']:
            keywords.add(token.lemma_)
    return keywords

def calculate_ats_score(user_data, jd_keywords):
    # Combine user input texts
    user_text = ' '.join([
        user_data.get('skills', ''),
        ' '.join(exp.get('responsibilities','') for exp in user_data.get('experience', [])),
        user_data.get('certifications', '')
    ]).lower()

    user_doc = nlp(user_text)
    user_words = set(token.lemma_ for token in user_doc if not token.is_stop and not token.is_punct)

    matched_keywords = jd_keywords.intersection(user_words)
    total_keywords = max(len(jd_keywords), 1)
    score = int(len(matched_keywords) / total_keywords * 100)

    return score
