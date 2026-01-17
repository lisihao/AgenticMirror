"""Products API"""

from fastapi import APIRouter, HTTPException
from typing import Optional

from app.mock.data import (
    MOCK_PRODUCTS,
    MOCK_PRICE_HISTORY,
    MOCK_SHOPPING_ALERTS,
    get_product_by_id,
)

router = APIRouter()


@router.get("")
async def get_products(
    category: Optional[str] = None,
    subcategory: Optional[str] = None,
    sort: str = "popular",
    limit: int = 20,
):
    """Get list of products"""
    products = MOCK_PRODUCTS

    if category:
        products = [p for p in products if p["category"] == category]
    if subcategory:
        products = [p for p in products if p["subcategory"] == subcategory]

    # Sort
    if sort == "price_low":
        products = sorted(products, key=lambda x: x["price"])
    elif sort == "price_high":
        products = sorted(products, key=lambda x: x["price"], reverse=True)
    elif sort == "rating":
        products = sorted(products, key=lambda x: x["rating"], reverse=True)

    return {
        "products": products[:limit],
        "total": len(products),
    }


@router.get("/search")
async def search_products(q: str, limit: int = 20):
    """Search products"""
    query = q.lower()
    results = [
        p for p in MOCK_PRODUCTS
        if query in p["name"].lower() or query in p["brand"].lower()
    ]
    return {"results": results[:limit], "total": len(results)}


@router.get("/smart-recommendations")
async def get_smart_recommendations():
    """Get AI-powered smart recommendations"""
    return {
        "replenish_soon": [
            {
                "product": get_product_by_id("product-002"),
                "days_left": 7,
                "recommendation": "MAC Chili 即将用完，618大促预计折扣20%",
            }
        ],
        "trending_match": [
            {
                "product": get_product_by_id("product-006"),
                "trend_source": "tiktok",
                "match_reason": "与您关注的「拿铁妆」趋势相关",
            }
        ],
        "skin_based": [
            {
                "product": get_product_by_id("product-001"),
                "skin_concern": "hydration",
                "effectiveness": "高效补水",
            }
        ],
        "alerts": MOCK_SHOPPING_ALERTS,
    }


@router.get("/{product_id}")
async def get_product(product_id: str):
    """Get product details"""
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/{product_id}/price-history")
async def get_price_history(product_id: str, period: str = "30d"):
    """Get product price history"""
    history = MOCK_PRICE_HISTORY.get(product_id, [])

    if not history:
        product = get_product_by_id(product_id)
        if product:
            history = [{"date": "2024-12-15", "price": product["price"]}]

    prices = [p["price"] for p in history]
    avg_price = sum(prices) / len(prices) if prices else 0
    min_price = min(prices) if prices else 0

    return {
        "product_id": product_id,
        "period": period,
        "prices": history,
        "statistics": {
            "current": prices[-1] if prices else 0,
            "average": round(avg_price),
            "lowest": min_price,
        },
        "prediction": {
            "next_sale": "2025-06-18",
            "expected_price": round(min_price * 0.9) if min_price else 0,
        },
    }
