const addButton = document.querySelector('.add-button')
const formDiv = document.querySelector('.form-div')
const partnerTable = document.querySelector('.partner-table')
const accessTable = document.querySelectorAll('.access-table')
const editButtons = document.querySelectorAll('.edit-button')
const saveButtons = document.querySelectorAll('.save-button')

console.log(accessTable)
class Member {
    constructor(name, email, subscription, accredited, category) {
        this.name = name
        this.email = email
        this.subscription = subscription
        this.accredited = accredited
        this.category = category
    }
}

const member1 = new Member('Nicolas Arquiel', 'arquiel.nicoolas@gmail.com', 7000, 'No', 'Socio')
const member2 = new Member('Saco Wea', 'saco.nicoolas@gmail.com', 7000, 'No', 'Adherente')
const member3 = new Member('Saco Wea', 'saco.nicoolas@gmail.com', 7000, 'No', 'Cadete')

const partners = [member1, member2, member3]


partners.forEach((partner, index) => {
    const row = partnerTable.insertRow() // Agrega una nueva fila a la tabla

    // Agrega las celdas a la fila
    const nameCell = row.insertCell()
    nameCell.textContent = partner.name

    const emailCell = row.insertCell()
    emailCell.textContent = partner.email

    const subscriptionCell = row.insertCell()
    subscriptionCell.textContent = `$${partner.subscription}`

    const accreditedCell = row.insertCell()
    accreditedCell.textContent = partner.accredited

    const categoryCell = row.insertCell()
    categoryCell.textContent = partner.category

    const actionCell = row.insertCell()

    //Crea el boton de info
    const infoButton = document.createElement('button')
    infoButton.classList.add('info-button')
    infoButton.setAttribute('data-index', index)
    infoButton.innerHTML = `
        <i class="bi bi-info-circle"></i>
    `
    //Crea el boton de editar
    const editButton = document.createElement('button')
    editButton.classList.add('edit-button')
    editButton.setAttribute('data-index', index)
    editButton.innerHTML = `
        <i class="bi bi-pencil-fill"></i>
    `
    //Crea el boton de guardar edicion
    const saveButton = document.createElement('button')
    saveButton.classList.add('save-button','hidden')
    saveButton.setAttribute('data-index', index)
    saveButton.innerHTML = `
        <i class="bi bi-check2"></i>
    `
    //Crea el boton de borrar
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.setAttribute('data-index', index)
    deleteButton.innerHTML = `
        <i class="bi bi-trash-fill"></i>
    `

    actionCell.appendChild(infoButton)
    actionCell.appendChild(editButton)
    actionCell.appendChild(saveButton)
    actionCell.appendChild(deleteButton)

    //Evento click a boton de info
    infoButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')

        //Llamar a la funcion de actualizar tabla
        updateAccessTable(partner.category)
        const partnerInfo = partners[buttonIndex]
        console.log('Información del socio:', partnerInfo)
    })

    //Evento click a boton de edit
    editButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        const partnerInfo = partners[buttonIndex]
        const row = event.currentTarget.closest('tr') // Obtener la fila
        saveButton.classList.toggle('hidden')
        editButton.classList.toggle('hidden')
        deleteButton.classList.toggle('hidden')
        infoButton.classList.toggle('hidden')
        
        // Llamar a la función de edición de la fila
        editRow(row, partnerInfo)
    })

    //Evento click a boton de save
    saveButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        const partnerInfo = partners[buttonIndex]
        const row = event.currentTarget.closest('tr') // Obtener la fila
        saveButton.classList.toggle('hidden')
        editButton.classList.toggle('hidden')
        deleteButton.classList.toggle('hidden')
        infoButton.classList.toggle('hidden')
    
        // Guardar los datos de la fila
        saveRow(row, partnerInfo)
    })

    //Evento click a boton de delete
    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        const partnerInfo = partners[buttonIndex]
        const row = event.currentTarget.closest('tr') // Obtener la fila
    
        // Llamar a la función de eliminación de la fila
        deleteRow(row, partnerInfo)
    })

})

// CREAR BOTON PARA EDITAR, Y OTRO PARA VER LA INFO DE LOS PERMISOS DEL SOCIO
// QUE NO SEA CLICKEAR LA ROW COMPLETA
const updateAccessTable = (category) => {
    switch (category) {
        case 'Socio':
            console.log('es Socio ')
            accessTable[0].classList.toggle('hidden')
            accessTable[1].classList.add('hidden')
            accessTable[2].classList.add('hidden')
            break
        case 'Adherente':
            console.log('es Adherente')
            accessTable[1].classList.toggle('hidden')
            accessTable[0].classList.add('hidden')
            accessTable[2].classList.add('hidden')
            break
        case 'Cadete':
            console.log('es Cadete')
            accessTable[2].classList.toggle('hidden')
            accessTable[0].classList.add('hidden')
            accessTable[1].classList.add('hidden')
            break
        default:
            break
    }

}

const editRow = (row, partnerInfo) => {
    const cells = row.cells

    // Recorrer las celdas y hacerlas editables
    for (let i = 0; i < cells.length - 1; i++) { // Ignorar la última celda de acciones
        const cell = cells[i]
        const cellValue = cell.textContent
        let editableElement

        if (i === 4) { // Categoría
            const select = document.createElement('select')
            const categories = ['Socio', 'Adherente', 'Cadete']
            categories.forEach(category => {
                const option = document.createElement('option')
                option.value = category
                option.textContent = category
                select.appendChild(option)
            })
            select.value = cellValue
            editableElement = select
        } else if (i === 3) { // Acreditada
            const select = document.createElement('select')
            const options = ['Sí', 'No']
            options.forEach(option => {
                const optionElement = document.createElement('option')
                optionElement.value = option
                optionElement.textContent = option
                select.appendChild(optionElement)
            })
            select.value = cellValue === 'Sí' ? 'Sí' : 'No'
            editableElement = select
        } else {
            const input = document.createElement('input')
            input.value = cellValue
            editableElement = input
        }

        cell.textContent = ''
        cell.appendChild(editableElement)
    }
}

const saveRow = (row, partnerInfo) => {
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    // Recorrer los inputs y selects y guardar los datos en las celdas
    inputs.forEach((input, i) => {
        const cell = row.cells[i]
        const inputValue = input.value
        cell.textContent = inputValue
        partnerInfo[Object.keys(partnerInfo)[i]] = inputValue
    })

    selects.forEach((select, i) => {
        const cell = row.cells[i + 3] // Los selects comienzan desde la celda 3 (Categoría)
        const selectValue = select.value
        cell.textContent = selectValue
        partnerInfo[Object.keys(partnerInfo)[i + 3]] = selectValue
    })
}

const deleteRow = (row, partnerInfo) => {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este socio?')
    if (confirmation) {
        const buttonIndex = row.querySelector('.delete-button').getAttribute('data-index')
        partners.splice(buttonIndex, 1) // Eliminar el socio del arreglo
        
        row.remove() // Eliminar la fila de la tabla

        console.log('Socio eliminado:', partnerInfo)
    }
}

const saveData = (row, partnerInfo, input, cellIndex) => {
    const newValue = input.value
    partnerInfo[cellIndex] = newValue // Actualizar el valor en el objeto Member
    row.cells[cellIndex].textContent = newValue // Actualizar el contenido de la celda
    
    // Restaurar el contenido original y eliminar el input
    row.cells[cellIndex].textContent = newValue
    input.remove()
}


addButton.addEventListener('click', () => {
    formDiv.classList.toggle('hidden')
})
