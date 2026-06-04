from fastapi import APIRouter
router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/segments")
def get_segments():
    return [
        {"name":"Power Users","value":18,"color":"#0ea5e9","users":4320},
        {"name":"Regular Users","value":35,"color":"#8b5cf6","users":8400},
        {"name":"Casual Users","value":28,"color":"#10b981","users":6720},
        {"name":"At-Risk Users","value":12,"color":"#f59e0b","users":2880},
        {"name":"Churned Users","value":7,"color":"#f43f5e","users":1680},
    ]

@router.get("/live")
def get_live_users():
    return [
        {"id":"u1001","name":"Alice Chen","page":"/products","duration":240,"intent":"Purchase","churnRisk":8,"engagementScore":92,"country":"US"},
        {"id":"u1002","name":"Bob Malik","page":"/","duration":45,"intent":"Browse","churnRisk":62,"engagementScore":34,"country":"PK"},
        {"id":"u1003","name":"Carol Singh","page":"/checkout","duration":380,"intent":"Purchase","churnRisk":5,"engagementScore":97,"country":"IN"},
        {"id":"u1004","name":"David Kim","page":"/dashboard","duration":720,"intent":"Onboarding","churnRisk":15,"engagementScore":78,"country":"KR"},
        {"id":"u1005","name":"Eva Patel","page":"/pricing","duration":180,"intent":"Research","churnRisk":31,"engagementScore":61,"country":"UK"},
    ]
