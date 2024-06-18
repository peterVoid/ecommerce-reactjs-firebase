import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db } from "../../lib/firebase";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    if (!username || !email || !password) {
      return toast.warn("Isi semuanya dong ganteng/cantik💕❤️");
    }
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (newUser.user) {
        await setDoc(doc(db, "users", newUser.user.uid), {
          username,
          email,
          password,
          createdAt: Date.now(),
        });
        await setDoc(doc(db, "cart", newUser.user.uid), {
          cart: [],
        });
      }
      toast.success("YEAYY AKUNMU BERHASIL DIBUAT!");
    } catch (error) {
      console.log(error);
      toast.warn("Email sudah terdaftar ya ganteng/cantik!", error.code);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-3">
      <h1 className="text-center text-4xl font-bold text-[#00AA5B] ">Abes</h1>
      <div className="flex items-center justify-center mt-36 gap-40">
        <div className="w-[400px]">
          <img
            src="register-image.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <p className="font-bold text-xl text-center">
            Jual Beli Mudah Hanya di Abes
          </p>
          <p className="text-slate-600 text-center">
            Gabung dan rasakan kemudahan
          </p>
        </div>
        <div className="p-20 shadow-lg rounded-md">
          <div>
            <p className="text-center font-semibold text-3xl">
              Daftar Sekarang
            </p>
            <p className="text-md">
              Sudah punya akun Abes?{" "}
              <a href="/login" className="text-[#00AA60] font-medium">
                Login
              </a>
            </p>
          </div>
          <form className="mt-5" onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <label htmlFor="username">username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="border rounded-md px-5 py-2"
                placeholder="ex: John doe"
              />
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
              className="mt-5 w-full bg-[#00AA5B] py-4 px-6 rounded-md text-white font-semibold disabled:cursor-not-allowed disabled:bg-green-600"
            >
              Daftar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
