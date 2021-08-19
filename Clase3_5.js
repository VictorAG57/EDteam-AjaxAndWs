const container = document.getElementById("container")
const button = document.getElementById("button")

// CREANDO UNA LIBRERIA
/**
 * Creamos una libreia que nos devuelva una promesa, esa promesa crea una peticion AJAX,
 * como comunmente lo hacemos con const xhr = new XMLHttpRequest y 
 * xhr.open(request.method, request.url, true), para que cada que pidamos una peticion,
 * no tengamos que hacer lo mismo una y otra vez, no seria sostenible, de esta manera con la libreria
 * se estara generando con los parametros.
 * PARTE 2
 * Cuando se resuelva la informacion del servidor, se resuelve la promesa
 * 
 * Esta libreia crea una promesa, que cuandocarge correctamente, resolvera
 * la proemsa devolviendo como valor el XMLHttpRequest
 */
const ajax = request => {
    return new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest
       xhr.open(request.method, request.url, true)
       //PARTE 1
       xhr.addEventListener("load", e => {
           resolve(e.target)
       })
       xhr.send()
    })
}
/**
 * Esta funcion que naturalmente deberia ser de forma asincrona, pero con async
 * la volvemos SINCRONA, lo que hara es que se espere hasta que el servidor devuelva toda 
 * la respuetsa, por eso usamos await, que espera hasta optener toda la respuetsa,
 * funciona de forma SINCRONA.
 * Esta funcion obtiene un hash, apikey y el url, todo traido directamente de la 
 * api de marvel, lo unico que creamos fue el hash, on nuestro codigo de marvel privado y el publico
 * y lo convertimos a MD5. Una vez establecidos esas partes fundamentales, las guardamos dentro
 * de nuestro objeto r, que tendra los parametros que necesita "xhr.open(request.method, request.url, true)",
 * por ello colocamos el metodo, y la url, esta la creamos con todo lo especificado anteriormente.
 * 
 * dentro de response indicamos con await a que espere toda la respuetsa del servidor y llamamos a nuestra libreria
 * y colocamos los parametros (metodo y url), que estan dentro de nuetsra constante r.
 * Una vez ahi validamos si el status de nuetsra operacion esta okey == 200
 * entonces dentro de draw, me convierta a json tod ala informacion, y colocamos .data.results para que solo nos
 * devuela la informacion mas relevante y no toda
 */
/** const draw = data => {}
 * 
 * Una vez echo esto, imprimiremos o dibuharemos todos los datos en pantalla
 * Dentro de nuestra funcion draw, crearemos un forecag, para que cree un div, un h2, y una imagen
 * por cada una de la informacion solicitada.
 * Despues a cada uno de los elementos le asignos lo que ira dentro, por ejemplo el titulo dentro del h2
 * y la imagen, que esta estructurada de acuerdo a la API marvel.
 * Por ultimo introducimo todo esto dentro de nuesto contenedor previamente creado, y intoducimos
 * ese mismo contenedor a  fragment.appendChild(). Para finalizar introdicmos nuestro fragmento a un div
 * creado en html para que se imprima y llamamos a nuestra funcion "showMarvel" al dar click al boton.
 * 
 */
const showMarvel = async () => {
    const hash = "790753cffe87be42aa54db53a49b89cd"
    const apikey = "2c07e1ed3765437398829ea189ba24f0"
    const url = `
    https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${apikey}&hash=${hash}&limit=20&nameStartsWith=iron%20man
    `
    const r = {method: "GET", url: url}
    //Espera a que nuestra respuesta este completa (await)
    const response = await ajax(r)
    switch (response.status){
        case 200:
            console.log(JSON.parse(response.responseText))
            draw(JSON.parse(response.responseText).data.results)
            break
        case 400:
            setText("Eroro de cliente" +  response.status)
            break
        default:
            setText("Erro desconosido" + response.status)
    }
}

const draw = data => {
    // document.createDocumentFragment() inserta todo en un movimineto y no uno por uno
    //De esta manera ahorramos memoria y es mas optimo
    const fragment = document.createDocumentFragment()
    data.forEach(comic => {
        const container2 = document.createElement("div")
        const title = document.createElement("h2")
        const image = document.createElement("img")

        title.textContent = comic.name
        image.src = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`
        container2.appendChild(title)
        container2.appendChild(image)
        fragment.appendChild(container2)
    });
    container.appendChild(fragment)
}

button.addEventListener("click", showMarvel)