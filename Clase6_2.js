/**
 * Proceso
 
 1 --> Creación de variables que permiten la conexión al websocket. Se declaran con "let" y no con "const" 
     porque no podría cambiar el valor NULL a un objeto.

 2 --> Creación de función que permita guardar mensajes dentro del primer div.

 3 --> Creación de función del botón de login, al clicar se creará un objeto usuario que hará la petición 
      al server.

 4 --> Preparación y estructuración de la lógica del login > creación de objeto JSON que tendrá la información 
     del usuario y la clave.

 5 --> Creación de headers para el fetch.

 6 --> Validación de la respuesta, el servidor responderá con un código de estado: 200 o 401.
 */

 //Va a ser la variable que me permita crear el objeto "webSocket"

 const btnLogin = document.getElementById("btnLogin")
 const btnSendMessage = document.getElementById("btnSendMessage")

 //1
 let ws = null, theChart = null
 //Array de los valore spara graficar
 const dataChart = [5, 15, 12]

 //2
const setSystemMessage = data =>{
    systemMessage.textContent = data
}

const login = async () => {
    const user = {
        name = usrName.value,
        password: password.value
    }
    const header = new Headers()
    header.append("content-type", "application/json")

    const options = {
        method: "POST", 
        headers:header, 
        body: JSON.stringify(user)
    }

    const response = await fetch("/login", options )
    switch (response.status){
        case 200:
            data = await response.json()
            connectWS(data)
            //Cuando se conecte correctamente, cargara la grafica
            loadChart()
        break
        case 401:
            setSystemMessage("Usuario o contraseña no encontrado")
        break
        default:
            setSystemMessage("Estado no esperado: " + response.status)
    }
}

btnLogin.addEventListener("click", e => {
    e.preventDefault()
    login()
})

/**
 * Función de conexión
   En la misma es importante identificar la ubicación del Websocket donde se realizará la conexión.
   Datos a enviar al websocket

   --> Token
   --> Nombre de usuario

   Nota: La conexión a Websocket es una conexión de tipo GET, y la información adicional que se 
   desee enviar por URL es posible a través de parámetros haciendo uso del signo "?" siguiendo un 
   formato ?clave=valor.
 */
//Enviamos información adicional con los parametros, y los parametros se indican con el signo de "?" y con "&", agrego un parametro mas, todo en URL
//Se usa un "TOKEN" para validar quien pueda entrar, y solo quienes tengan el token puede entrar al WS
//Muchas de las cosas como el token, son generadas por el servidor
//También es necesario el nombre, porque en el servidor lo pide, y es necesario para indicar
//quien mando el mensaje

/**
 * Proceso
 
   Registrar error: Si existe un error que informe.
   Registrar mensaje: Si existe un mensaje que lo informe y muestre.
   Registrar envío de mensaje: Si el usuario envía un mensaje, que lo registre (botón de enviar).
   Validación del mensaje: Validar que el mensaje no esté vacío.
   Nota: Websocket se declara de manera global debido a que será necesario utilizarla en otras funciones.  
 */

const connectWS = data => {
    //TOKEN ES LA VALIDACIÓN
    ws = new WebSocket(`ws://localhost:9999/ws?uname=${usrName.value}&token=${data.token}`)
    //formato ?clave=valor
    //Una vez se conecte que mande este mensaje

    // --> EL PARAMETRO "e" ES COMO EL WEBSOCKET

    ws.onopen= e =>{
        setSystemMessage("Conectado correctamente")
    }
    //Si ocurre un error que lo informe
    ws.onerror= e =>{
        setSystemMessage(e)
    }
    //Cuando resiva un mensaje
    ws.onmessage= e =>{
        //"e" es el WS, y "data" es la que contiene la información
        const data = JSON.parse(e.data)
        switch (data.type) {
            case 'message':
                content.insertAdjacentHTML('beforeend', `<div>De: ${data.data_response.name}, Mensaje: ${data.data_response.message}</div>`)
                break
            case 'sale':
                //Se suma lo que alla en la gráfica normal, mas lo que se acaba de vender 
                dataChart[data.data_sale.product] += data.data_sale.quantity
                //Con este se actualiza la gráfica
                theChart.update()
                break
            case 'pong':
                console.log('sigo vivo')
                break
            default:
                setSystemMessage('Recibí un tipo de mensaje desconocido')
        }
    }
    //Esto sirve para evitar que se pierda la conexion con la tecnica
    //"ping pong", cada minuto se realiza esto para garantizar qu eno se pierda la connexión
    //Funciona todo esto atrevez del servidor, el servidor lo convierte a pong
    //Es algo que ejecuta el servidor, preguntando y respondiendo, asi esta activo el WS y no muere
    setInterval(() => {
        ws.send(JSON.stringify({type : 'ping'}))
    }, 60000)
}

btnSendMessage.addEventListener("click", e => {
    e.preventDefault()

    if(txtmsg.length >= 1 ){
    }
    const data = {
        type : 'message',
        message : txtmsg.value
    }
    //Enviamos la informacion tipo JSON
    ws.send(JSON.stringify(data))
})

//Función para incrementar o actualizar la grafica cada que se venda algo
//parseInt convierte a entero las cantidades, ya que llegan como string

btnSale.addEventListener('click', e => {
    e.preventDefault()
    // TODO validar que la cantidad sea mayor a cero
    const data = {
        type : 'sale',
        product : parseInt(product.value, 10),
        quantity : parseInt(quantity.value, 10)
    }
    //Lo convierte a 
    ws.send(JSON.stringify(data))
})

//Función para cargar gráfica
const loadChart = () => {
    const ctx = myChart.getContext('2d');
    myChart.width = 400
    myChart.height = 400
    theChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Zapatos", "Camisas", "Billeteras"],
            datasets: [{
                label: 'Sales',
                data: dataChart,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
} 