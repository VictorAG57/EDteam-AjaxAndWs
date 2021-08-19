//
let websocket = null
//Esta funcion "settext" me permitira enviar mensaje, ya contiene
//la estructura html. Data es el parametro
const setText = data => {
  const msg = `<div>${data}</div>`
  //Aqui en nuestro espacio de chat, donde se veran los mensajes, se insertaran los mensajes
  //a travez de insertAdjacentHTML, que funciona algo parecido a innerHTML
  //En este caso solo indicas donde lo quieres insertar, y el mensaje
  chat.insertAdjacentHTML('beforeend', msg)
}

/** Cuando de click en conectar
 * Registras cada uno de los eventos
 * 
 * El objeto WebSocket provee la API para la creación y administración de una conexión WebSocket a un servidor, así como también para enviar y recibir datos en la conexión.
 * El constructor de WebSocket acepta un parámetro requerido y otro opcional.
 * "websocket = new WebSocket('wss://echo.websocket.org')", el link es de websocket.org
 */
btnConnect.addEventListener('click', e => {
  //ws: si es http - wss: si es https
  websocket = new WebSocket('wss://echo.websocket.org')
  //Cuando se CONECTE, que digite conectado, y una vez conecado, llamamos la función que 
  //se encarga de enviar el mensaje
  websocket.onopen = () => setText('Conectado')
  //Cuando se DESCONECTE, que digite desconectado y una vez desconectado, llamamos la función que 
  //se encarga de enviar el mensaje
  websocket.onclose = () => setText('Desconectado')
  websocket.onerror = e => setText(e)
  //Lo que yo resiva, lo colocaremos dentro del chat
  websocket.onmessage = e => {
    setText(e.data)
  }
})

//Cuando se de click en desconectar, se desconecte la línea
btnDisconnect.addEventListener('click', e => {
  websocket.onclose()
})
//Boton que nos permite enviar el mesaje a tarvez del evento send
//Lo que enviara, sera lo escrito en la caja de texto "textMsg", y su valor.
btnSend.addEventListener('click', e => {
  websocket.send(textMsg.value)
})
