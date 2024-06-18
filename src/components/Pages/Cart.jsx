import { useState } from "react";
import { useCartStore } from "../../lib/useCartStore";

function Cart() {
  const { cart, updateQuantity, decreaseQuantity, removeFromCart } =
    useCartStore();
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId, item) => {
    setSelectedItems((prev) => {
      const existingProduct = prev.find(
        (selectedItem) => selectedItem.id === itemId
      );
      if (existingProduct) {
        return prev.filter((selectedItem) => selectedItem.id !== itemId);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleDecreaseQuantity = (id) => {
    decreaseQuantity(id);
    const existing = selectedItems.find((item) => item.id === id);
    if (existing) {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const handleIncreaseQuantity = (id) => {
    updateQuantity(id);
    const existing = selectedItems.find((item) => item.id === id);
    if (existing) {
      setSelectedItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const rmvFromCart = (id) => {
    removeFromCart(id);
    const existing = selectedItems.find((item) => item.id === id);
    if (existing) {
      setSelectedItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const calculateTotal = () => {
    return selectedItems.reduce(
      (acc, item) => acc + item.quantity * item.price * 15000,
      0
    );
  };

  return (
    <div className="mt-36 px-52 py-20">
      <h1 className="font-bold text-4xl mb-10">Keranjang</h1>
      <div className="flex items-center gap-20">
        <div className="flex-1 flex flex-col gap-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-slate-200 px-11 py-10 rounded-md flex  items-center justify-between relative"
            >
              <div className="flex items-center">
                <span>
                  <input
                    type="checkbox"
                    checked={selectedItems.some(
                      (selectedItem) => selectedItem.id === item.id
                    )}
                    onChange={() => handleCheckboxChange(item.id, item)}
                  />
                </span>
                <span>
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="object-cover w-[200px] h-[200px]"
                  />
                </span>
                <span className="font-semibold text-xl">{item.title}</span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  Rp.{" "}
                  {(item.quantity * item.price * 15000).toLocaleString("id-ID")}
                </p>
              </div>
              <div className="absolute right-36 bottom-6 flex gap-3">
                <div className="flex gap-3 bg-slate-300 items-center">
                  <button
                    className="border px-2 py-1"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="border px-2 py-1"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button
                    className="font-semibold text-xl"
                    onClickCapture={() => rmvFromCart(item.id)}
                  >
                    Remove from cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="max-w-[600px]">
          <h1>Ringkasan Belanja</h1>
          <p>Total: Rp. {calculateTotal().toLocaleString("id-ID")}</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
