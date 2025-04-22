function parseHour(strHour) {
    const [h, m] = strHour.split(':').map(Number);
    return h * 60 + m;
}

function setValidHour() {
    let validHour = false;
    let selectedHour;

    while (!validHour) {
        const welcomeMsgHour = prompt('Bienvenido al restaurante Comilon, indique por favor a qué hora desea reservar mesa en formato hh:mm.\nNuestro horario es de:\n- Desayuno: 07:00 a 12:00\n- Comida: 13:00 a 16:00\n- Cena: 19:00 a 23:00\n\nRecuerde que la cocina cierra a las 23:00.');
        if (/^\d{2}:\d{2}$/.test(welcomeMsgHour)) {  // verificacion de hh : mm - / / delimitan la expresion regular - ^- para validar desde el primer numero-  \d{2} verifica que sean dos digitos - : - \d{2} verifica que sean dos digitos
            const [h, m] = welcomeMsgHour.split(':').map(Number); // split separa la cadena con : - map(Number) convierte cada parte a un número

            if (h >= 0 && h < 24 && m >= 0 && m < 60) {
                selectedHour = h * 60 + m;

                if (selectedHour >= breakfastStart && selectedHour <= breakfastEnd) {
                breakfastMenu();
                validHour = true;

                } else if (selectedHour >= lunchStart && selectedHour <= lunchEnd) {
                lunchMenu();
                validHour = true;

                } else if (selectedHour >= dinnerStart && selectedHour <= dinnerEnd) {
                dinnerMenu();
                validHour = true;

                } else {
                alert('La cocina está cerrada a la hora seleccionada. Prueba con otra hora.');
                }
            }else {
                alert('Formato incorrecto. Por favor, usa el formato hh:mm.');
            };
        };  
    };
};

//TOTAL
let totalPrice = 0; 

function choicePrice(strchoice) {
        const match = strchoice.match(/([\d.,]+)€/); // / / delimitan la expresion regular- [ ] - busca un caracter entre los delimitadores - \d busca un digito - . busca el punto - , busca la coma - + uno o mas caracteres - € busca el simbolo de euro] 
        if (match) {
            return parseFloat(match[1].replace(',', '.'));
        }
        return 0;
}


//Horarios de apertura y cierre
const breakfastStart = parseHour('07:00');
const breakfastEnd = parseHour('12:00');

const lunchStart = parseHour('13:00');
const lunchEnd = parseHour('16:00');

const dinnerStart = parseHour('19:00');
const dinnerEnd = parseHour('23:00');



function randomMsg() {
    const msg = "¡Espero que disfrutes la elección!, ¡Buena elección!, ¡Has elegido el plato estrella!, ¡Escogiste mi plato favorito!, ¡Me encanta ese plato! ";
    options = msg.split(",");
    randomOption = Math.floor(Math.random() * options.length);
    return options[randomOption];
}

function cleanText(txt) {
    return txt
        .normalize("NFD") // normaliza el texto para eliminar acentos y caracteres especiales, sin normalize no se eliminan los acentos porque son parte del string (é --> e + ´)
        .replace(/[\u0300-\u036f]/g, "") // expresion regular para eliminar acentos y caracteres especiales 
        .toLowerCase()
        .trim();
}

//BREAKFAST MENU
function breakfastMenu() {
    const breakfastDrinkOptions = {
        "infusion": "Infusión(1,20€)",
        "colacao": "Colacao (1,80€)",
        "cafe": "Café (1€)",
        "zumo": "zumo (0,90€)",
    };

    let breakfastDrinkUserChoice = "";

    while (true) {
        breakfastDrinkUserChoice = prompt(
            "MENU DESAYUNO:\n- Infusión (1,20€)\n- Colacao (1,80€)\n- Café (1€)\n- Zumo (0,90€)\n\nEscribe el nombre del plato:"
        );

        if (breakfastDrinkOptions[cleanText(breakfastDrinkUserChoice)]) break;
        alert(`Ops, no disponemos de ${breakfastDrinkUserChoice} ahora mismo, elija otra opción por favor.`);
    }

    alert(`Has elegido: ${breakfastDrinkOptions[cleanText(breakfastDrinkUserChoice)]} ${randomMsg()}`);

    const breakfastFoodOptions = {
        "tostada": "Tostada (1,50€)",
        "tortilla": "Tortilla (2€)",
        "pepito": "Pepito (1,50€)",
        "bolleria": "Bollería (1,20€)",
        "nada": "Nada (0€)",
    };

    let breakfastFoodUserChoice = "";

    while (true) {
        breakfastFoodUserChoice = prompt(
            "MENU DESAYUNO:\n- Tostada (1,50€)\n- Tortilla (2€)\n- Pepito(1,50€)\n- Bolleria (1,20€)\n-Nada (0€)\n\nEscribe el nombre del plato:"
        );

        if (breakfastFoodOptions[cleanText(breakfastFoodUserChoice)]) break;
        alert("Ese plato no existe. Vuelve a intentarlo.");
    }

    if (cleanText(breakfastFoodUserChoice) === "nada") {
        alert("Le traeré unicamente la bebida entonces."); 
    }else {
        alert(`Has elegido: ${breakfastFoodOptions[cleanText(breakfastFoodUserChoice)]} ${randomMsg()}`)
    };

    const breakfastExtra = {
        "pan": "Pan (0,50€)",
        "agua": "Agua (0,80€)",
        "leche": "leche (0,5€)",
        "nesquik": "Nesquik (1€)",
        "nada": "Nada (0€)"
    }

    let breakfastExtraChoice = "";

    while (true) {
        breakfastExtraChoice = prompt(
            "MENU DESAYUNO:\n- Pan (0,50€)\n- Agua (0,80€)\n- Leche (0,50€)\n- Nesquik (1€)\n-Nada (0€)\n\nEscribe el nombre del plato:"
        );

        if (breakfastExtra[cleanText(breakfastExtraChoice)]) break;
        alert("Ese extra no existe. Vuelve a intentarlo.");
    };

    if (cleanText(breakfastExtraChoice) === "nada") {
        alert("Sin nada entonces."); 
    }else {
        alert(`Has elegido: ${breakfastExtra[cleanText(breakfastExtraChoice)]} ${randomMsg()}`)
    };

    const price=
    choicePrice(breakfastDrinkOptions[cleanText(breakfastDrinkUserChoice)]) +
    choicePrice(breakfastFoodOptions[cleanText(breakfastFoodUserChoice)])+
    choicePrice(breakfastExtra[cleanText(breakfastExtraChoice)]);

    totalPrice += price;
    alert(`Su pedido contiene: 
        ${breakfastDrinkUserChoice.toUpperCase()} - ${choicePrice(breakfastDrinkOptions[cleanText(breakfastDrinkUserChoice)])} €
        ${breakfastFoodUserChoice.toUpperCase()} - ${choicePrice(breakfastFoodOptions[cleanText(breakfastFoodUserChoice)])} €
        ${breakfastExtraChoice.toUpperCase()} - ${choicePrice(breakfastExtra[cleanText(breakfastExtraChoice)])} €

        El total de su pedido es de: ${totalPrice} €`);
}

//LUNCH MENU
function lunchMenu() {

    const lunchMenuFirstPlate = {
        "marmitako": "Marmitako (8€)",
        "ensalada": "Ensalada (2€)",
        "sopa": "Sopa(2,5€)",
        "arroz": "Arroz(3€)"
    };

    let lunchMenuFirstChoice = "";

    while (true) {
        lunchMenuFirstChoice = prompt(
            "PRIMER PLATO:\n- Marmitako (8€)\n- Ensalada (2€)\n- Sopa (2,50€)\n- Arroz (3€)\n\nEscribe el nombre del plato:"
        );

        if (lunchMenuFirstPlate[cleanText(lunchMenuFirstChoice)]) break;
        alert(`Ops, no disponemos de ${lunchMenuFirstChoice} ahora mismo, elija otra opción por favor.`);
    }
    alert(`Has elegido: ${lunchMenuFirstPlate[cleanText(lunchMenuFirstChoice)]} ${randomMsg()}`);

    const lunchMenuSecondPlate = {
        "bakalao": "Bakalao (7,50€)",
        "lubina": "Lubina (6€)",
        "katxopo": "Katxopo (8€)",
        "pollo": "Pollo (6€)"
    };

    let lunchMenuSecondChoice = "";
    while (true) {
        lunchMenuSecondChoice = prompt(
            "SEGUNDO PLATO:\n- Bakalao (7,50€)\n- Lubina (6€)\n- Katxopo (8€)\n- Pollo (6€)\n\nEscribe el nombre del plato:"
        );

        if (lunchMenuSecondPlate[cleanText(lunchMenuSecondChoice)]) break;
        alert(`Ops, no disponemos de ${lunchMenuSecondChoice} ahora mismo, elija otra opción por favor.`);
    };

    alert(`Has elegido: ${lunchMenuSecondPlate[cleanText(lunchMenuSecondChoice)]} ${randomMsg()}`);

    const lunchMenuDesserts = {
        "tarta": "Tarta (2€)",
        "coulant": "Coulant (2,25€)",
        "pantxineta": "Pantxineta (2,50€)",
        "fruta": "Fruta (1,5€)",
        "yogur": "Yogur (1€)",
    };

    let lunchDessertChoice = "";

    while (true) {
        lunchDessertChoice = prompt(
            "POSTRE:\n- Tarta (2€)\n- Coulant (2,25€)\n- Pantxineta (2,50€)\n- Fruta (1,5€)\n- Yogur (1€)\n\nEscribe el nombre del postre:"
        );

        if (lunchMenuDesserts[cleanText(lunchDessertChoice)]) break;
        alert(`Ops, no disponemos de ${lunchDessertChoice} ahora mismo, elija otra opción por favor.`); 
    }; 

    alert(`Has elegido: ${lunchMenuDesserts[cleanText(lunchDessertChoice)]} ${randomMsg()}`);

    const lunchExtra = {
        "pan": "Pan (1,20€)",
        "agua": "Agua (1€)",
        "vino": "Vino (2,25€)",
        "cerveza": "Cerveza (1,8€)",
        "nada": "Nada (0€)"
    }

    let lunchExtraChoice = "";

    while (true) {
        lunchExtraChoice = prompt(
            "EXTRAS:\n- Pan (1,20€)\n- Agua (1€)\n- Vino (2,25€)\n- Cerveza (1,8€)\n- Nada(0€)\n\nEscribe el nombre del plato:"
        );

        if (lunchExtra[cleanText(lunchExtraChoice)]) break;
        alert(`Ops, no disponemos de ${lunchExtraChoice} ahora mismo, elija otra opción por favor.`);     
    };

    if (cleanText(lunchExtraChoice) === "nada") {
        alert("Sin extras entonces.");

    } else {alert(`Has elegido: ${lunchExtra[cleanText(lunchExtraChoice)]} ${randomMsg()}`)
    };

    const price=
    choicePrice(lunchMenuFirstPlate[cleanText(lunchMenuFirstChoice)])+
    choicePrice(lunchMenuSecondPlate[cleanText(lunchMenuSecondChoice)]) +
    choicePrice(lunchMenuDesserts[cleanText(lunchDessertChoice)])+
    choicePrice(lunchExtra[cleanText(lunchExtraChoice)]);

    totalPrice += price;
    alert(`Su pedido contiene:
        ${lunchMenuFirstChoice.toUpperCase()} - ${choicePrice(lunchMenuFirstPlate[cleanText(lunchMenuFirstChoice)])} €
        ${lunchMenuSecondChoice.toUpperCase()} - ${choicePrice(lunchMenuSecondPlate[cleanText(lunchMenuSecondChoice)])} €
        ${lunchDessertChoice.toUpperCase()} - ${choicePrice(lunchMenuDesserts[cleanText(lunchDessertChoice)])} €
        ${lunchExtraChoice.toUpperCase()} - ${choicePrice(lunchExtra[cleanText(lunchExtraChoice)])} €

        El total de su pedido es de: ${totalPrice} €`); 
}   

//DINNER MENU
function dinnerMenu() {

    const dinnerMenuFirstPlate = {
        "ensalada": "Ensalada (3€)",
        "sopa": "Sopa (3,50€)",
        "pure": "Pure (4€)",
        "crema": "Crema (3€)",
    };

    let dinnerMenuFirstPlateChoice = "";

    while (true) {
        dinnerMenuFirstPlateChoice = prompt(
            "PRIMER PLATO:\n- Ensalada (3€)\n- Sopa (3,50€)\n- Pure (4€)\n- Crema (3€)\n\nEscribe el nombre del plato:"
        );

        if (dinnerMenuFirstPlate[cleanText(dinnerMenuFirstPlateChoice)]) break;
        alert(`Ops, no disponemos de ${dinnerMenuFirstPlateChoice} ahora mismo, elija otra opción por favor.`);
    };

    alert(`Has elegido: ${dinnerMenuFirstPlate[cleanText(dinnerMenuFirstPlateChoice)]} ${randomMsg()}`);


    const dinnerMenuSecondPlate = {
        "lubina": "Lubina (7€)",
        "merluza": "Merluza (5,50€)",
        "pollo": "Pollo (5€)",
        "costillas": "Costillas(9€)"
    };

    let dinnerMenuSecondPlateChoice = "";

    while (true) {
        dinnerMenuSecondPlateChoice = prompt(
            "SEGUNDO PLATO: \n- Lubina (7€)\n- Merluza (5,50€)\n- Pollo (5€)\n- Costillas (9€)\n\nEscribe el nombre del plato:"
        );

        if (dinnerMenuSecondPlate[cleanText(dinnerMenuSecondPlateChoice)]) break;    
        alert(`Ops, no disponemos de ${dinnerMenuSecondPlateChoice} ahora mismo, elija otra opción por favor.`);
    };

    alert(`Has elegido: ${dinnerMenuSecondPlate[cleanText(dinnerMenuSecondPlateChoice)]} ${randomMsg()}`);


    const dinnerMenuDesserts = {
        "tarta": "Tarta (2,50€)",
        "coulant": "Coulant (1,50€)",
        "pantxineta": "Pantxineta (2€)",
        "fruta": "Fruta (1€)",
        "yogur": "Yogur (1,50€)",
    };


    let dinnerMenuDessertsChoice = "";

    while (true) {
        dinnerMenuDessertsChoice = prompt(
            "POSTRE:\n- Tarta (2,50€)\n- Coulant (1,50€)\n- Pantxineta (2€)\n- Fruta (1€)\n- Yogur (1,50€)\n\nEscribe el nombre del plato:"
        );
        if (dinnerMenuDesserts[cleanText(dinnerMenuDessertsChoice)]) break;
        alert(`Ops, no disponemos de ${dinnerMenuDessertsChoice} ahora mismo, elija otra opción por favor.`);
    };

    alert(`Has elegido: ${dinnerMenuDesserts[cleanText(dinnerMenuDessertsChoice)]} ${randomMsg()}`);

    const dinnerExtra ={
        "pan": "Pan (1€)",
        "agua": "Agua (1,50€)",
        "vino": "Vino (2,50€)",
        "cerveza": "Cerveza (2€)",
        "nada": "Nada (0€)"
    }

    let dinnerExtraChoice = "";

    while (true) {
        dinnerExtraChoice = prompt(
            "EXTRAS:\n- Pan (1€)\n- Agua (1,50€)\n- Vino (2,50€)\n- Cerveza (2€)\n- Nada(0€)\n\nEscribe el nombre del plato:"
        );
        if (dinnerExtra[cleanText(dinnerExtraChoice)]) break;
        alert(`Ops, no disponemos de ${dinnerExtraChoice} ahora mismo, elija otra opción por favor.`);
    };
    
    if (cleanText(dinnerExtraChoice) === "nada") {
        alert("Sin extras entonces."); 

    } else { alert(`Has elegido: ${dinnerExtra[cleanText(dinnerExtraChoice)]} ${randomMsg()}`)
    };

    const price=
        choicePrice(dinnerMenuFirstPlate[cleanText(dinnerMenuFirstPlateChoice)]) +
        choicePrice(dinnerMenuSecondPlate[cleanText(dinnerMenuSecondPlateChoice)]) +
        choicePrice(dinnerMenuDesserts[cleanText(dinnerMenuDessertsChoice)])+
        choicePrice(dinnerExtra[cleanText(dinnerExtraChoice)]);

        totalPrice += price;
        alert(`Su pedido contiene:
            ${dinnerMenuFirstPlateChoice.toUpperCase()} - ${choicePrice(dinnerMenuFirstPlate[cleanText(dinnerMenuFirstPlateChoice)])} €
            ${dinnerMenuSecondPlateChoice.toUpperCase()} - ${choicePrice(dinnerMenuSecondPlate[cleanText(dinnerMenuSecondPlateChoice)])} €
            ${dinnerMenuDessertsChoice.toUpperCase()} - ${choicePrice(dinnerMenuDesserts[cleanText(dinnerMenuDessertsChoice)])} €
            ${dinnerExtraChoice.toUpperCase()} - ${choicePrice(dinnerExtra[cleanText(dinnerExtraChoice)])} €
            
            El total de su pedido es de: ${totalPrice} €`);
              
};




setValidHour();
