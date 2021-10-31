var textito=document.getElementById("textito");
var datos=[];
var n1=0;
var n2=0;
var resultado=0;
var arrayAux=[];

//dividir un numero float en cachos
function divFloat(n) {
	let porDetras = (n + "").split(".")[1].length;
	let porDelante=0;
	let aux=parseInt(n);
	porDelante=aux.toString().length;
	let total=porDetras+porDelante+1;
	return total;
}
function pantalla(a) {
	textito.innerText+=a;
	datos.push(a);
}
//C
function borrarTotal() {
	textito.innerText="";
	datos=[];
	n1=0;
	n2=0;
}
//CE
function borradoParcial() {
	const str = textito.innerText;
	const str2= str.replace(/.$/, '');
	textito.innerText=str2;	
	datos.pop();
	n2=parseInt(n2/10);
}

//capturar operador (main function)
function operador(datos) {
	let res="";
	let numeros=["+","-","*","/","<=","%","!","mod","1/","√","^","E","tan","cos","sin","log"];
	let aux=true;
	let contador=0;//esto es para multiples operaciones
	let pos=datos.length;

	//encontramos el operador
	for(let i=0;i<datos.length;i++) {
		aux=true;
		for(let j=0;j<numeros.length;j++) {
			if((datos[i]==numeros[j])) {
				aux=false;
			}
		}
		if(aux==false) {
			res=datos[i];
			pos=i;
			contador++;
		}
	}
	//console.log("Contador:" +contador);
	console.log("Pos:" +pos);
	return pos;
}

//asignacion de n1 y n2
function asignacion() {
	var esFloat=false;
	n1=0;
	n2=0;
	let isString=false;
	let isfalso=false;//negativo
	let pos=operador(datos);

	//n1
	for(let i=0;i<pos;i++) {
		n1+=datos[i];
		console.log("n1: "+n1);

		if(datos[0]=="-") {
			isfalso=true;
			console.log("isfalso: "+isfalso);
		}
		//flotantes
		if(datos[i]==".") {
			esFloat=true;
		}
		//10+2
		if (isString===true  && esFloat==false) {
			let n3=eval(n1);
			console.log("n3" + n1);
			n1=n3;
			isString=false;
		} 
		//10+
		if(typeof(n1)==="string" && n1!="-") {

			isString=true;
		}
		if(isString===false && (typeof(datos[i+1])!=="string" || i+1==pos)) {
			n1*=10;
		}
		/*console.log("n1: "+n1);
		console.log("tipo n1: "+typeof(n1));
		console.log("isString:  "+isString);
		console.log("isFloat:  "+esFloat);*/
	}
	if(isString==false) {
		n1/=10;
		if(isFloat(n1) && (n1!=Math.E && n1!=Math.PI)) {
			n1/=10;
			n1-=0.01;
		}	
	} else {
		n1=eval(n1);
	}
	
	n1=parseFloat(n1);
	if(isfalso==true) {
		//console.log("has sido cambiado");
		//n1*=-1;
		let aux=n1.toString();
		if(aux.charAt(0)=="-") {
			//no hacemos nada
			console.log("no ha habido cambioopoooooooo")
			
		} else {
			console.log("cambio isFalsooooooooooooooo");
			n1=-n1;
		}
	}
	console.log("funcion asignacion n1: "+n1);
	isString=false;
	isfalso=false;
	//n2
	console.log("Pos: "+pos);
	n2=0;
	
	for(let i=pos+1;i<datos.length;i++) {
		n2+=datos[i];
		//false
		if(datos[0]=="-") {
			isfalso=true;
		}
		//flotantes
		if(datos[i]==".") {
			esFloat=true;
		}
		//10+2
		if (isString===true && esFloat==false) {
			let n3=eval(n2);
			console.log("n3 " + n2);
			n2=n3;
			isString=false;
		} 
		//10+
		if(typeof(n2)==="string") {

			isString=true;
		}
		if(isString===false && (typeof(datos[i+1])!=="string" || i+1==pos)) {
			n2*=10;
		}
		console.log("En la iteracion "+i + " ,n2 vale: "+n2);
	}
	if(isString==false) {
		n2/=10;
		if(isFloat(n2) && (n2!=Math.E && n2!=Math.PI)) {
			n2/=10;
			n2-=0.01;
		}	
	}
	isString=false;
	n2=parseFloat(n2);
	
	console.log("funcion asignacion n2: "+n2);
	
	//fin asignacion()
}

//operar 
function operar() {
	asignacion();
	let pos=operador(datos);
	let simbolo=datos[pos];
	
	switch(simbolo) {
		case "+":
		resultado=n1+n2;
		break;
		case "-":
		resultado=n1-n2;
		break;
		case "*":
		resultado=n1*n2;
		break;
		case "/":
		resultado=n1/n2;
		break;
		case "<=":
		resultado=(n1<=n2);
		break;
		case "%":
		resultado=(n1*n2)/100;
		break;
		case "!":
		resultado=factorial(n1);
		break;
		case "mod":
		resultado=n1%n2;
		break;
		case "√":
		resultado=raiz(n2);
		break;
		case "1/":
		resultado=ulti(n2);
		break;
		case "^":
		resultado=Math.pow(n1,n2);
		break;
		case "E":
		resultado=n1*Math.pow(10,n2);
		break;
		case "tan":
		resultado=Math.tan(n2);
		break;
		case "cos":
		resultado=Math.cos(n2);
		break;
		case "sin":
		resultado=Math.sin(n2);
		break;
		case "log":
		resultado=Math.log(n2);
		default:
	}
	if(isFloat(resultado)) {
		resultado=resultado.toFixed(3);
		resultado=eval(resultado);
	}
	//resultado=eval(resultado);
	console.log("Resultado:"+resultado);
	console.log("Tipo Resultado:"+typeof(resultado));
	textito.innerText=resultado;
	datos=[];
	let r=resultado;
	if(isFloat(r)) {
		//troceamos el numero
		let longitud=divFloat(resultado);
		let resultado2=resultado.toString();
		for(let i=0;i<longitud;i++) {
			if(resultado2.charAt(i)==".") {
				datos.push(".");
			} else if(resultado2.charAt(i)=="-") {
				datos.push("-");
			} else {
				datos.push(parseInt(resultado2.charAt(i)));
			}
		}
	} else {
		datos.push(r);
	}
	return resultado;
}

//+/-
function cambiarSigno() {
	asignacion();
	/*borradoParcial();
	borradoParcial();*/
	let aux=n1.toString();
	for(let i=0;i<aux.length;i++) {
		borradoParcial();
	}
	n1=-(n1);
	
	pantalla(n1);
}

//M
function memoria() {
	textito.innerText="M";
	datos=[];
	n1=resultado;
	datos.push(n1);
	
	return resultado;
}

//RND
function random() {
	n1=parseInt(Math.random()*9);
	pantalla(n1);
}

//e
function e() {
	pantalla(Math.E);
}



//para ver si son flotantes
 function isFloat(n){
      return Number(n) === n && n % 1 !== 0;
 }

 //PI
 function pi() {
	pantalla(Math.PI);
}

//buscar postcritos
function buscar() {
	let numero=0;
	let signo=false;
	for(let i=0;i<datos.length && signo==false;i++) {
		if(datos[i]!="!") {
			numero+=datos[i];
			numero*=10;
		} else {
			signo=true;
		}
	}
	numero/=10;
	return numero;
}
//! (factorial)
function factorial() {
	let numero=buscar();
	let res=0;

	let fact=(n)=> {
        //caso base
        if(n==0) {
            return 1;
        }
        return n*fact(n-1);
    }
    res=fact(parseInt(numero));
    textito.innerText="";
    datos=[];
    pantalla(res);
    //alert(res);
}

//raiz cuadrada
function raiz(n) {
	let numero=buscar();
	let res=0;
	res=Math.sqrt(numero);
	textito.innerText="";
    datos=[];
    pantalla(res);
}

//1/x
function ulti(n) {
	let numero=buscar();
	let res=0;
	res=1/numero;
	textito.innerText="";
    datos=[];
    //lo enviamos
    res=res+"";
    for(let i=0;i<res.length;i++) {
    	if(res.charAt(i)==".") {
    		pantalla(res.charAt(i));
    	} else {
    		 pantalla(parseInt(res.charAt(i)));
    	}
    }
   // pantalla(res);
}



//dark mode
var darky=document.getElementById("darky");
darky.addEventListener("click",()=> {
	let valor=darky.checked;
	console.log(valor);
	var root = document.documentElement;
	if(valor==true) {
         root.style.setProperty('--calculadora', "black");
         root.style.setProperty('--button', "#ACD2ED");//9AD2CB
         root.style.setProperty('--pulsado', "black");
		 root.style.setProperty('--letra', "white");
		 root.style.setProperty('--cristal', "rgba(255, 255, 255, 0.3)");
		 root.style.setProperty('--animacion', "#26f4b0");
		 
	} else {
		root.style.setProperty('--calculadora', "white");
		root.style.setProperty('--button', "#DADADA");
		root.style.setProperty('--pulsado', "black");
		root.style.setProperty('--letra', "black");
		root.style.setProperty('--cristal', "rgba(0, 0, 0, 0.3)");
		root.style.setProperty('--animacion', "#F4266A");
	}
});


//cientifica
var cientifica=document.getElementById("cientifica");
var btnCientifica=document.getElementsByClassName("btnCientifica");

let contadorCientifica=0;

cientifica.addEventListener("click",()=> {
	//alert(contadorCientifica);
	contadorCientifica++;
	var root = document.documentElement;
	if(contadorCientifica%2==1) {
		 root.style.setProperty('--anchoCristal', "80vw");
		 root.style.setProperty('--displayCientifico',"inline");
		 root.style.setProperty('--anchoCalculadora',"50%");
		 root.style.setProperty('--anchoBoton',"10%");
		 root.style.setProperty('--anchoBotonMenor',"25%");
		 root.style.setProperty('--leftAnimacion',"-32vw");
	} else {
		root.style.setProperty('--anchoCristal', "70vw");
		root.style.setProperty('--displayCientifico',"none");
		root.style.setProperty('--anchoCalculadora',"40%");
		root.style.setProperty('--anchoBoton',"15%");
		root.style.setProperty('--anchoBotonMenor',"40%");
		root.style.setProperty('--leftAnimacion',"-22vw");
	}
});

/*tangente
function tangente() {
	let numero=buscar();
	let res=0;
	res=Math.tan(numero);
	res=res.toFixed(3);
	textito.innerText="";
    datos=[];
    //res=parseInt(res);
    pantalla(res);
}
*/
//animacion
window.onload=()=> {
	var contadorAnimacion=0;
	var auxiliarAnimacion=0;
	var iteracion=0;
	contadorAnimacion++;
	var tiempoAnimacion=1500;
	var cuenta=document.getElementById("controles");
	function movidas() {
		auxiliarAnimacion=0;
				cuenta.addEventListener("click",function() {
					let contenedor_carga=document.getElementById("contenedor_carga");
					contenedor_carga.style.visibility="hidden";
					contenedor_carga.style.opacity="0";
					auxiliarAnimacion++;
					
				});
				//pulsacion
				window.addEventListener("keypress",function() {
					let contenedor_carga=document.getElementById("contenedor_carga");
					contenedor_carga.style.visibility="hidden";
					contenedor_carga.style.opacity="0";
					auxiliarAnimacion++;
					
				});

				if(auxiliarAnimacion==0) {
					let contenedor_carga=document.getElementById("contenedor_carga");
					contenedor_carga.style.visibility="visible";
					contenedor_carga.style.opacity="1";
				}
				iteracion++;
	}

	var animacion=setInterval(function() { 
			if(iteracion==0) {
				tiempoAnimacion=1500;
				movidas();
			} else {
				clearInterval(animacion);
				tiempoAnimacion=3000;
				animacion=setInterval(function() {
					movidas();
				},tiempoAnimacion);
			}
			//alert(tiempoAnimacion);
	}, tiempoAnimacion);

//fin window.onload			
};

//botones
function botones(valor) {
		
		//Almacenamos en valor de la tecla pulsada
		var teclapulsada=valor.keyCode;
		console.log(teclapulsada);
		
		let param="";
		switch(teclapulsada) {
			//operadores
			case 43:
			param="+";
			break;
			case 45:
			param="-";
			break;
			case 47:
			param="/";
			break;
			case 42:
			param="*";
			break;
			case 48:
			param=0;
			break;
			case 49:
			param=1;
			break;
			case 50:
			param=2;
			break;
			case 51:
			param=3;
			break;
			case 52:
			param=4;
			break;
			case 53:
			param=5;
			break;
			case 54:
			param=6;
			break;
			case 55:
			param=7;
			break;
			case 56:
			param=8;
			break;
			case 57:
			param=9;
			break;
			case 13:
			operar();
			param="";
			break;
			case 33:
			factorial();
			break;
			case 77:
			memoria();
			break;
			case 37:
			pantalla("%");
			break;
			case 46:
			pantalla(".");
			break;
			case 110:
			pi();
			break;
			case 101:
			e();
			break;
			case 60:
			pantalla("<=");
			break;
			case 109:
			pantalla("mod");
			break;
			case 100:
			borradoParcial();
			break;
			case 115:
			borrarTotal();
			break;
			case 114:
			random();
			break;
			case 93:
			cambiarSigno();
			break;
			case 39:
			ulti();
			break;
			case 161:
			raiz();
			break;
			default:
		}
		console.log("param: "+param);
		
		pantalla(param);
	}