"""Skin Analysis API"""

from fastapi import APIRouter, HTTPException
from typing import Optional
from pydantic import BaseModel

from app.mock.data import MOCK_ANALYSIS, MOCK_ANALYSIS_HISTORY

router = APIRouter()


class ScanRequest(BaseModel):
    image: Optional[str] = None  # base64 encoded image
    mode: str = "quick"  # quick or detailed


@router.post("/scan")
async def scan_skin(request: ScanRequest):
    """Perform skin analysis scan"""
    # In demo mode, return mock analysis
    return MOCK_ANALYSIS


@router.get("/history")
async def get_analysis_history(limit: int = 10):
    """Get analysis history"""
    return {
        "analyses": MOCK_ANALYSIS_HISTORY[:limit],
        "total": len(MOCK_ANALYSIS_HISTORY),
    }


@router.get("/trends")
async def get_analysis_trends(period: str = "30d"):
    """Get skin analysis trends over time"""
    return {
        "period": period,
        "data_points": MOCK_ANALYSIS_HISTORY,
        "summary": {
            "score_change": "+6",
            "hydration_change": "+7",
            "oil_change": "-6",
        },
    }


@router.get("/{analysis_id}")
async def get_analysis(analysis_id: str):
    """Get specific analysis by ID"""
    if analysis_id == MOCK_ANALYSIS["id"]:
        return MOCK_ANALYSIS
    raise HTTPException(status_code=404, detail="Analysis not found")
