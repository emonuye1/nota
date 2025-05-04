// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, serverTimestamp, orderBy, query } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCugcz9mTLRBM18LBO0VCnOFkrA0mv1eU4",
  authDomain: "nota-1d8c3.firebaseapp.com",
  projectId: "nota-1d8c3",
  storageBucket: "nota-1d8c3.firebasestorage.app",
  messagingSenderId: "712424132553",
  appId: "1:712424132553:web:70b9a8e7931a5c206da218",
  measurementId: "G-7D9TDZZLFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Fungsi untuk menyimpan nota
export async function saveInvoiceToFirebase(invoiceData) {
  try {
    const docRef = await addDoc(collection(db, "invoices"), {
      ...invoiceData,
      timestamp: serverTimestamp()
    });
    console.log("Nota disimpan dengan ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error menyimpan nota: ", error);
    throw error;
  }
}

// Fungsi untuk mengambil daftar nota
export async function loadInvoicesFromFirebase() {
  try {
    const q = query(collection(db, "invoices"), orderBy("timestamp", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error mengambil nota: ", error);
    throw error;
  }

// Fungsi untuk melihat detail nota
export async function viewInvoiceFromFirebase(docId) {
  try {
    const docRef = doc(db, "invoices", docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error("Nota tidak ditemukan");
    }
  } catch (error) {
    console.error("Error mengambil nota: ", error);
    throw error;
  }
}