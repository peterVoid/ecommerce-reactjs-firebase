import SwipperContainer from "../Swiper";
import { products } from "../../products";
import { useEffect, useState } from "react";
import CardProduct from "../CardProduct";
function Home() {
  const [plus, setPlus] = useState(10);
  const [activeCategory, setActiveCategory] = useState("beauty");
  const [filterData, setFilterData] = useState([]);
  const [displayAllProduct, setDisplayAllProduct] = useState(
    products.slice(0, plus)
  );

  const filterCategory = products.map((item) => {
    const { tags } = item;
    return tags[0];
  });
  const category = Array.from(new Set(filterCategory)).slice(0, 8);

  useEffect(() => {
    let resFiltering = products.filter((item) =>
      item.tags.includes(activeCategory)
    );
    setFilterData(resFiltering);
  }, [activeCategory]);

  useEffect(() => {
    setDisplayAllProduct(products.slice(0, plus));
  }, [plus]);

  const handleIncreaseProduct = (status) => {
    if (status === "lebih_banyak") {
      if (displayAllProduct.length >= products.length) {
        return;
      }
      setPlus((prevPlus) => prevPlus + 10);
    } else {
      if (displayAllProduct.length === 0) {
        return;
      }
      setPlus(10);
    }
  };

  return (
    <div className="px-60 py-3 mt-36">
      <div className="">
        <SwipperContainer />
      </div>

      <div>
        <h1 className="font-bold text-2xl mt-14">Semua Kategori</h1>
        <div className="flex gap-10">
          {category.map((item, i) => (
            <div
              key={i}
              className="w-[400px] p-5  cursor-pointer mt-5 rounded-md"
              onClick={() => setActiveCategory(item)}
              style={{
                backgroundColor: `rgba(${Math.floor(
                  Math.random() * 255
                )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
                  Math.random() * 255
                )}, 1)`,
              }}
            >
              {activeCategory === item && (
                <div className="w-[50px] h-1 bg-white rounded-md" />
              )}
              <h3 className="capitalize  text-white font-bold text-xl">
                {item}
              </h3>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap mt-5">
        {filterData.map((item) => (
          <CardProduct key={item.id} item={item} />
        ))}
      </div>

      <div className="">
        <h1 className="font-bold text-2xl mt-14">Semua Product</h1>
        <div className="w-[100px] h-1 bg-slate-700 rounded-xl mb-5" />
        <div className="flex gap-10 flex-wrap">
          {displayAllProduct.map((item) => (
            <CardProduct key={item.id} item={item} />
          ))}
          {displayAllProduct.length < products.length ? (
            <button
              className="border border-green-500 w-[400px] h-max px-5 py-4 rounded-md mt-[5%] text-green-500 font-bold text-xl"
              onClick={() => handleIncreaseProduct("lebih_banyak")}
            >
              Tampilkan lebih banyak
            </button>
          ) : (
            <button
              className="border border-green-500 w-[400px] h-max px-5 py-4 rounded-md mt-[5%] text-green-500 font-bold text-xl"
              onClick={() => handleIncreaseProduct("lebih_sedikit")}
            >
              Tampilkan lebih sedikit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
