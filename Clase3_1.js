/** Funciones callback
 * callback --> Un callback es una función que puede ser llamado dentro de una función,
 * de manera sincrona.
 * 
 * Proemsas --> El objeto Promise (Promesa) es usado para computaciones asíncronas. Una promesa representa un valor que puede estar disponible ahora, en el futuro, o nunca.
 * Una Promise (promesa en castellano) es un objeto que representa la terminación o el fracaso de una operación asíncrona. Dado que la mayoría de las personas consumen promises ya creadas, esta guía explicará primero cómo consumirlas, y luego cómo crearlas.
 * Esencialmente, una promesa es un objeto devuelto al cuál se adjuntan funciones callback, en lugar de pasar callbacks a una función.
 * 
 * new Promise( - ejecutor - function(resolver, rechazar) { ... } );
 */ 

 const container = document.getElementById("contaier")
 const button = document.getElementById("button")
 const button2 = document.getElementById("button2")

 function getPosts() {
    return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
        req.open('GET', 'https://jsonplaceholder.typicode.com/posts');

        req.onload = function() {
          if (req.status == 200) {
            resolve(JSON.parse(req.response));
          }
          else {
            reject();
          }
        };

        req.send();
    })
}
getPosts().then(r =>{
    console.log(r);
  }).catch(() => {
    console.log('Algo salió mal');
  });

button.addEventListener("click",() => {
    var getData = () =>{
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'archivo.json');
            xhr.onload = function() {
                if (xhr.status == 200) {
                  resolve(JSON.parse(xhr.response));
                }
                else {
                  reject();
                }
            }//xhr.onload
            xhr.send();
        })//Promise
    }//getData
    getData().then((data) => console.log(data));
    getData().catch( () => console.log("La data no se resivio correctamente"));
})//button

button2.addEventListener("click",() => {
    var getData = () =>{
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'archivo.json');
            xhr.onload = function() {
                if (xhr.status == 200) {
                  resolve(JSON.parse(xhr.response));
                }
                else {
                  reject(new Error("No existen datos"));
                }
            }//xhr.onload
            xhr.send();
        })//Promise
    }//getData
    /** OTRA MANDERA USADO sync y await
     * Usamos async y await
     * 
     * ------- Este es un metodo ---------- 
     async function funcionConAsync (){
        const datos = await getData();
        console.log(datos)
     }
     funcionConAsync();
     async function funcionConAsyncErr (){
        const datos = await console.log("Tenemos un error");
        console.log(datos)
    }
    funcionConAsyncErr();
     * 
     */
    async function funcionConAsync (){
        try{//await SOLO GUARDA EL VALOR
            const datos = await getData();
            console.log(datos)
        }
        catch(err){
            console.log(err)
        } 
    }
    funcionConAsync();
    //getData().catch( () => console.log("La data no se resivio correctamente"));
})//button

