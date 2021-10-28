class Order {
  constructor(id, items, totalAmount, date) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = date;
  }

  get() {
    return {
      id: this.id,
      items: this.items,
      totalAmount: this.totalAmount,
      date: this.date,
    };
  }
}

export default Order;
