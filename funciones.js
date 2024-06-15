import { getData, remove, save, selectOne } from "./firestore.js"


document.getElementById('btnGuardar').addEventListener('click', () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const jugador = {
                run: document.getElementById('run').value,
                nom: document.getElementById('nombre').value.trim(),
                apo: document.getElementById('apodo').value.trim(),
                fecha: document.getElementById('fechaDebut').value,
                camiseta: document.getElementById('numerocamiseta').value,
                goles: document.getElementById('goles').value,
                campeonatos: document.getElementById('campeonatos').value
            }
            save(jugador)
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    
    getData((datos) => {
        let tabla = ''
        datos.forEach((doc) => {
            
            const item = doc.data()

            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.apo}</td>
            <td>${item.fecha}</td>
            <td>${item.camiseta}</td>
            <td>${item.goles}</td>
            <td>${item.campeonatos}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        
        document.querySelectorAll('.btn-danger').forEach(btn => {
            
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro que desea eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    
                    if (result.isConfirmed) {
                        
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado!",
                            icon: "success"
                        })
                    }
                })
            })
        })
        
        document.querySelectorAll('.btn-warning').forEach(btn =>{
            
            btn.addEventListener('click',async() =>{
                
                const jugadores = await selectOne(btn.id)
                
                const e = jugadores.data()
                
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nom
                document.getElementById('apodo').value = e.apo
                document.getElementById('fechaDebut').value = e.fecha
                document.getElementById('numerocamiseta').value = e.camiseta
                document.getElementById('goles').value = e.goles
                document.getElementById('campeonatos').value = e.campeonatos
                
                document.getElementById('btnGuardar').value = 'Editar'
                
                document.getElementById('run').readOnly = true
            })
        })
    })
})

