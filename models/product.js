class Product {
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }

  get() {
    return {
      id: this.id,
      ownerId: this.ownerId,
      imageUrl: this.imageUrl,
      title: this.title,
      description: this.description,
      price: this.price,
    };
  }
}

export default Product;
