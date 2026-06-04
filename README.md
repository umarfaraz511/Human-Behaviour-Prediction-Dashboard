# BEHAVR — Human Behavior Prediction Dashboard

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
