	var cal =  (function(){
		"use strict";
		var calBody;
		var prevB;
		var nextB;
		var textB;
		var days = ['Sun','Mon','Tue','Wed','Th','Fri','Sat'];
		var dd;
		var mm;
		var yyyy;
		var last=-1;
	//Month is 1 based
	function daysInMonth(month,year) {
	    return new Date(year, month, 0).getDate();
	}

	//July
	// daysInMonth(7,2009); //31
	// //February
	// daysInMonth(2,2009); //28
	// daysInMonth(2,2008); //29
	
	var sel = function(dd,mm,yyyy){
		textB.value = dd + "-" + mm + "-" + yyyy;	
		
		var elem = document.getElementById("div"+ last);
		if(last!=-1){
			elem.classList.remove("highlight_current");
		}
		elem=document.getElementById("div"+ (dd-1));
		console.log(elem);
		last=dd-1;
		elem.classList.add("highlight_current");
	};



	var createBody = function(today){
		// if(calBody){
		// 	clearBox();
		// }
		console.log(dd + " " + mm + " " + yyyy);
		var numDays = daysInMonth(mm,yyyy);	
		var day = new Date(yyyy + "-" + mm + "-01").getDay()
		day = (day===0) ? 7 : day;
		// calBody.style.height = ((day+numDays)/7)*20+"px";
		for(var i=0;i<7;i++){
			var el = document.createElement("div" );
			el.appendChild(document.createTextNode(days[i]));
			//el.setAttribute("id", "div"+i+1);
			calBody.appendChild(el);
			console.log(el);
			el.style.height="20px";
			el.style.width="20px";
			el.style.display="inline";
			el.style.padding = "3.3px";
			el.style.margin = "7px";
			// document.el.appendChild(css);
		}

		
		console.log(numDays + " " + day);
		for(var i = 0;i<day;i++){
			var el = document.createElement("div");
			el.appendChild(document.createTextNode(""));
			//el.setAttribute("id", "div"+i+1);
			calBody.appendChild(el);
			console.log(el + " " + i);
			el.style.height="20px";
			el.style.width="20px";
			el.style.display="flex";
			// el.style.flex-wrap="wrap";
			el.style.padding = "3.3px";
			el.style.margin = "7px";
			//el.classList.add("highlight_today");
		}

		for(var i=0;i<numDays;i++){
			var el = document.createElement("div");
			el.setAttribute("id","div"+i);
			el.appendChild(document.createTextNode(i+1));
			calBody.appendChild(el);
			console.log(i);
			el.style.height="20px";
			el.style.width="20px";
			el.style.display="flex";
			// el.style.flex-wrap="wrap";
			el.style.padding = "3.3px";
			el.style.margin = "7px";
			el.classList.add("highlight");
			if(i==new Date().getDate()-1 && mm==new Date().getMonth()+1){
				el.classList.add("highlight_today");
			} 

			//Current Date is highlighted in red

			el.addEventListener('click',sel.bind(this,i+1,mm,yyyy));
			//console.log(new Date().getMonth());

		}

			sel(dd,mm,yyyy);

			//current selection is highlighted in black.
			


	};

	var prevFn = function(today){
		
		if(calBody){
			calBody.innerHTML = "";
		}
		
		if(mm===1){
			mm = 12;
			yyyy=yyyy-1;
		}
		else {
			mm = Number(mm)-1;
			yyyy=yyyy;
		}
			
		createBody(today);
	};

	var nextFn = function(today){
		if(calBody){
			calBody.innerHTML = "";
			}
		if(mm===12){
			mm=1;
			yyyy = yyyy+1;
		}
		else{
			mm = Number(mm)+ 1;
			yyyy = yyyy;
		}
		
		console.log(dd + " "  + mm + " " + yyyy );
		createBody(today,dd,mm,yyyy);
	}


	var init = function(calB,prev, next, textBox){

		calBody = document.getElementById(calB);
		prevB = document.getElementById(prev);
		nextB = document.getElementById(next);
		textB = document.getElementById(textBox);
		 // textB.preventDefault();


		console.log(calBody,prevB,nextB);

		var today = new Date();
		dd = today.getDate();
		mm = today.getMonth()+1; //January is 0!
		yyyy = today.getFullYear();
		textB.defaultValue = dd + "-" + mm + "-" + yyyy;
		if(dd<10) {
		    dd='0'+dd;
		} 

		if(mm<10) {
		    mm='0'+mm;
		} 
		today = mm+'/'+dd+'/'+yyyy;
		
		createBody(today);
		prevB.addEventListener('click',prevFn.bind(this,today));
		nextB.addEventListener('click',nextFn.bind(this,today));
	};

	return{
		init : init,
	};
	})();