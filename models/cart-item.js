class CartItem {
  constructor(quantity, productPrice, productTitle, sum) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }

  get() {
    return {
      quantity: this.quantity,
      productPrice: this.productPrice,
      productTitle: this.productTitle,
      sum: this.sum,
    };
  }
}

export default CartItem;
