from ..app import db, ma

class Product(db.Model):
    __tablename__ = "product_table"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(250))
    price = db.Column(db.Integer, nullable=True)
    in_stock = db.Column(db.Integer, nullable=True)
    seller_id = db.Column(db.Integer, nullable=False)
    product_image = db.Column(db.LargeBinary(length=(2**32)-1), nullable = True)

    def __init__(self, name, description, price, seller_id, in_stock):
        super(Product, self).__init__(name=name)
        super(Product, self).__init__(description=description)
        super(Product, self).__init__(price=price)
        super(Product, self).__init__(seller_id=seller_id)
        super(Product, self).__init__(in_stock=in_stock)


class ProductSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "description", "price", "seller_id", "in_stock")
        model = Product


product_schema = ProductSchema()
