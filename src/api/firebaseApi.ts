import { firestore } from "../firebase";
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc  } from "firebase/firestore";
import { Data } from "src/type";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject  } from "firebase/storage";

export const getRequest = async () => {
    try {
        let data: Data[] = [];
        const querySnapshot = await getDocs(collection(firestore, "Documents"));
        querySnapshot.forEach((doc) => {
            data = [...data, ...doc.data().data]
        });
        return data
    } catch (e: any) {
        throw new Error(e)
    }   
}


export const deleteRequest = async (id: keyof Data) => {
    try {
        const docRef = doc(firestore, "Documents", "documents1")
        await deleteDoc(docRef);
    } catch (e: any) {
        throw new Error(e)
    }   
}