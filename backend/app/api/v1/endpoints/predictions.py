from fastapi import APIRouter
router = APIRouter(prefix="/predictions", tags=["Predictions"])

@router.get("/forecast")
def get_forecast():
    return [
        {"label":"Aug","predicted":4920,"lower":4400,"upper":5440},
        {"label":"Sep","predicted":5180,"lower":4620,"upper":5740},
        {"label":"Oct","predicted":5440,"lower":4830,"upper":6050},
        {"label":"Nov","predicted":5820,"lower":5180,"upper":6460},
        {"label":"Dec","predicted":6200,"lower":5510,"upper":6890},
    ]

@router.get("/models")
def get_models():
    return [
        {"name":"Behavior LSTM","type":"Deep Learning","accuracy":94.7,"precision":93.2,"recall":95.1,"f1":94.1,"confidence":96.3,"status":"production"},
        {"name":"Intent XGBoost","type":"Gradient Boost","accuracy":91.3,"precision":90.8,"recall":92.1,"f1":91.4,"confidence":93.7,"status":"production"},
        {"name":"Churn RF","type":"Random Forest","accuracy":89.6,"precision":88.4,"recall":90.7,"f1":89.5,"confidence":91.2,"status":"production"},
        {"name":"Anomaly IForest","type":"Unsupervised","accuracy":92.1,"precision":91.7,"recall":92.8,"f1":92.2,"confidence":94.0,"status":"production"},
        {"name":"Sentiment BERT","type":"Transformer","accuracy":93.4,"precision":92.9,"recall":93.8,"f1":93.3,"confidence":95.1,"status":"production"},
    ]
