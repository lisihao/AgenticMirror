"""Tutorials API"""

from fastapi import APIRouter, HTTPException
from typing import Optional
from pydantic import BaseModel

from app.mock.data import MOCK_TUTORIALS, MOCK_PRODUCTS, get_tutorial_by_id

router = APIRouter()


class TutorialProgressRequest(BaseModel):
    current_step: int
    completed: bool = False


@router.get("")
async def get_tutorials(
    difficulty: Optional[int] = None,
    category: Optional[str] = None,
    limit: int = 20,
):
    """Get list of tutorials"""
    tutorials = MOCK_TUTORIALS

    if difficulty:
        tutorials = [t for t in tutorials if t["difficulty"] == difficulty]

    return {
        "tutorials": tutorials[:limit],
        "total": len(tutorials),
    }


@router.get("/{tutorial_id}")
async def get_tutorial(tutorial_id: str):
    """Get detailed tutorial information"""
    tutorial = get_tutorial_by_id(tutorial_id)
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")

    # Enrich with product details
    enriched_steps = []
    for step in tutorial["steps"]:
        step_products = []
        for pid in step.get("products", []):
            for p in MOCK_PRODUCTS:
                if p["id"] == pid:
                    step_products.append(p)
                    break
        enriched_steps.append({
            **step,
            "product_details": step_products,
        })

    return {
        **tutorial,
        "steps": enriched_steps,
    }


@router.post("/{tutorial_id}/progress")
async def update_progress(tutorial_id: str, request: TutorialProgressRequest):
    """Update tutorial progress"""
    tutorial = get_tutorial_by_id(tutorial_id)
    if not tutorial:
        raise HTTPException(status_code=404, detail="Tutorial not found")

    return {
        "tutorial_id": tutorial_id,
        "current_step": request.current_step,
        "completed": request.completed,
        "message": "Progress updated successfully",
    }


@router.get("/progress")
async def get_progress():
    """Get user's tutorial progress"""
    # Mock in-progress tutorials
    return {
        "in_progress": [
            {
                "tutorial_id": "tutorial-001",
                "current_step": 3,
                "last_accessed": "2024-12-15T09:30:00",
            }
        ]
    }
