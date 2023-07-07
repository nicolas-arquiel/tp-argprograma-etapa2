const addButton = document.querySelector('.add-button')
const formDiv = document.querySelector('.form-div')
const partnerTable = document.querySelector('.partner-table')
const accessTable = document.querySelectorAll('.access-table')
const editButtons = document.querySelectorAll('.edit-button')
const saveButtons = document.querySelectorAll('.save-button')
const closeButton= document.querySelector('.close-button')
const form = document.querySelector('.custom-form')

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
const member3 = new Member('Saco Weaita', 'saco@gmail.com', 7000, 'No', 'Cadete')

let partners = [member1, member2, member3]

loadMembersFromLocalStorage()


function loadMembersFromLocalStorage() {
    const storedMembers = localStorage.getItem('members')
    if (storedMembers) {
        partners = JSON.parse(storedMembers)
    } else if (partners.length === 0) {
        partners = [member1, member2, member3]
        saveMembersToLocalStorage()
    }
}


function saveMembersToLocalStorage() {
    if (partners.length > 0) {
        localStorage.setItem('members', JSON.stringify(partners))
    } else {
        localStorage.removeItem('members')
    }
}


function generateTableRow(partner, index) {
    const row = partnerTable.insertRow()

    const nameCell = row.insertCell()
    nameCell.textContent = partner.name

    const emailCell = row.insertCell()
    emailCell.textContent = partner.email

    const subscriptionCell = row.insertCell()
    subscriptionCell.textContent = `${partner.subscription}`

    const accreditedCell = row.insertCell()
    accreditedCell.textContent = partner.accredited

    const categoryCell = row.insertCell()
    categoryCell.textContent = partner.category

    const actionCell = row.insertCell()

    //Crear botones (info,edit,save,delete)
    const infoButton = document.createElement('button')
    infoButton.classList.add('info-button')
    infoButton.setAttribute('data-index', index)
    infoButton.innerHTML = `
        <i class="bi bi-info-circle"></i>
    `
    actionCell.appendChild(infoButton)

    const editButton = document.createElement('button')
    editButton.classList.add('edit-button')
    editButton.setAttribute('data-index', index)
    editButton.innerHTML = `
        <i class="bi bi-pencil-fill"></i>
    `
    actionCell.appendChild(editButton)

    const saveButton = document.createElement('button')
    saveButton.classList.add('save-button', 'hidden')
    saveButton.setAttribute('data-index', index)
    saveButton.innerHTML = `
        <i class="bi bi-check2"></i>
    `
    actionCell.appendChild(saveButton)

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('delete-button')
    deleteButton.setAttribute('data-index', index)
    deleteButton.innerHTML = `
        <i class="bi bi-trash-fill"></i>
    `
    actionCell.appendChild(deleteButton)

    //Agregar eventos a los botones
    infoButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        updateAccessTable(partners[buttonIndex].category)
        console.log('Información del socio:', partners[buttonIndex])
    })

    editButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        const partnerInfo = partners[buttonIndex]
        const row = event.currentTarget.closest('tr')

        // Guardar la referencia al miembro en una variable
        let currentMember = partnerInfo

        saveButton.classList.toggle('hidden')
        editButton.classList.toggle('hidden')
        deleteButton.classList.toggle('hidden')
        infoButton.classList.toggle('hidden')

        // Llamar a la función de edición de la fila
        editRow(row, currentMember)
    })

    // Cargar los miembros desde el localStorage al inicio
    loadMembersFromLocalStorage()

    saveButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        const partnerInfo = partners[buttonIndex]
        const row = event.currentTarget.closest('tr')
        saveButton.classList.toggle('hidden')
        editButton.classList.toggle('hidden')
        deleteButton.classList.toggle('hidden')
        infoButton.classList.toggle('hidden')

        // Guardar los datos de la fila
        saveRow(row, partnerInfo)
    })

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const buttonIndex = event.currentTarget.getAttribute('data-index')
        const partnerInfo = partners[buttonIndex]
        const row = event.currentTarget.closest('tr')

        // Llamar a la función de eliminación de la fila
        deleteRow(row, partnerInfo)
    })
}

function updateAccessTable(category) {
    switch (category) {
        case 'Socio':
            accessTable[0].classList.toggle('hidden')
            accessTable[1].classList.add('hidden')
            accessTable[2].classList.add('hidden')
            break
        case 'Adherente':
            accessTable[1].classList.toggle('hidden')
            accessTable[0].classList.add('hidden')
            accessTable[2].classList.add('hidden')
            break
        case 'Cadete':
            accessTable[2].classList.toggle('hidden')
            accessTable[0].classList.add('hidden')
            accessTable[1].classList.add('hidden')
            break
        default:
            break
    }
}

function editRow(row, partnerInfo) {
    const cells = row.cells

    for (let i = 0; i < cells.length - 1; i++) {
        const cell = cells[i]
        // Obtener el valor actualizado del miembro
        const cellValue = partnerInfo[Object.keys(partnerInfo)[i]]

        let editableElement

        if (i === 4) {
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
        } else if (i === 3) {
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
        } else if (i === 2) {
            const input = document.createElement('input')
            input.setAttribute('type', 'number')
            input.value = cellValue
            editableElement = input
        } else  {
            const input = document.createElement('input')
            input.value = cellValue
            editableElement = input 
        }

        cell.textContent = ''
        cell.appendChild(editableElement)
    }
}

function saveRow(row, partnerInfo) {
    const inputs = row.querySelectorAll('input')
    const selects = row.querySelectorAll('select')

    inputs.forEach((input, i) => {
        const cell = row.cells[i]
        const inputValue = input.value
        cell.textContent = inputValue
        partnerInfo[Object.keys(partnerInfo)[i]] = inputValue
        
    })

    selects.forEach((select, i) => {
        const cell = row.cells[i + 3]
        const selectValue = select.value
        cell.textContent = selectValue
        partnerInfo[Object.keys(partnerInfo)[i + 3]] = selectValue
    })

    // Actualizar el miembro en el array 'partners'
    partners.splice(partners.indexOf(partnerInfo), 1, partnerInfo)
    // Guardar los miembros actualizados en local
    saveMembersToLocalStorage()
}


function deleteRow(row, partnerInfo) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este socio?')
    if (confirmation) {
        const buttonIndex = row.querySelector('.delete-button').getAttribute('data-index')
        partners.splice(buttonIndex, 1)

        row.remove()

        console.log('Socio eliminado:', partnerInfo)
        saveMembersToLocalStorage()
    }
}

addButton.addEventListener('click', () => {
    formDiv.classList.toggle('hidden')
})

closeButton.addEventListener('click', ()=>{
    formDiv.classList.toggle('hidden')
})


form.addEventListener('submit', (event) => {
    event.preventDefault()
    const nameInput = form.querySelector('input[type="text"]')
    const emailInput = form.querySelector('input[type="email"]')
    const subscriptionInput = form.querySelector('input[type="number"]')
    const categorySelect = form.querySelector('select')

    const name = nameInput.value
    const email = emailInput.value
    const category = categorySelect.value
    const subscription = subscriptionInput.value

    // Validar campos vacíos
    if (name.trim() === '' || email.trim() === '' || subscription.trim() === '' || category.trim() === '') {
        alert('Por favor, complete todos los campos del formulario.')
        return
    }

    const newMember = new Member(name, email, subscription, 'Si', category)

    partners.push(newMember)
    generateTableRow(newMember, partners.length - 1)

    form.reset()
    formDiv.classList.add('hidden')
    saveMembersToLocalStorage()
})


partners.forEach((partner, index) => {
    generateTableRow(partner, index)
})