roles = [
    "buyer",
    "seller",
    "support",
    "admin"
]

permissions = {
    "buyer" : [
        "request_make_seller",
        "get_seller_requests",
        "agree_seller_terms",
        "create_product",
        "get_mycart",
        "add_to_cart",
        "remove_from_cart"
    ],
    "seller": [
        "create_product",
        "agree_seller_terms",
        "get_mycart",
        "add_to_cart",
        "remove_from_cart"
    ],
    "support": [
        "get_identification",
        "get_seller_requests"
    ],
    "admin": [
        "create_product",
        "get_identification",
        "get_seller_requests",
        "make_seller",
        "dismiss_request"
    ]
}