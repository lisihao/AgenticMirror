"""Users API"""

from fastapi import APIRouter
from typing import Optional
from pydantic import BaseModel

from app.mock.data import DEMO_USER, MOCK_ACTIVITY_FEED, MOCK_CALENDAR_EVENTS

router = APIRouter()


class UpdateProfileRequest(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    skin_profile: Optional[dict] = None
    preferences: Optional[dict] = None


class UpdateSkinProfileRequest(BaseModel):
    skin_type: Optional[str] = None
    concerns: Optional[list] = None
    allergies: Optional[list] = None


@router.get("/profile")
async def get_profile():
    """Get user profile"""
    return DEMO_USER


@router.patch("/profile")
async def update_profile(request: UpdateProfileRequest):
    """Update user profile"""
    updated = {**DEMO_USER}
    if request.name:
        updated["name"] = request.name
    if request.avatar:
        updated["avatar"] = request.avatar
    if request.preferences:
        updated["preferences"] = {**updated["preferences"], **request.preferences}

    return {
        "message": "Profile updated",
        "profile": updated,
    }


@router.get("/skin-profile")
async def get_skin_profile():
    """Get user's skin profile"""
    return DEMO_USER["skin_profile"]


@router.post("/skin-profile")
async def update_skin_profile(request: UpdateSkinProfileRequest):
    """Update skin profile"""
    profile = {**DEMO_USER["skin_profile"]}
    if request.skin_type:
        profile["skin_type"] = request.skin_type
    if request.concerns:
        profile["concerns"] = request.concerns
    if request.allergies:
        profile["allergies"] = request.allergies

    return {
        "message": "Skin profile updated",
        "profile": profile,
    }


@router.get("/activity")
async def get_activity(limit: int = 10):
    """Get user activity feed"""
    return {
        "activities": MOCK_ACTIVITY_FEED[:limit],
        "total": len(MOCK_ACTIVITY_FEED),
    }


@router.get("/calendar")
async def get_calendar():
    """Get user's calendar events"""
    return {"events": MOCK_CALENDAR_EVENTS}


@router.post("/calendar/sync")
async def sync_calendar(provider: str = "google"):
    """Sync with external calendar"""
    return {
        "message": f"Calendar sync with {provider} initiated",
        "status": "syncing",
    }


@router.get("/dashboard")
async def get_dashboard():
    """Get dashboard summary data"""
    return {
        "user": DEMO_USER,
        "streak": DEMO_USER["streak"],
        "recent_activity": MOCK_ACTIVITY_FEED[:5],
        "upcoming_events": MOCK_CALENDAR_EVENTS[:3],
        "quick_stats": {
            "skin_score": 78,
            "tutorials_completed": 12,
            "products_tracked": 4,
        },
    }
