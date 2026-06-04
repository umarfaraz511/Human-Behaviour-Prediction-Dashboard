from fastapi import APIRouter
import random, math
router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/kpis")
def get_kpis():
    return {
        "totalUsers": {"value":124830,"change":8.4,"up":True},
        "activeUsers": {"value":48921,"change":12.7,"up":True},
        "churnRate": {"value":4.2,"change":1.3,"up":False},
        "engagementScore": {"value":78.4,"change":3.1,"up":True},
        "conversionRate": {"value":9.8,"change":0.6,"up":True},
        "predictionAccuracy": {"value":94.7,"change":1.2,"up":True},
        "retentionRate": {"value":87.3,"change":2.4,"up":True},
        "revenueAtRisk": {"value":28400,"change":8.2,"up":False},
    }

@router.get("/engagement")
def get_engagement():
    months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return [{"month":m,"sessions":4200+round(math.sin(i)*800+(i*137)%600),"pageviews":18000+round(math.cos(i)*3000),"conversions":380+round(math.sin(i*0.8)*80),"churnRisk":12+round(math.cos(i*0.6)*4)} for i,m in enumerate(months)]

@router.get("/anomalies")
def get_anomalies():
    return [
        {"id":"a1","type":"Spike","metric":"Bounce Rate","value":"+34%","severity":"high","time":"2 min ago","description":"Unusual bounce rate spike on /pricing page"},
        {"id":"a2","type":"Drop","metric":"Session Duration","value":"-28%","severity":"medium","time":"15 min ago","description":"Session duration drop for mobile users"},
        {"id":"a3","type":"Pattern","metric":"Login Failures","value":"+89%","severity":"critical","time":"3 hr ago","description":"Unusual login failure pattern detected"},
    ]
