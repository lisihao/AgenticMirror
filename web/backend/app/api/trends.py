"""Trends API"""

from fastapi import APIRouter
from typing import Optional

from app.mock.data import MOCK_TRENDS, MOCK_STYLES, MOCK_PRODUCTS

router = APIRouter()


@router.get("/makeup")
async def get_makeup_trends(
    source: Optional[str] = None,
    period: str = "7d",
    limit: int = 10,
):
    """Get trending makeup styles from social media"""
    trends = MOCK_TRENDS

    if source:
        trends = [t for t in trends if t["source"] == source]

    # Sort by trend score
    trends = sorted(trends, key=lambda x: x["trend_score"], reverse=True)

    return {
        "trends": trends[:limit],
        "period": period,
        "sources": ["xiaohongshu", "tiktok", "instagram", "weibo"],
    }


@router.get("/products")
async def get_product_trends(limit: int = 10):
    """Get trending products"""
    # Mock trending products
    trending = []
    for i, product in enumerate(MOCK_PRODUCTS[:limit]):
        trending.append({
            "product": product,
            "trend_score": 95 - i * 5,
            "mentions": 10000 - i * 1000,
            "growth": f"+{15 - i}%",
        })

    return {"hot_products": trending}


@router.get("/styles")
async def get_style_trends():
    """Get trending makeup styles"""
    trending_styles = [s for s in MOCK_STYLES if s.get("trend_source")]
    return {
        "trending_styles": sorted(
            trending_styles,
            key=lambda x: x.get("trend_engagement", 0),
            reverse=True
        )
    }
