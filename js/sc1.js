
//(function () { //оборачиваем все в одну анонимную функцию-обертку, типа модульность пилим



var button = document.getElementById('myButton');
	

		
button.onclick = function () {
		
			
    'use strict';
	(function () {
		document.getElementById('hiddenAlarm').classList.add('hidden');
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
		calcData.s1 = inData.a1 * inData.a2 * inData.a7; //Площадь пола s0
		calcData.s2 = inData.a1 * inData.a2; //Площадь потолка s1
		calcData.s3 = inData.a1 * inData.a4 * 2 + inData.a2 * inData.a4 * 2; //Площадь внешних стен без фронтона s3 = (a1*a4*2) + (a2*a4*2) s2
		calcData.s4 = inData.a4 * inData.a6; //Площадь внутренних стен s4 = (a4*a6) s3
		calcData.s5 = inData.a1 * inData.a5; //Площадь фронтонных стен s5 = (a1*a5) s4
		calcData.s6 = inData.a1 * inData.a2 * inData.a7 - (inData.a6 * inData.u2 + (inData.a1 * 2 + inData.a2 * 2) * inData.u1); //Жилая площадь дома s6 s5
		calcData.s7 = (((inData.a1 * 0.5 / 0.866) + 0.5)*(inData.a2 + 0.5)) * 2;// Площадь двускатной кровли s7 s6

		
		//Расчетный объем утеплителя
		calcData.v1 = calcData.s1 * inData.u3; //Пол, м3 v0
		calcData.v2 = calcData.s3 * inData.u1; // Внешние стены, м3 v1
		calcData.v3 = calcData.s3 * inData.u2; //Внутренние стены, м3  v2
		calcData.v4 = calcData.s7 * inData.u4; //Кровля, м3 v3
		calcData.v5 = calcData.s5 * inData.u5; //Фронтонные стены, м3  v4
		calcData.v6 = calcData.s2 * inData.u6; //Потолок, м3  v24
		calcData.v7 = calcData.v1 + calcData.v2 + calcData.v3  + calcData.v4 + calcData.v5 + calcData.v6; //Общий объем утеплителя, м3  v5
		calcData.v8 = calcData.v7 / 0.036; //Кол-во утеплителя в штуках, расчет для случая плит 600х1200х50мм

		//Расчетное количество плитного материала, м2

		calcData.osbFloor = calcData.s1;     //osbFloor       
		calcData.osbWall = calcData.s3;     //osbWall
		calcData.osbSumm = calcData.osbFloor + calcData.osbWall; //osbSumm
		calcData.osbSummQuant = calcData.osbSumm / 3.125;

		//Расчетное количество Доски 50х100 и 50х150 для каркаса, м.п. 
		calcData.woodFrame = (inData.a2 / 0.6) * inData.a4 * 2 + (inData.a1 / 0.6) * inData.a4 * 2 + (inData.a2 * 3 + inData.a1 * 3); // v9 Д150 на каркас стен woodFrame
		calcData.woodRoofFrame = ((inData.a2+0.5)/0.6)*((inData.a1*0.5/0.866)+0.5);                //Д150 на стропила  woodRoofFrame v10
		// ((a[1]+0.5)/0.6)*((a[0]*0.5/0.866)+0.5)
		calcData.woodFrameFront = inData.a5* 4*2;                                           //Д150 на фронтонные стены woodFrameFront v11	
		calcData.woodFloor = (inData.a2/0.4)*inData.a1;                                       //Д150 на лаги пола woodFloor v12
		calcData.woodInsideWall = inData.a6/0.6;                                              //Д100 на внутренние стены woodInsideWall v13
		calcData.woodInsideWallM3 = calcData.woodInsideWall / 198;   
		calcData.woodSummary = calcData.woodFrame + calcData.woodRoofFrame + calcData.woodFrameFront + calcData.woodFloor*2; //Д150 суммарное количество woodSummary v14
		calcData.woodSummaryM3 = calcData.woodSummary / 132; //Кол-во доски 50х150х6000 в м3



		//Расчетное количество брусок 50х50, м.п.
		calcData.wood50x50Walls = (inData.a2/0.6)*inData.a4*2 + (inData.a1/0.6)*inData.a4*2; //v15 50х50 на стены для вентзазора wood50x50Walls 
				//var wood50x50Roof =  v[10]   woodRoofFrame
		calcData.wood50x50Summ = calcData.wood50x50Walls + calcData.woodRoofFrame;     // v16 50х50 суммарное количество wood50x50Summ
		calcData.wood50x50SummM3 = calcData.wood50x50Summ / 396;


		//Расчетное количество доска дюймовка, штук
		calcData.wood25x150Roof = (calcData.s7/0.225)/2; //v17 wood25x150Roof дюймовка для крыши под металлопрофиль, через одну доску
		calcData.wood25x150RoofM3 = calcData.wood25x150Roof / 44;


		//Расчетное количество винилового сайдинга, м2
		calcData.vinyl = calcData.s3 + calcData.s5; //siding v18
		calcData.vinylQuant = calcData.vinyl / 0.78; //Расчетное кол-во сайдинга в панелях, площадь панели 0,78 м2

		


		//Расчетное количество гипсокартона, м2
		calcData.gklWalls = inData.a6*inData.a4*2 + calcData.s3;  //gklWalls v19
		calcData.gklCeiling = calcData.s2; //gklCeiling v20
		calcData.gklSumm = calcData.gklWalls + calcData.gklCeiling; //gklSumm v21
		calcData.gklSummQuant = calcData.gklSumm / 3;

		//Расчетное количество мембран, м2
		calcData.vapourMemb = calcData.s1 + calcData.s2 + calcData.s3; //vapourMemb v22
		calcData.windMemb = calcData.s3 + calcData.s5; //windMemb v23
		//var roofMembrane = calcData.s7


		//Расчетное количество металлочерепицы, м2
		// var roofMetall = calcData.s7
		









		

		//Перекидываем рассчетные значения в div, вывод рассчетных площадей дома
		inHtml('s1', calcData.s1);
		inHtml('s2', calcData.s2);
		inHtml('s3', calcData.s3);
		inHtml('s4', calcData.s4);
		inHtml('s5', calcData.s5);
		inHtml('s6', calcData.s6);
		inHtml('s7', calcData.s7);

		//Перекидываем рассчетные значения в div, вывод объема утеплителя
		inHtml('v1', calcData.v1);
		inHtml('v2', calcData.v2);
		inHtml('v3', calcData.v3);
		inHtml('v4', calcData.v4);
		inHtml('v5', calcData.v5);
		inHtml('v6', calcData.v7);
		inHtml('v24', calcData.v6);
		inHtml('vQuant', calcData.v8);
		
		//Перекидываем рассчетные значения в div, вывод количества плитного материала
		inHtml('osbFloor', calcData.osbFloor);
		inHtml('osbWall', calcData.osbWall);
		inHtml('osbSumm', calcData.osbSumm);
		inHtml('osbSummQuant', calcData.osbSummQuant);

		//Перекидываем рассчетные значения в div, доска на каркас
		inHtml('woodFrame', calcData.woodFrame);
		inHtml('woodRoofFrame', calcData.woodRoofFrame);
		inHtml('woodFrameFront', calcData.woodFrameFront);
		inHtml('woodFloor', calcData.woodFloor);
		inHtml('woodFloor2', calcData.woodFloor);
		inHtml('woodInsideWall', calcData.woodInsideWall);
		inHtml('woodInsideWallM3', calcData.woodInsideWallM3);
		inHtml('woodSummary', calcData.woodSummary);
		inHtml('woodSummaryM3', calcData.woodSummaryM3);

		//Перекидываем рассчетные значения в div, брусок 50х50 стены и кровля
		inHtml('wood50x50Walls', calcData.wood50x50Walls);
		inHtml('wood50x50Roof', calcData.woodRoofFrame);
		inHtml('wood50x50Summ', calcData.wood50x50Summ);
		inHtml('wood50x50SummM3', calcData.wood50x50SummM3);

		//Перекидываем рассчетные значения в div, доска дюймовка
		inHtml('wood25x150Roof', calcData.wood25x150Roof);
		inHtml('wood25x150RoofM3', calcData.wood25x150RoofM3);

		//Перекидываем рассчетные значения в div, виниловый сайдинг
		inHtml('vinyl', calcData.vinyl);
		inHtml('vinylQuant', calcData.vinylQuant);
		//Перекидываем рассчетные значения в div, гипсокартон
		inHtml('gklWalls', calcData.gklWalls);
		inHtml('gklCeiling', calcData.gklCeiling);
		inHtml('gklSumm', calcData.gklSumm);
		inHtml('gklSummQuant', calcData.gklSummQuant);

		//Перекидываем рассчетные значения в div, мембраны
		inHtml('vapourMemb', calcData.vapourMemb);
		inHtml('windMemb', calcData.windMemb);
		inHtml('gklWalls', calcData.gklWalls);
		inHtml('roofMembrane', calcData.s7);


		//Перекидываем рассчетные значения в div, металлочерепица, м2
		
		inHtml('roofMetall', calcData.s7);


		



	})();
};


//Функция для захвата и проверки данных из input (полей ввода калькулятора) 
function hiddenOff (el){

				el = document.getElementById('hiddenAlarm');
				el.classList.remove('hidden');
				
			};  
function getId (val){ 
		
	//Берем элемент по ID
	val = document.getElementById(val).value;	

	//Проверяем элемент на наличие запятой вместо точки, если есть, меняем на точку
	val = val.replace(/\,/, '.'); 

	//Округляем число до сотых и превращаем строку в число 
	val = +(Math.round((val)*100)/100);	

	//Проверяем чтобы значение было больше 0, и не являлось строкой
	if (val == 0 || val < 0 || isNaN(val)) {
		
		return hiddenOff ();
		
	};

return val;
}

function inHtml (val1,val2){ 
	
//Ф-ция для вписывания полученного в расчетах значения в необходимый тэг inHtml('div1', b)
	val2 = +(Math.round((val2)*100)/100)
	val3 = document.getElementById(val1).innerHTML = val2;

return val3;
}						
		

