import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useStoreStore = create((set) => ({
  user: null,
  loading: true,
  changeUser: async (id) => {
    if (!id) return set({ user: null, loading: false });
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        set({ user: null, loading: false });
      } else {
        set({ user: docSnap.data(), loading: false });
      }
    } catch (error) {
      console.log(error);
      return set({ user: null, loading: false });
    }
  },
}));
