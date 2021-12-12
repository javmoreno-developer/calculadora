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
			case 94:
			pantalla("^");
			break;
			case 69:
			pantalla('E');
			break;
			case 116:
			tangente();
			break;
			case 99:
			cos();
			break;
			case 120:
			sin();
			break;
			case 108:
			log();
			break;
			default:
		}
		console.log("param: "+param);
		
		pantalla(param);
	};