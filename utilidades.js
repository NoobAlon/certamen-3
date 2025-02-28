const limpiar = () => {
    document.querySelector('form').reset()
    document.querySelectorAll('.form-control').forEach(item => {
        item.classList.remove('is-invalid')
        item.classList.remove('is-valid')
        document.getElementById('e-' + item.name).innerHTML = ''
    })
    
    document.getElementById('run').readOnly = false
    document.getElementById('btnGuardar').value = 'Guardar'
}


const soloNumeros = (evt) => {
    if (evt.keyCode >= 48 && evt.keyCode <= 57)
        return true
    return false
}
const verificar = (id) => {
    
    const input = document.getElementById(id)
    
    const div = document.getElementById('e-' + id)
    input.classList.remove('is-invalid')
     
    if (input.value.trim() == '') {
        
        input.classList.add('is-invalid')
        
        div.innerHTML = '<span class="badge bg-danger">El campo es obligatorio</span>'
    }
    else {
        input.classList.add('is-valid')
        div.innerHTML = ''
        if (id == 'campeonatos') {
            if (input.value < 500 > 3 ) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">campeonatos debe ser sobre 3 ganados</span>'
            }
        }
        if (id == 'fechaDebut') {
            const fecha = new Date(input.value)
            const hoy = new Date()
            if (fecha > hoy) {
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">La fecha ingresa debe ser inferior a la de hoy</span>'
            }
        }
        if (id == 'run') {
            
            if (!validaRun(input.value) /*|| input.value.length < 9*/) { //length cuenta la cantidad de letras
                input.classList.add('is-invalid')
                div.innerHTML = '<span class="badge bg-danger">El run no es válido</span>'
            }
        }
        
    }
}


const validaRun = (run) => {
    const Fn = {
        // Valida el rut con su cadena completa "XXXXXXXX-X" 17744273-9
        validaRut: function (rutCompleto) {
            rutCompleto = rutCompleto.replace("‐", "-")
            if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
                return false
            const tmp = rutCompleto.split('-') 
            const digv = tmp[1] 
            const rut = tmp[0]
            if (digv == 'K') digv = 'k'

            return (Fn.dv(rut) == digv)
        },
        dv: function (T) {
            let M = 0, S = 1
            for (; T; T = Math.floor(T / 10))
                S = (S + T % 10 * (9 - M++ % 6)) % 11
            return S ? S - 1 : 'k'
        }
    }
    return Fn.validaRut(run)
}
  

