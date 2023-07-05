const socios = []


const addButton = document.querySelector('.add-button')
const form = document.querySelector('.custom-form')

addButton.addEventListener('click',()=>{
    form.classList.contains('hidden') ?
    form.classList.remove('hidden') : 
    form.classList.add('hidden')
})
