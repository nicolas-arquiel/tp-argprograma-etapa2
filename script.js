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
    const infoButton = document.createElement('button')
    infoButton.classList.add('info-button')
    infoButton.setAttribute('data-index', index)
    infoButton.innerHTML = `
      <i class="bi bi-info-circle"></i>
    `
    actionCell.appendChild(infoButton)
  
    infoButton.addEventListener('click', (event) => {
      event.stopPropagation() // Evitar la propagación del evento al hacer clic en el botón
      const buttonIndex = event.currentTarget.getAttribute('data-index')
      updateAccessTable(partner.category)
      const partnerInfo = partners[buttonIndex]
      console.log('Información del socio:', partnerInfo)
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


addButton.addEventListener('click', () => {
    formDiv.classList.toggle('hidden')
})
