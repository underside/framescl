
//(function () { //оборачиваем все в одну анонимную функцию-обертку, типа модульность пилим



var button = document.getElementById('myButton');
	

		
button.onclick = function () {
		
			
    'use strict';
	(function () {
		var inData = {};
		inData.a1 = getId('a1'); // Ширина дома a0
		inData.a2 = getId('a2'); //Длина дома a1
		inData.a3 = getId('a3'); //Высота дома в коньке  a2
		inData.a4 = getId('a4'); //Высота дома без фронтона a3 
		inData.a5 = getId('a5'); //Высота фронтона a4
		inData.a6 = getId('a6'); // Протяженность внутренних стен a5
		inData.a7 = getId('a7'); // Количество жилых этажей a6

		inData.u1 =  getId('u1'); // Утепление внешних стен a7
		inData.u2 =  getId('u2'); // Утепление внутренних стен a8
		inData.u3 =  getId('u3'); // Утепление пола a9
		inData.u4 = getId('u4'); // Утепление кровли a10
		inData.u5 = getId('u5');; // Утепление фронтона a11
		inData.u6 = getId('u6'); // Утепление потолка a12
		
		
		//Расчетные площади дома
		var calcData = {};
		calcData.s1 = inData.a1 * inData.a2 * inData.a7; //Площадь пола s1
		calcData.s2 = inData.a1 * inData.a2; //Площадь потолка s2
		calcData.s3 = (inData.a1 * inData.a4 * 2) + (inData.a2 * inData.a4 * 2); //Площадь внешних стен без фронтона s3 = (a1*a4*2) + (a2*a4*2)
		calcData.s4 = inData.a4 * inData.a6; //Площадь внутренних стен s4 = (a4*a6)
		calcData.s5 = inData.a1 * inData.a5; //Площадь фронтонных стен s5 = (a1*a5)
		calcData.s6 = (inData.a1 * inData.a2 * inData.a7) - ((inData.a6 * inData.u2 + (inData.a1 * 2 + inData.a2 * 2) * inData.u1); //Жилая площадь дома s6
		calcData.s7 = parseFloat(((((inData.a1 * 0.5 / 0.866) + 0.5)*(inData.a2 + 0.5)) * 2).toFixed(2));// Площадь двускатной кровли s7

		
		//Расчетный объем утеплителя
		calcData.v1 = parseFloat((s[0] * a[9]).toFixed(2)); //Пол, м3 
		calcData.v2 = parseFloat((s[2] * inData.u1).toFixed(2)); // Внешние стены, м3
		calcData.v3 = parseFloat((s[3] * inData.u2).toFixed(2)); //Внутренние стены, м3 
		calcData.v4 = parseFloat((s[6] * a[10]).toFixed(2)); //Кровля, м3 
		calcData.v5 = parseFloat((s[4] * a[11]).toFixed(2)); //Фронтонные стены, м3 
		calcData.v6 = parseFloat((s[1] * a[12]).toFixed(2)); //Потолок, м3 
		calcData.v7 = parseFloat((v[0] + v[1] + v[2] + v[3] + v[4] + v[24]).toFixed(2)); //Общий объем утеплителя, м3 

		//Расчетное количество плитного материала, м2

		v[6] = s[0];     //osbFloor       
		v[7] = s[2];     //osbWall
		v[8] = s[0] + s[2]; //osbSumm

		//Расчетное количество Доски 50х100 и 50х150 для каркаса, м.п. 
		v[9] = parseFloat(((inData.a2 / 0.6) * inData.a4 * 2 + (inData.a1 / 0.6) * inData.a4 * 2 + (inData.a2 * 3 + inData.a1 * 3)).toFixed(2)); //Д150 на каркас стен woodFrame
		v[10] = parseFloat((((inData.a2+0.5)/0.6)*((inData.a1*0.5/0.866)+0.5)).toFixed(2));                //Д150 на стропила  woodRoofFrame
		v[11] = parseFloat(((inData.a5* 4)*2).toFixed(2));                                           //Д150 на фронтонные стены woodFrameFront	
		v[12] = parseFloat(((inData.a2/0.4)*inData.a1).toFixed(2));                                       //Д150 на лаги пола woodFloor
		v[13] = parseFloat((inData.a6/0.6).toFixed(2));                                              //Д100 на внутренние стены woodInsideWall
		v[14] = parseFloat((v[9] + v[10] + v[11] + v[12]*2).toFixed(2)); //Д150 суммарное количество woodSummary



		//Расчетное количество брусок 50х50, м.п.
		v[15] = parseFloat((((inData.a2/0.6)*inData.a4)*2 + ((inData.a1/0.6)*inData.a4)*2).toFixed(2)); //50х50 на стены для вентзазора wood50x50Walls 
				//var wood50x50Roof =  v[10]   woodRoofFrame
		v[16] = parseFloat((v[15] + v[10]).toFixed(1));     //50х50 суммарное количество wood50x50Summ

		//Расчетное количество доска дюймовка, штук
		v[17] = (s[6]/0.225/2).toFixed(0); //wood25x150Roof дюймовка для крыши под металлопрофиль, через одну доску

		//Расчетное количество винилового сайдинга, м2
		v[18]  = s[2] + s[4]; //sidingSummary


		//Расчетное количество гипсокартона, м2
		v[19] = inData.a6*inData.a4*2 + s[2];  //gklWalls
		v[20] = s[1]; //gklCeiling
		v[21] = v[18] + v[19]; //gklSumm

		//Расчетное количество мембран, м2
		v[22] = s[0] + s[1] + s[2]; //vapourMemb
		v[23] = s[2] + s[4]; //windMemb
		//var roofMembrane = s[6]


		//Расчетное количество металлочерепицы, м2
		// var roofMetall = s[6]
		









		

		//Перекидываем рассчетные значения в div, вывод рассчетных площадей дома
		document.getElementById('s1').innerHTML += s[0];
		document.getElementById('s2').innerHTML += s[1];
		document.getElementById('s3').innerHTML += s[2];
		document.getElementById('s4').innerHTML += s[3];
		document.getElementById('s5').innerHTML += s[4];
		document.getElementById('s6').innerHTML += s[5];
		document.getElementById('s7').innerHTML += s[6];

		//Перекидываем рассчетные значения в div, вывод объема утеплителя
		document.getElementById('v1').innerHTML += v[0];
		document.getElementById('v2').innerHTML += v[1];
		document.getElementById('v3').innerHTML += v[2];
		document.getElementById('v4').innerHTML += v[3];
		document.getElementById('v5').innerHTML += v[4];
		document.getElementById('v6').innerHTML += v[5];
		document.getElementById('v24').innerHTML += v[24];
		
		//Перекидываем рассчетные значения в div, вывод количества плитного материала
		document.getElementById('osbFloor').innerHTML += v[6];
		document.getElementById('osbWall').innerHTML += v[7];
		document.getElementById('osbSumm').innerHTML += v[8];

		//Перекидываем рассчетные значения в div, доска на каркас
		document.getElementById('woodFrame').innerHTML += v[9];
		document.getElementById('woodRoofFrame').innerHTML += v[10];
		document.getElementById('woodFrameFront').innerHTML += v[11];
		document.getElementById('woodFloor').innerHTML += v[12];
		document.getElementById('woodFloor2').innerHTML += v[12];
		document.getElementById('woodInsideWall').innerHTML += v[13];
		document.getElementById('woodSummary').innerHTML += v[14];

		//Перекидываем рассчетные значения в div, брусок 50х50 стены и кровля
		document.getElementById('wood50x50Walls').innerHTML += v[15];
		document.getElementById('wood50x50Roof').innerHTML += v[10];
		document.getElementById('wood50x50Summ').innerHTML += v[16];

		//Перекидываем рассчетные значения в div, доска дюймовка
		document.getElementById('wood25x150Roof').innerHTML += v[17];

		//Перекидываем рассчетные значения в div, виниловый сайдинг
		document.getElementById('sidingSummary').innerHTML += v[18];

		//Перекидываем рассчетные значения в div, гипсокартон
		document.getElementById('gklWalls').innerHTML += v[19];
		document.getElementById('gklCeiling').innerHTML += v[20];
		document.getElementById('gklSumm').innerHTML += v[21];

		//Перекидываем рассчетные значения в div, мембраны
		document.getElementById('vapourMemb').innerHTML += v[22];
		document.getElementById('windMemb').innerHTML += v[23];
		document.getElementById('roofMembrane').innerHTML += s[5];


		//Перекидываем рассчетные значения в div, металлочерепица, м2
		document.getElementById('roofMetall').innerHTML += s[6];


		



	})();
};


//Функция для захвата и проверки данных из input (полей ввода калькулятора) 
function getId (val){ 
		
	//Берем элемент по ID
	val = document.getElementById(val).value;	

	//Проверяем элемент на наличие запятой вместо точки, если есть, меняем на точку
	val = val.replace(/\,/, '.'); 

	//Округляем число до сотых и превращаем строку в число 
	val = +(Math.round((val)*100)/100);	

	//Проверяем чтобы значение было больше 0, и не являлось буквами
	if (val == 0 || val < 0 || isNaN(val)) {
		return alert ("Введенное значение должно быть числом больше ноля");
	};

return val;
}

			
		


//if document.order.weight.value.replace (/\,/, '.');
// ( parseFloat("2,2".replace(',', '.')) )


