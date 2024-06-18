import { BiCart, BiSearch } from "react-icons/bi";
import { auth } from "../lib/firebase";
import { useStoreStore } from "../lib/useUserStore";
import { useCartStore } from "../lib/useCartStore";
import { Link } from "react-router-dom";

function Navbar() {
  const { user } = useStoreStore();
  const { cart, addToCart } = useCartStore();
  return (
    <div className="flex py-6 px-10 gap-20 border-b fixed top-0 right-0 left-0 z-20 bg-white items-center">
      <div className="flex flex-1 gap-10">
        <h1 className="text-center text-4xl font-bold text-[#00AA5B] ">
          <a href="/">Abes</a>
        </h1>
        <div className="border w-full bg-white  rounded-lg px-7 py-3 flex items-center gap-4">
          <BiSearch size={30} />
          <input
            type="text"
            placeholder="Cari di Abes"
            className="border-none outline-none w-full "
          />
        </div>
      </div>

      <div className="flex gap-20 items-center">
        <Link to="/cart" className="flex gap-1">
          <BiCart size={30} className="cursor-pointer" />
          <span className="font-semibold -translate-y-2">{cart.length}</span>
        </Link>
        <h1 className="font-semibold text-xl">Welcome back, {user.username}</h1>
        <button onClick={() => auth.signOut()}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
