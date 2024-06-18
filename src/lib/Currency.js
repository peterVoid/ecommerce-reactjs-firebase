function Currency(productData, quantity) {
  const totalPrice = (productData.price * 15000 * quantity).toLocaleString(
    "id-ID"
  );

  return totalPrice;
}

export default Currency;
