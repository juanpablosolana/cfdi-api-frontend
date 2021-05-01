import render from './render.js'

const api = 'https://cfdi-json.herokuapp.com/api/v1'

 async function getApi() {
  await fetch(api)
  .then(response =>response.json())
  .then(data=>{render(data)})
  .catch(err=>{console.log(err)})
}

  const searchBtn = window['search-form']
  searchBtn.addEventListener('submit', async function (event) {
  event.preventDefault()
  const formData = new FormData(this)
  const folio = formData.get('search')
  searchBtn.reset()
  if(folio===''){
    const cfdi = await filterByFolio(folio)
    render(cfdi)
  }else{
    let newFolio=folio.substr(67,36)
    newFolio=newFolio.replace("'", "-")
    newFolio=newFolio.replace("'", "-")
    newFolio=newFolio.replace("'", "-")
    newFolio=newFolio.replace("'", "-")
    const cfdi = await filterByFolio(newFolio)
    cfdi.length === 0 ? alert('CFDI no encontrado') : render(cfdi)
  }
})

async function filterByFolio(folio) {
  const response = await fetch(api)
  const datos = await response.json()
  return datos.filter((cfdi)=>{
    return cfdi.timbreFiscal.uuid.includes(folio)
  })
}

export default getApi()
