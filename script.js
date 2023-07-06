const addButton = document.querySelector('.add-button')
const formDiv = document.querySelector('.form-div')
const partnerTable = document.querySelector('.partner-table')
const accessTable = document.querySelector('.access-table')

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


partners.forEach(partner => {
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
    actionCell.innerHTML = `
    <i class="bi bi-pencil-fill"></i>
    <i class="bi bi-trash-fill"></i> `

    row.addEventListener('click', () => {
        console.log('Fila clickeada:', partner.name)
        updateAccessTable(partner.category)
    })
})

const updateAccessTable = (category) => {
    switch (category) {
        case 'Socio':
            console.log('es socio')
            break
        case 'Adherente':
            console.log('es Adherente')
            break
        case 'Cadete':
            console.log('es Cadete')
            break
        default:
            break
    }
}

addButton.addEventListener('click', () => {
    formDiv.classList.contains('hidden') ?
        formDiv.classList.remove('hidden') :
        formDiv.classList.add('hidden')
})
