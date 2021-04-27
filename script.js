class Torta{
    constructor(variedad, precio, precioEnvio){
        this.variedad=variedad;
        this.precio=precio;
        this.precioEnvio=precioEnvio;

    }

    envio(enviar){
        if(enviar==false){
            this.precio = this.precio + this.precioEnvio;
        }
    }
}                                           

class Cliente{
    constructor(nombre, telefono){
        this.nombre=nombre;
        this.telefono=telefono;
    }

}
class Pedido{
    constructor(cliente, torta){
        this.cliente=cliente;
        this.torta=torta;
    }
}

const torta1= new Torta("Macarons", 1000, 0)
const torta2= new Torta("Chocolate Dacquoise", 2500, 0)
const torta3= new Torta("Torta Fraisier", 2600, 0)
const torta4= new Torta("Paris-Brest", 2900, 0)
const torta5= new Torta("Croquembouche", 4500, 0)
const torta6= new Torta("Eclairs", 950, 0)
    

let listaProductos= [torta1, torta2, torta3, torta4, torta5, torta6]

const guardarLocal= function(clave, valor){
    localStorage.setItem(clave, valor)
}

let miFormulario = document.getElementById("miFormulario");
miFormulario.addEventListener("submit", enviarForm)
        
function enviarForm(e){
    e.preventDefault();

    let nombre= document.getElementById("nombreCliente").value;
    let telefono= document.getElementById("telefono").value;
    let eleccionTorta;
            
    let eleccionUsuario = document.getElementsByName("torta");
    for (i = 0; i < eleccionUsuario.length; i++) {
        if(eleccionUsuario[i].checked){
            eleccionTorta= eleccionUsuario[i].value;
        }
    };

    for(i=0; i<6; i++){
        if(listaProductos[i].variedad==eleccionTorta){
            eleccionTorta=listaProductos[i]
        }
    }
    eleccionTorta.precioEnvio=150;


    let cliente= new Cliente(nombre, telefono);
    let dropdown= document.getElementById("envios");
    let envio= dropdown.value;
    if(envio=="no"){
        eleccionTorta.envio(false)
    } else{
    eleccionTorta.envio(true)
    }
    
    let pedido= new Pedido(cliente, eleccionTorta);

        
    guardarLocal("pedido", JSON.stringify(pedido));
    let objetosGuardados = localStorage.getItem("pedido");
    const objeto1= JSON.parse(objetosGuardados)
    console.log(objeto1)

                
    let parrafo= document.createElement("p");
    parrafo.innerHTML=  `<p> Muchas gracias por tu pedido ${objeto1.cliente.nombre},  tu orden consta de: ${objeto1.torta.variedad}. El precio total es $${objeto1.torta.precio}. Por protocolos sanitarios te pedimos que te comuniques al 0351-15346446565 para coordinar tu entrega.</p>`
    document.getElementById("miFormulario").appendChild(parrafo);

    let gracias= document.getElementById("nombre").innerHTML="Gracias por su compra";

        
}
//Formulario suscripcion
   
let miFormularioSus = document.getElementById("formulario");
let email= null;
const URLJSON= "data/datos.json"

$("#formulario").submit((e)=>{
    e.preventDefault()

    $.getJSON(URLJSON, function(respuesta, estado){
        if (estado==="success"){
            let misDatos= respuesta;
            for (const dato of misDatos){
                $("#formulario").append(`<p>
                                        <h4>${dato.mensaje_success}</h4>
                                        </p>`)
            }
        }else{
            for (const dato of misDatos){
                $("#formulario").append(`<p>
                                        <h4>${dato.mensaje_fail}</h4>
                                        </p>`)
            }
        }
    })
})
       
$("#boton_desplegar_formulario").click(()=>{
    $("#formulario").slideDown("slow");
})
  

//boton scroll
window.onscroll=function(){
    myFunction();
};

const btnScrollToTop= document.getElementById("btnScrollToTop");
btnScrollToTop.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior:"smooth"

    });
});