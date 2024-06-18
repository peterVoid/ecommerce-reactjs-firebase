import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";
import { useState } from "react";
import { useStoreStore } from "../../lib/useUserStore";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    if (!email || !password) {
      return toast.warn("Isi semuanya dong ganteng/cantik");
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      toast.warn(error.code);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="py-3">
      <h1 className="text-center text-4xl font-bold text-[#00AA5B] ">Abes</h1>
      <div className="flex items-center justify-center mt-36 gap-40">
        <div className="w-[600px]">
          <img
            src="login-bg.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-20 shadow-lg rounded-md">
          <div>
            <p className="text-center font-semibold text-3xl">Masuk Sekarang</p>
            <p className="text-md">
              Belum punya akun Abes?{" "}
              <a href="/register" className="text-[#00AA60] font-medium">
                Register
              </a>
            </p>
          </div>
          <form className="mt-5" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="border rounded-md px-5 py-2"
                placeholder="ex: johndoe@gmail.com"
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="border rounded-md px-5 py-2"
                placeholder="*******"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-5 w-full bg-[#00AA5B] py-4 px-6 rounded-md text-white font-semibold disabled:cursor-not-allowed disabled:bg-green-700"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
