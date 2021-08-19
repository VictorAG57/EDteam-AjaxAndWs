let websocket = null
//Funcion creada para indicar si esta o no conectado
const setText = data => {
  const msg = `<div>${data}</div>`
  chat.insertAdjacentHTML('beforeend', msg)
}
//Función creada para enviar os mensajes
const setMessage = data =>{
	const msg = `<div><span>${data.name}</span>: <span>${data.message}</span></div>`
	chat.insertAdjacentHTML('beforeend', msg)
}

btnConnect.addEventListener('click', e => {

  //ws: si es http - wss: si es https
  websocket = new WebSocket('wss://echo.websocket.org')

  websocket.onopen = () => setText('Conectado')
  websocket.onclose = () => setText('Desconectado')
  websocket.onerror = e => setText(e)

  //Esta función del mensaje, convierte la informacion a JSON
  websocket.onmessage = e => {
	const msg = JSON.parse(e.data)
    setMessage(msg)
  }
})

btnDisconnect.addEventListener('click', e => {
  websocket.onclose()
})
btnSend.addEventListener('click', e => {
    //Un objeto con los valores de cada caja de texto del formulario
  const msg = {
		name: textName.value,
		message: textMsg.value
	}
    /**
     * El método JSON.stringify() convierte un objeto o valor de JavaScript en una cadena 
     * de texto JSON, opcionalmente reemplaza valores si se indica una función de reemplazo, 
     * o si se especifican las propiedades mediante un array de reemplazo.
     */
    //Lo convertimos a json, para asi simular que tenemos información en formato
    //JSON y devemos convertitla
	websocket.send(JSON.stringify(msg))
})