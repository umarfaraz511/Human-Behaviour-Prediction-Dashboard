## 🎥 Project Demo
[screen-capture (8).webm](https://github.com/user-attachments/assets/6b50c58b-106d-4978-b864-dbe6bbe1ea7c)


# BEHAVR : Human Behavior Prediction Dashboard
<img width="958" height="440" alt="p1" src="https://github.com/user-attachments/assets/e8cf5a0a-a301-451c-80f6-92b0a2144a8e" />
<img width="947" height="445" alt="p2" src="https://github.com/user-attachments/assets/37ce823a-e6ac-4c0b-a25a-b5b2aca5d467" />
<img width="960" height="444" alt="p3" src="https://github.com/user-attachments/assets/772b0628-e780-4791-bdd8-96a54f96eaf3" />
<img width="797" height="413" alt="p4" src="https://github.com/user-attachments/assets/dabda676-cff8-4f12-b61f-66653575b859" />

<img width="958" height="445" alt="p5" src="https://github.com/user-attachments/assets/3d8830cc-7d5b-4f6e-9b99-5b3dbd409362" />
<img width="960" height="440" alt="p6" src="https://github.com/user-attachments/assets/01b6f1e1-2319-4d47-9d13-4dedb7cb72d9" />
<img width="958" height="446" alt="p7" src="https://github.com/user-attachments/assets/8c2772e2-bfda-4e51-8441-16763a6625de" />

<img width="958" height="440" alt="p8" src="https://github.com/user-attachments/assets/f2639774-94b5-4439-b9a1-19e278562e0d" />

<img width="959" height="443" alt="p9" src="https://github.com/user-attachments/assets/35ba36f1-7178-4c4b-8bcc-c4d1660a4a81" />

> AI-powered human behavior prediction, intent classification, churn prediction, and engagement analytics platform.

[![GitHub](https://img.shields.io/badge/GitHub-umarfaraz511-black?logo=github)](https://github.com/umarfaraz511)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Umar%20Faraz-blue?logo=linkedin)](https://www.linkedin.com/in/umar-faraz-700457280)

**Developer:** [Umar Faraz](https://github.com/umarfaraz511) · [LinkedIn](https://www.linkedin.com/in/umar-faraz-700457280)

---

## Features

- 6 production AI/ML models (LSTM, XGBoost, RF, CNN, IsolationForest, BERT)
- Real-time user behavior tracking and intent classification
- Churn prediction with 89.6% accuracy
- Engagement forecasting with confidence bands
- Anomaly detection and AI-powered explanations
- BEHAVR AI Assistant powered by Groq LLaMA 3.3-70B
- 8 analytics dashboards with interactive charts
- CSV, JSON, PDF export for all reports
- Enterprise security: JWT, RBAC, audit logging

## Quick Start

### Frontend
```bash
cd frontend
npm install
# Add GROQ key to .env.local:
echo "NEXT_PUBLIC_GROQ_API_KEY=your_key" > .env.local
npm run dev
# Opens at http://localhost:3000
```

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Add GROQ_API_KEY to .env
uvicorn app.main:app --reload
# API at http://localhost:8000/api/docs
```

### Docker
```bash
GROQ_API_KEY=your_key docker compose -f docker/docker-compose.yml up --build
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | / | Platform overview with live chart |
| Dashboard | /dashboard | Full KPI command center |
| Behavior Analytics | /behavior-analytics | Sessions, flows, journeys |
| Predictions | /predictions | ML forecasts and model registry |
| User Insights | /user-insights | Individual user profiles |
| Reports | /reports | Export center (CSV/JSON/PDF) |
| AI Assistant | /ai-assistant | Groq LLaMA chat interface |
| About | /about | Platform and developer info |
| Contact | /contact | Developer contact form |

## Developer

**Umar Faraz** — AI/ML Engineer
- GitHub: https://github.com/umarfaraz511
- LinkedIn: https://www.linkedin.com/in/umar-faraz-700457280
