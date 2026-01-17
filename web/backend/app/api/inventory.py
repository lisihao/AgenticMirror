"""Inventory API"""

from fastapi import APIRouter, HTTPException
from typing import Optional
from pydantic import BaseModel

from app.mock.data import MOCK_INVENTORY, MOCK_PRODUCTS, get_product_by_id

router = APIRouter()


class AddInventoryRequest(BaseModel):
    product_id: str
    purchase_date: Optional[str] = None
    amount: Optional[int] = None


class UpdateInventoryRequest(BaseModel):
    remaining_percent: int


@router.get("")
async def get_inventory():
    """Get user's product inventory"""
    # Enrich with product details
    enriched = []
    for item in MOCK_INVENTORY:
        product = get_product_by_id(item["product_id"])
        if product:
            enriched.append({
                **item,
                "product": product,
            })

    # Categorize
    skincare = [i for i in enriched if i["product"]["category"] == "skincare"]
    makeup = [i for i in enriched if i["product"]["category"] == "makeup"]

    # Get alerts
    alerts = [i for i in enriched if i["status"] in ["critical", "running_low"]]

    return {
        "categories": {
            "skincare": skincare,
            "makeup": makeup,
        },
        "alerts": alerts,
        "total_items": len(enriched),
        "total_value": sum(i["product"]["price"] for i in enriched),
    }


@router.post("")
async def add_to_inventory(request: AddInventoryRequest):
    """Add product to inventory"""
    product = get_product_by_id(request.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "message": "Product added to inventory",
        "item": {
            "id": f"inv-{len(MOCK_INVENTORY) + 1:03d}",
            "product_id": request.product_id,
            "product": product,
            "remaining_percent": 100,
            "status": "good",
        },
    }


@router.patch("/{inventory_id}")
async def update_inventory(inventory_id: str, request: UpdateInventoryRequest):
    """Update inventory item usage"""
    for item in MOCK_INVENTORY:
        if item["id"] == inventory_id:
            # Determine status based on remaining percent
            status = "good"
            if request.remaining_percent <= 15:
                status = "critical"
            elif request.remaining_percent <= 40:
                status = "running_low"

            return {
                "message": "Inventory updated",
                "item": {
                    **item,
                    "remaining_percent": request.remaining_percent,
                    "status": status,
                },
            }

    raise HTTPException(status_code=404, detail="Inventory item not found")


@router.delete("/{inventory_id}")
async def delete_inventory(inventory_id: str):
    """Remove item from inventory"""
    for item in MOCK_INVENTORY:
        if item["id"] == inventory_id:
            return {"message": "Item removed from inventory"}

    raise HTTPException(status_code=404, detail="Inventory item not found")


@router.get("/subscriptions")
async def get_subscriptions():
    """Get user's product subscriptions"""
    return {
        "subscriptions": [
            {
                "id": "sub-001",
                "product_id": "product-001",
                "product": get_product_by_id("product-001"),
                "frequency_months": 2,
                "price_at_subscription": 950,
                "discount_percent": 10,
                "status": "active",
                "next_delivery": "2025-02-15",
            },
            {
                "id": "sub-002",
                "product_id": "product-004",
                "product": get_product_by_id("product-004"),
                "frequency_months": 3,
                "price_at_subscription": 480,
                "discount_percent": 5,
                "status": "active",
                "next_delivery": "2025-03-01",
            },
        ]
    }


@router.post("/subscriptions")
async def create_subscription(product_id: str, frequency_months: int = 2):
    """Create a new subscription"""
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return {
        "message": "Subscription created",
        "subscription": {
            "id": "sub-new",
            "product_id": product_id,
            "product": product,
            "frequency_months": frequency_months,
            "status": "active",
        },
    }
