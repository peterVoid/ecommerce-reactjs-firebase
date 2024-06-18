import { useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../products";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCartStore } from "../../lib/useCartStore";
import Currency from "../../lib/Currency";

function DetailProduct() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { cart, addToCart } = useCartStore();
  let productData = products.find((item) => item.id === Number(id));
  const averageRating =
    productData.reviews.reduce((acc, next) => acc + next.rating, 0) /
    productData.reviews.length;

  const handleAddToCart = () => {
    const newData = { ...productData, quantity };
    addToCart(newData);
  };

  const handleIncreaseQuantity = () => {
    if (quantity + 1 > 10) {
      return toast.warn("sudah mencapai batas pembelian!");
    }
    if (quantity == productData.stock) {
      return toast.warn("Sudah mencapai batas stock!");
    }
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity - 1 < 1) {
      return toast.warn("STOP! sudah mencapai batas!");
    }
    setQuantity((prev) => prev - 1);
  };

  const totalPrice = Currency(productData, quantity);

  return (
    <div className="px-60 py-10 mt-36">
      <div className="flex gap-5">
        <div className="mr-64">
          <div className="flex gap-10">
            <img
              src={productData.images[0]}
              alt=""
              className="w-[600px] border shadow-md"
            />
            <div>
              <h1 className="font-bold text-4xl">{productData.title}</h1>
              <div className="flex gap-3 mt-2 items-center">
                <FaStar fill="yellow" size="30" />
                <p className="text-lg font-medium">
                  {averageRating.toFixed(1)}
                </p>
              </div>
              <p className="font-bold text-5xl mt-5">{`Rp. ${(
                productData.price * 15000
              ).toLocaleString("id-ID")}`}</p>
              <div className="w-full bg-slate-100 h-1 mt-7" />
              <p className="py-4 text-green-500 font-bold text-xl">Detail</p>
              <div className="w-full bg-slate-100 h-1 mb-7 " />
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 text-xl font-medium">
                  <p>
                    Kondisi: <span>Baru</span>
                    <br />
                    Min. Pesanan: <span>1 Buah</span>
                    <br />
                    Brand: <span>{productData.brand}</span>
                  </p>
                </div>
                <div className="max-w-[500px] font-medium text-xl">
                  <span className="font-bold text-md">Description: </span>{" "}
                  {productData.description}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border p-5 shadow-md w-[300px]">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Atur jumlah dan catatan</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="border px-2 py-1"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                className="border px-2 py-1"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
              <p className="ml-3">Stok Total: {productData.stock}</p>
            </div>
            <p className="text-green-500 cursor-pointer">Tambah Catatan</p>
            <p className="font-bold text-2xl">{`Rp. ${totalPrice}`}</p>
            <button
              className="bg-green-500 text-white py-2 rounded"
              onClick={handleAddToCart}
            >
              + Keranjang
            </button>
            <button className="border border-green-500 text-green-500 py-2 rounded">
              Beli Langsung
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
