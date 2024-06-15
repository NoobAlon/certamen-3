
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs,query, where, getFirestore, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN: 
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyDk5plispEXueVi_-e7oVvSiLWjXDvkiq8",
    authDomain: "proyectoalonso-c3261.firebaseapp.com",
    projectId: "proyectoalonso-c3261",
    storageBucket: "proyectoalonso-c3261.appspot.com",
    messagingSenderId: "866669361487",
    appId: "1:866669361487:web:3613ff8289064a2b302d3a"
  };


const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export const getData = (data) => {
    
    onSnapshot(collection(db, 'Jugadores'), data)
}

export const selectOne = (id) => getDoc(doc(db, 'Jugadores', id))

async function runExists(db, run) {
    const q = query(collection(db, 'Jugadores'), where('run', '==', run));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}
export const save = async (emp) => {
    if (await runExists(db, emp.run)) {
        Swal.fire("El Run Ya Existe");
    }else{
        addDoc(collection(db, 'Jugadores'),
emp);
    }
}

export const remove = async (docId) => {
	const docRef = await doc(db, 'Jugadores', docId);
	deleteDoc(docRef)
		.then(() => {
			Swal.fire("Eliminado Exitosamente");
		})
		.catch((error) => {
            Swal.fire('Error al eliminar: ', error);
			
		});
}



