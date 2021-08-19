const contenedor = document.getElementById("contenedor")
const boton = document.getElementById("btnLoadJason")

boton.addEventListener('click', evt => {
    const xhr = new XMLHttpRequest()
    xhr.open("GET", "archivo.json", true)

    xhr.addEventListener("load", e => {
        //JSON.parse() = lo usamos para convertir el archivo
        // o informacion dada por open a JSON, si es que esta
        // esta en lenguaje JSON
        console.log("Esto es un array de JSON")
        const data = JSON.parse(e.target.responseText)
        console.log(data)
        insertando(data)
    })
    xhr.send()
})
/** SECCION 0 Y 1
 * Creamos una funcion que con base a los datso de mi archivo "archivo.json" que contiene
 * dos objetos, con los siguientes elemtos dentro "titulo", "contenido" y "fecha",
 * y con esta funcion lo que aremos es que me cree un elemento "div", para guardar los objetos json dentro,
 * un "h2" para el titulo, "p" para el contenido y un "span" para la fecha, el forEach
 * lo que hara es que recorrera mi json y por cada arreglo se ejecutara esat funcion, en este caso 2 arreglos.
 * 
 * --> SECCIÓN 0.1
 * Lo que sucede aqui, es que se optimiza muchismo más el código a travez de document.createDocumentFragment(),
 * lo que hace es que guarda todo lo que pase pero sin estar ejecutando varias veces, solo ejecutara 1,
 * que es la ultima, cuando inserta el código, por ello es mucho más ficiente, lo hace atarvez de un fracmento
 * ira introducinedo todo dentro de un fragmento, y en la ultima linea lo inserta a html.
 * 
 * --> SECCIÓN 2
 * Aquí lo que hacemos es insertar los objetos .json dentro de cada seccion que le corresponde
 * a travez de textContent y nuestro parametro, que es element, y cuando lo ejecutamos (la funcion)
 * es el objeto json, y con el punto (.) accedemos a un atributo en especial.
 * 
 * --> SECCIÓN 3
 * Insertamos dentro de nuestro div previamente creado, cada uno de los elemntos
 * atarvez de appendChild().
 * 
 * --> SECCIÓN 4 - DOCUMENTADA YA QUE ES ALTERNATIVA MENOS EFICIENTE
 * Por ultimo insertamos dentro de nuestro html todo este preoceso, para ello, en nuestro
 * contenedor de HTML, llamado contenedor (este fue creado en HTML no en JS), usamos el método
 * appendChilde y dentro del el nuestro container, es decir el div.
 */
//SECCIÓN 0
const insertando = data => {
    contenedor.innerHTML = "" // es buena practica aunque no lo paresca
    // Esto se encarga de limpiar el contenido y así no tengas ambbos objetos de 
    // manera infinita cada que cargues el botón.
    //SECCIÓN 0.1
    // document.createDocumentFragment() inserta todo en un movimineto y no uno por uno
    const fragmento = document.createDocumentFragment() 
    // document.createDocumentFragment() --> son fracmentos html que no se dibuja, y solo hasta que este listo lo inserta
    data.forEach(element => {
        //SECCIÓN 1
        const container = document.createElement("div")
        const title = document.createElement("h2")
        const content = document.createElement("p")
        const date = document.createElement("span")
        //SECCIÓN 2
        title.textContent = element.titulo
        content.textContent = element.contenido
        date.textContent = element.fecha
        //SECCIÓN 3
        container.appendChild(title)
        container.appendChild(content)
        container.appendChild(date)
        //SECCIÓN 4
        //contenedor.appendChild(container)

        //SECCIÓN 4.1
        fragmento.appendChild(container)

    });//Cada ciclo las variables usadas dentro se resetean o mueren, por ello
    //podamos usar const en vez de let.

    //inserta el fragmento al contenedor HTML
    contenedor.appendChild(fragmento)
}