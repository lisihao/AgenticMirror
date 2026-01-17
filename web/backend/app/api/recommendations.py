"""Recommendations API"""

from fastapi import APIRouter
from typing import Optional
from pydantic import BaseModel

from app.mock.data import MOCK_STYLES, MOCK_TRENDS, MOCK_PRODUCTS

router = APIRouter()


class ARPreviewRequest(BaseModel):
    style_id: str
    face_image: Optional[str] = None  # base64


@router.get("/makeup")
async def get_makeup_recommendations(
    occasion: Optional[str] = None,
    skin_type: Optional[str] = None,
    mood: Optional[str] = None,
    limit: int = 10,
):
    """Get personalized makeup style recommendations"""
    styles = MOCK_STYLES

    if occasion:
        styles = [s for s in styles if s["occasion"] == occasion]

    # Sort by match score
    styles = sorted(styles, key=lambda x: x["match_score"], reverse=True)

    trending = [s for s in MOCK_STYLES if s.get("trend_source")]

    return {
        "personalized": styles[:limit],
        "trending": trending[:5],
    }


@router.get("/products")
async def get_product_recommendations(
    category: Optional[str] = None,
    skin_concerns: Optional[str] = None,
    limit: int = 10,
):
    """Get product recommendations based on skin analysis"""
    products = MOCK_PRODUCTS

    if category:
        products = [p for p in products if p["category"] == category]

    # Add recommendation reasons
    recommended = []
    for product in products[:limit]:
        recommended.append({
            **product,
            "match_reason": f"适合您的{product.get('suitable_skin_types', ['all'])[0]}肤质"
        })

    return {"recommended": recommended}


@router.get("/styles/{style_id}")
async def get_style_details(style_id: str):
    """Get detailed style information"""
    for style in MOCK_STYLES:
        if style["id"] == style_id:
            # Include related products
            style_products = []
            for pid in style.get("products", []):
                for p in MOCK_PRODUCTS:
                    if p["id"] == pid:
                        style_products.append(p)
                        break
            return {
                **style,
                "product_details": style_products,
            }
    return {"error": "Style not found"}


@router.post("/ar-preview")
async def get_ar_preview(request: ARPreviewRequest):
    """Get AR makeup preview"""
    # In demo mode, return a placeholder response
    return {
        "style_id": request.style_id,
        "preview_image": None,  # Would contain base64 image in real implementation
        "message": "AR preview generated successfully",
    }


@router.get("/trends")
async def get_trending_styles():
    """Get trending makeup styles from social media"""
    return {"trends": MOCK_TRENDS}
