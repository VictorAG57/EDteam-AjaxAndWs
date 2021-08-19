const STATUS_OK = 200
const STATUS_CREATED = 201
const STATUS_NOT_FOUND = 404

const container = document.getElementById("container")
const button = document.getElementById("button")

const hash = "790753cffe87be42aa54db53a49b89cd"
const apikey = "2c07e1ed3765437398829ea189ba24f0"
const url = `
https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apikey}&hash=${hash}&limit=20&nameStartsWith=iron%20man
`
button.addEventListener("click", () =>{
    loadComics()
})

const loadComics = async () => {
     //con axios.get() hacemos la peticion de la data, el parametro es una direccion url
    axios.get(url)
    const response = await axios.get(url)
    switch (response.status){
      case STATUS_OK:
        draw(responde.data.data.results)
        break
      case STATUS_NOT_FOUND:
        console.log('No se encontró información')
        break
    }
  }