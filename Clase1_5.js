
const contendor = document.getElementById('myContent')
const buttonLoad = document.getElementById('buttonLoad')


// al dar click sobre este botón  
buttonLoad.addEventListener('click', evt => {
    //el objeto XMLHttpRequest() es el que me permite cargar solo
    //un trozo de la página y no todo, por ello lo tenemos que mandar a llamar.
    const xhr = new XMLHttpRequest()
    console.log(xhr.readyState)//Nos permite saber en que estado se encuentras nuestra petición
//Es muy util para cuando pedimos infotmación del serviodr y tarda en llegar, y mediante
// .readyState, nos permite saber en que parte del proceso se encuentra (1,2,3,4,5)

    //con open indicamos que usaremos el método "GET", que nos permitira
    //indicar que haremos, en este caso "OBTENER = GET" información.
    // GET = metodo - a donde va la petición = url

    //le que digo con este código es que mediante el objeto XMLHttpRequest()
    //usemos el atributo open que me permitira recargar una parte de la página
    //gracias a XMLHttpRequest(), pero indico el método, en este caso deseo
    //obtener informacion, y la url, es de donde obtendra está información.
    xhr.open('GET', 'data.html', true) //open (método, url, asíncrona)

    // Qué se debe hacer con la data?
    // El evento LOAD se dispara cuando un recurso y sus recursos dependientes han terminado de cargar.
    // Le registro un addEventListener a xhr
    xhr.addEventListener('load', e => {
        console.log(e.target)
        //.target se refiere al elemento en el cual nace el evento.
        // con contendor.innerHTML indiacmos que agregues el codigo html a
        // mi contendor y e.target es el objeto completo.
        // A mi contendor agreguele via html lo que resiva de texto en la respuesta de mi sevdor.
        contendor.innerHTML = e.target.responseText
        //En este caso la data es la respuesta del servidor, es decir
        //lo que solisitamos al sevidor = .responseText
    })
    // Realice la petición = .send()
    xhr.send()
})

/** CONCEPTOS
 * 
 * XMLHttpRequest() = Proporciona una forma fácil de obtener 
 * información de una URL sin tener que recargar la página completa. 
 * Una página web puede actualizar sólo una parte de la página sin 
 * interrumpir lo que el usuario está haciendo. XMLHttpRequest es 
 * ampliamente usado en la programación AJAX.
 * En si nos permite recargar solo una parte de la página para
 * que sea más seficiente, este nos brinda :
    - Actualizar una página web sin recargar la página.
    - Solicitar información desde un servidor - después de que la página ha cargado.
    - Recibir información desde un servidor - después de que la página ha cargado.
    - Enviar información a un servidor - en el background.
 * 
 * OPEN = 
 * Con open le digo a donde voy a hacer la petición y con que método.
 * A donde voy a hacer la petición puede ser:
 * 1. la url completa
 * 2. la url absoluta
 * 3. la url relativa
 * La relativa sería solo el / ignorando el dominio: http://midominio.com
 * Si tuviera que hacer la petición a otro dominio, si tendría que poner el dominio completo
 * El tercer parámetro: Quiero hacer la petición asíncrona o no (siempre va a ser true, porque no tiene sentido una petición que no sea asíncrona). 
 * 
 *  .responseText = devuelve un DOMString que contiene la  
 * respuesta a la consulta como un texto o null si la consulta  
 * no tuvo exito o  aun no ha sido completada. la propiedad 
 * responseText  tendra una respuesta parcial como retorno 
 * aunque la consulta no haya sido  completada.
 * Es la respuesta el servidor.
 * 
 */