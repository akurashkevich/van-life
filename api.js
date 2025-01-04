import {initializeApp} from "firebase/app"
import {collection, doc, getDoc, getDocs, getFirestore, query, where,} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAdfw32kzK-d_Y3AQRcpyUL3TQng8ofXBg",
    authDomain: "vanlife-3c7ee.firebaseapp.com",
    projectId: "vanlife-3c7ee",
    storageBucket: "vanlife-3c7ee.firebasestorage.app",
    messagingSenderId: "3357069326",
    appId: "1:3357069326:web:d51d6fa617c6f242026c5f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
}

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}