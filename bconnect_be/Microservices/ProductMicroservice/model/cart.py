from ..app import db, ma

class Cart(db.Model):
    __tablename__ = "cart"
    buyer_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, default=1, nullable=False)
    
    def __init__(self, buyer_id, product_id, count=1):
        super(Cart, self).__init__(buyer_id=buyer_id)
        super(Cart, self).__init__(product_id=product_id)
        super(Cart, self).__init__(count=count)


class CartSchema(ma.Schema):
    class Meta:
        fields = ("buyer_id", "product_id", "count")
        model = Cart


cart_schema = CartSchema()
