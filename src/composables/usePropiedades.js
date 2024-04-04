import { computed, ref } from "vue"
import { collection, doc, deleteDoc } from "firebase/firestore"
import { ref as storageRef, deleteObject } from "firebase/storage"
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire"

export default function usePropiedades() {
    const piscina = ref(false)

    const storage = useFirebaseStorage()

    // Obtiene la bbdd de Firestore
    const db = useFirestore()
    // Obtiene las colección llamada 'propiedades' de la bbdd anteriormete obtenida
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))

    async function deleteItem(id, urlImage) {
        if(confirm('¿Deseas eliminar esta propiedad')) {
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)
            
            await Promise.all([
                await deleteDoc(docRef),
                await deleteObject(imageRef)
            ])
        }   
    }

    const propiedadesFiltradas = computed(() => {
        return piscina.value ? 
            propiedadesCollection.value.filter(propiedad => propiedad.piscina) : 
            propiedadesCollection.value
    })

    return {
        propiedadesCollection,
        propiedadesFiltradas,
        piscina,
        deleteItem
    }
}