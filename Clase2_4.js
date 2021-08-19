

const contendor = document.getElementById('myContent') // my div
const contendor2 = document.getElementById('myContent2')
const buttonLoad = document.getElementById("btnLoadJason") // boton JSON
//const buttonLoad = document.getElementById('buttonLoad')
const buttonLoad2 = document.getElementById('btnLoadJason2')

// al dar click sobre este botón 
buttonLoad.addEventListener('click', evt => {
    const xhttp = new XMLHttpRequest()
    /**
     * El evento onreadystatechange se dispara cada vez que cambia el 
     * readyState. La propiedad readyState tiene el estatus de 
     * XMLHttpRequest. En onreadystatechange, se especifica lo que 
     * sucederá cuando la respuesta del servidor está lista para ser 
     * procesado. Cuando readyState es 4 y el estado es 200
     */
    xhttp.open("GET", "archivo.txt", true)
    /**
     * aqui verificaremos que si sicede un cambio entonces pregunte (if)
     * si xhttp su estado es 4, recordemos que existes varios estados, del 0 al 4
     * y el 4 es cuando la opreacion de xhttp este terminada y su estatos sea OK == 200
     * entonces me agregue atravez de mi contenedor y innerHTML la respuetsa
     * de mi evento xhttp.
     */
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            contendor.innerHTML = this.responseText
            // o tambien se puede contendor.innerHTML = e.target.responseText
            // si la funcion tiene como parametro (e)
        }
    }
    xhttp.send()//enviamos el objeto XMLHttpRequest = xhttp
    /** .responseText :
     *  devuelve un DOMString que contiene la  respuesta a la consulta
     *  como un texto o null si la consulta  no tuvo exito o  aun no ha 
     *  sido completada. la propiedad responseText  tendra una respuesta
     *  parcial como retorno aunque la consulta no haya sido  completada.
     */
    
})   

// ---------------------------------------------------------
//Convertiremos los datos a tipo JSON

buttonLoad2.addEventListener('click', () => {
    const xhttp = new XMLHttpRequest()
    
    xhttp.open("GET", "archivo.json", true)
   
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            //contendor2.innerHTML = this.responseText
            let datos = JSON.parse(this.responseText)
            console.log(datos)
            contendor2.innerHTML = ""
            for(let item of datos){
                contendor2.innerHTML +=
                `
                <tr>
                   <td>${item.nombre}</td>
                   <td>${item.escuela}</td>
                </tr>
                `
            }
        }
    }
    xhttp.send()
})  

