import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CardProduct({ item }) {
  const averageRating =
    item.reviews.reduce((acc, next) => acc + next.rating, 0) /
    item.reviews.length;

    const navigate = useNavigate()

  return (
    <div className="p-10 shadow-lg rounded-lg flex flex-col gap-10 cursor-pointer hover:scale-105 transition-all ease-linear" onClick={() => navigate(`/product/${item.id}`)}>
      <div className="w-[200px]">
        <img src={item.thumbnail} alt="" className="w-full object-contain" />
      </div>
      <p className="font-medium text-xl">
        {item.title.length > 20 ? `${item.title.slice(0, 20)}...` : item.title}
      </p>
      <p className="font-bold text-xl">{`Rp. ${(
        item.price * 15000
      ).toLocaleString("id-ID")}`}</p>
      <div className="flex  items-center gap-2">
        <FaStar fill="yellow" size="30" />
        <p className="text-lg font-medium">{averageRating.toFixed(1)}</p>
      </div>
    </div>
  );
}

export default CardProduct;
