
//(function () { //оборачиваем все в одну анонимную функцию-обертку, типа модульность пилим



var button = document.getElementById('myButton');
	

		
button.onclick = function () {
		
			
    'use strict';
	(function () {
		
		//Обнуляем значения всех расчетных форм
		document.getElementById('s1').innerHTML = null;
		document.getElementById('s2').innerHTML = null;
		document.getElementById('s3').innerHTML = null;
		document.getElementById('s3').innerHTML = null;
		document.getElementById('s4').innerHTML = null;
		document.getElementById('s5').innerHTML = null;
		document.getElementById('s6').innerHTML = null;
		document.getElementById('s7').innerHTML = null;
		document.getElementById('v1').innerHTML = null;
		document.getElementById('v2').innerHTML = null;
		document.getElementById('v3').innerHTML = null;
		document.getElementById('v4').innerHTML = null;
		document.getElementById('v5').innerHTML = null;
		document.getElementById('v6').innerHTML = null;
		document.getElementById('v24').innerHTML=null;
		document.getElementById('osbFloor').innerHTML = null;
		document.getElementById('osbWall').innerHTML = null;
		document.getElementById('osbSumm').innerHTML = null;
		document.getElementById('woodFrame').innerHTML = null;
		document.getElementById('woodRoofFrame').innerHTML = null;
		document.getElementById('woodFrameFront').innerHTML = null;
		document.getElementById('woodFloor').innerHTML = null;
		document.getElementById('woodFloor2').innerHTML = null;
		document.getElementById('woodInsideWall').innerHTML = null;
		document.getElementById('woodSummary').innerHTML = null;
		document.getElementById('wood50x50Walls').innerHTML = null;
		document.getElementById('wood50x50Roof').innerHTML = null;
		document.getElementById('wood50x50Summ').innerHTML = null;
		document.getElementById('wood25x150Roof').innerHTML = null;
		document.getElementById('sidingSummary').innerHTML = null;
		document.getElementById('gklWalls').innerHTML = null;
		document.getElementById('gklCeiling').innerHTML = null;
		document.getElementById('gklSumm').innerHTML = null;
		document.getElementById('vapourMemb').innerHTML = null;
		document.getElementById('windMemb').innerHTML = null;
		document.getElementById('roofMembrane').innerHTML = null;
		document.getElementById('roofMetall').innerHTML = null;


		//Берем размеры из input форм по id, вводятся пользователем 
		var a = [];
		a[0] = dataCheck(document.getElementById('a1').value); // Ширина дома
		a[1] = document.getElementById('a2').value; //Длина дома
		a[2] = document.getElementById('a3').value; //Высота дома в коньке
		a[3] = document.getElementById('a4').value; //Высота дома без фронтона
		a[4] = document.getElementById('a5').value; //Высота фронтона
		a[5] = document.getElementById('a6').value; // Протяженность внутренних стен
		a[6] = document.getElementById('a7').value; // Количество жилых этажей

		a[7] =  document.getElementById('u1').value; // Утепление внешних стен
		a[8] =  document.getElementById('u2').value; // Утепление внутренних стен
		a[9] =  document.getElementById('u3').value; // Утепление пола
		a[10] = document.getElementById('u4').value; // Утепление кровли
		a[11] = document.getElementById('u5').value; // Утепление фронтона
		a[12] = document.getElementById('u6').value; // Утепление потолка
		
		
		//Расчетные площади дома
		var s = [];
		s[0] = a[0] * a[1] * a[6]; //Площадь пола s1
		s[1] = a[0] * a[1]; //Площадь потолка s2
		s[2] = (a[0] * a[3] * 2) + (a[1] * a[3] * 2); //Площадь внешних стен без фронтона s3 = (a1*a4*2) + (a2*a4*2)
		s[3] = a[3] * a[5]; //Площадь внутренних стен s4 = (a4*a6)
		s[4] = a[0] * a[4]; //Площадь фронтонных стен s5 = (a1*a5)
		s[5] = parseFloat((a[0] * a[1] * a[6]) - (a[5] * a[8] + (a[0] * 2 + a[1] * 2) * a[7]).toFixed(2)); //Жилая площадь дома s6
		s[6] = parseFloat(((((a[0] * 0.5 / 0.866) + 0.5)*(a[1] + 0.5)) * 2).toFixed(2));// Площадь двускатной кровли s7

		
		//Расчетный объем утеплителя
		var v = [];
		v[0] = parseFloat((s[0] * a[9]).toFixed(2)); //Пол, м3 
		v[1] = parseFloat((s[2] * a[7]).toFixed(2)); // Внешние стены, м3
		v[2] = parseFloat((s[3] * a[8]).toFixed(2)); //Внутренние стены, м3 
		v[3] = parseFloat((s[6] * a[10]).toFixed(2)); //Кровля, м3 
		v[4] = parseFloat((s[4] * a[11]).toFixed(2)); //Фронтонные стены, м3 
		v[24] = parseFloat((s[1] * a[12]).toFixed(2)); //Потолок, м3 
		v[5] = parseFloat((v[0] + v[1] + v[2] + v[3] + v[4] + v[24]).toFixed(2)); //Общий объем утеплителя, м3 

		//Расчетное количество плитного материала, м2

		v[6] = s[0];     //osbFloor       
		v[7] = s[2];     //osbWall
		v[8] = s[0] + s[2]; //osbSumm

		//Расчетное количество Доски 50х100 и 50х150 для каркаса, м.п. 
		v[9] = parseFloat(((a[1] / 0.6) * a[3] * 2 + (a[0] / 0.6) * a[3] * 2 + (a[1] * 3 + a[0] * 3)).toFixed(2)); //Д150 на каркас стен woodFrame
		v[10] = parseFloat((((a[1]+0.5)/0.6)*((a[0]*0.5/0.866)+0.5)).toFixed(2));                //Д150 на стропила  woodRoofFrame
		v[11] = parseFloat(((a[4]* 4)*2).toFixed(2));                                           //Д150 на фронтонные стены woodFrameFront	
		v[12] = parseFloat(((a[1]/0.4)*a[0]).toFixed(2));                                       //Д150 на лаги пола woodFloor
		v[13] = parseFloat((a[5]/0.6).toFixed(2));                                              //Д100 на внутренние стены woodInsideWall
		v[14] = parseFloat((v[9] + v[10] + v[11] + v[12]*2).toFixed(2)); //Д150 суммарное количество woodSummary



		//Расчетное количество брусок 50х50, м.п.
		v[15] = parseFloat((((a[1]/0.6)*a[3])*2 + ((a[0]/0.6)*a[3])*2).toFixed(2)); //50х50 на стены для вентзазора wood50x50Walls 
				//var wood50x50Roof =  v[10]   woodRoofFrame
		v[16] = parseFloat((v[15] + v[10]).toFixed(1));     //50х50 суммарное количество wood50x50Summ

		//Расчетное количество доска дюймовка, штук
		v[17] = (s[6]/0.225/2).toFixed(0); //wood25x150Roof дюймовка для крыши под металлопрофиль, через одну доску

		//Расчетное количество винилового сайдинга, м2
		v[18]  = s[2] + s[4]; //sidingSummary


		//Расчетное количество гипсокартона, м2
		v[19] = a[5]*a[3]*2 + s[2];  //gklWalls
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


function dataCheck (val1){ 
	"val1".replace(/\./g,','); 
	parseFloat(val1).toFixed(2);
		
	if (val1 === 0 || val1 < 0 ) {
		alert ("Введенное значение должно быть больше ноля");
	}
return val1;
}
		
			
		


//if document.order.weight.value.replace (/\,/, '.');
// ( parseFloat("2,2".replace(',', '.')) )


