function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( res => res.json())
            .then(states => {
                for(state of states){
                    ufSelect.innerHTML += `<option value="${state.id}">${state.nome}`
                }
            })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    
    fetch(url)
        .then( res => res.json())
            .then(cities => {
                
                for(const city of cities){
                    citySelect.innerHTML += `<option value="${city.nome}">${city.nome}`
                }

                citySelect.disabled = false
            })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //add or remove with class js
    itemLi.classList.toggle("selected")
    
    const itemId = event.target.dataset.id
    console.log(itemId)

    const alreadySelected = selectedItems.findIndex(item => {
        return item == itemId //retorna True or False
    })

    if(alreadySelected != -1){ //se o elemento está no array (posicoes 0, 1....){
        const filteredItems = selectedItems.filter(item =>{
            return item != itemId
        })

        selectedItems = filteredItems
    }else{
        selectedItems.push(itemId)
    }

    collectedItems.value = selectedItems
}
