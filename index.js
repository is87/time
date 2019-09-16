months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  mon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var db;
var dateString

  window.addEventListener("load", () =>{
      console.log("Page loaded...");
      //loadJSON();
      //registerSW();
      init();
  });

  function toMinutes(str){
    a = str.indexOf(":");
    h = str.substring(0, a);
    m = str.substr(a+1);
    if(a==-1)return parseInt(m*60);
    return parseInt(h*60) + parseInt(m);
  }
  function toHours(str){
    h = parseInt(str/60);
    m = parseInt(str%60);
    return h+":"+addZero(m);
  }

function about(){
  if(document.getElementById("aboutBox").style.display == "none"){
    document.getElementById("aboutBox").style.display = "block";
  }else{
    document.getElementById("aboutBox").style.display = "none";
  }
}

function save(){
  thisDate = new Object();
  thisDate["date"] = dateString;
  thisDate["hours"] = toMinutes(document.getElementById("stat1").value);
  thisDate["ldcHours"] = toMinutes(document.getElementById("stat2").value);
  thisDate["publications"] = document.getElementById("stat3").value;
  thisDate["movies"] = document.getElementById("stat4").value;
  thisDate["returnVisits"] = document.getElementById("stat5").value;
  thisDate["studies"] = document.getElementById("stat6").value;
  thisDate["comments"] = document.getElementById("stat7").value;
  if(document.getElementById("saveButton").value == "Save"){
    db.dates.push(thisDate);
  }else{
    ds = db.dates;
    for(i=0;i<ds.length;i++){
      if(dateString==ds[i].date){
        db.dates.splice(i, 1, thisDate);
      }
    }
  }
  localStorage.setItem("data", JSON.stringify(db));
  console.log(localStorage.getItem("data"));
  document.getElementById("modal").style.display = "none";
}



function showSettings(){
  document.getElementById("modal2").style.display = "block";
  document.getElementById("profileSelect").value = db["profile"];
}

function updateProfile(){
  db["profile"] = document.getElementById("profileSelect").value;
  localStorage.setItem("data", JSON.stringify(db));
  hideSettings();
}

function deleteAll(){
  localStorage.clear();
  db = new Object();
  db["profile"] = "Publisher";
  db.dates = [];
}

function hideModal(){
  document.getElementById("modal").style.display = "none";
}

function hideSettings(){
  document.getElementById("modal2").style.display = "none";
}

  function growBox(){
    dayBox.style.position = "absolute";
    dayBox.style.left = (parseInt(dayBox.style.left) + dX) + "px";
    dayBox.style.top = (parseInt(dayBox.style.top) + dY) + "px";
    dayBox.style.width = (parseInt(dayBox.style.width) + dW) + "px";
    dayBox.style.height = (parseInt(dayBox.style.height) + dH) + "px";
    if((parseInt(dayBox.style.width))>=stopW){
      clearInterval(myGrowAni);
      dayBox.style.left = stopX+"px";
      dayBox.style.top = stopY+"px";
      dayBox.style.width = stopW+"px";
      dayBox.style.height = stopH+"px";
      loadDay(thisYear, thisMonth, thisDay);
    }
  }

  function backToMonth(){
    loadMonth(thisYear, thisMonth, thisDay);
  }

  function seeToday(){
    loadDay(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function seeThisMonth(){
    loadMonth(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function loadThisOverview(){
    loadOverview(today.getFullYear(), today.getMonth(), today.getDate());
  }

  function clickDay(evt) {
    if(evt.target.myParam == undefined){
      pressedDiv = evt.target.parentElement;
    }else{
      pressedDiv = evt.target;
    }
    thisDay = pressedDiv.myParam;
    loadDay(thisYear, thisMonth, thisDay);
  }

  function loadDay(year, month, day){
    document.getElementById("modal").style.display = "block";
    var d = new Date(year, month, day);
    wday = weekdays[d.getDay()];
    dateString = year+"-"+addZero(month+1)+"-"+addZero(day);
    document.getElementById("statDate").innerHTML = wday + ", " + months[month] + " " + day;
    ds = db.dates;
    hit = false;
    document.getElementById("stat1").value = "";
        document.getElementById("stat2").value = "";
        document.getElementById("stat3").value = "";
        document.getElementById("stat4").value = "";
        document.getElementById("stat5").value = "";
        document.getElementById("stat6").value = "";
        document.getElementById("stat7").value = "";
    document.getElementById("saveButton").value = "Save";
    for(i=0;i<ds.length;i++){
      if(dateString==ds[i].date){
        hit = true;
        document.getElementById("stat1").value = ds[i]["hours"];
        document.getElementById("stat2").value = ds[i]["ldcHours"];
        document.getElementById("stat3").value = ds[i]["publications"];
        document.getElementById("stat4").value = ds[i]["movies"];
        document.getElementById("stat5").value = ds[i]["returnVisits"];
        document.getElementById("stat6").value = ds[i]["studies"];
        document.getElementById("stat7").value = ds[i]["comments"];
        document.getElementById("saveButton").value = "Update";
      }
    }
  }

  function addZero(a){
    if(a<10)a="0"+a;
    return a;
  }

  function subtractZero(a){
    if(a.length > 1 && a.substr(0, 1) == "0")a=a.substr(1);
    return a;
  }

  function numberth(number){
    if(number%10==1 && (number < 10 || number > 20) ) return number + "st";
    if(number%10==2 && (number < 10 || number > 20) )return number + "nd";
    if(number%10==3 && (number < 10 || number > 20) )return number + "rd";
    return number + "th";
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}



  function init(){
    if(!localStorage.getItem('data')) {
      console.log("Nothing stored. Setting up database...");
      db = new Object();
      db["profile"] = "Publisher";
      db.dates = [];
    }else{
      db = JSON.parse(localStorage.getItem('data'));
      console.log(JSON.stringify(db, null, 2));
    }
    today = new Date();
    thisYear = today.getFullYear();
    thisMonth = today.getMonth();
    thisDay = today.getDate();
    w = window.innerWidth;
    h = window.innerHeight;
    if(h<w)w=h;
    navBox = document.getElementById("navBox");
    monthBox = document.getElementById("monthBox");
    overviewBox = document.getElementById("overviewBox");

//var mc = new Hammer(monthBox);
//var mc2 = new Hammer(dayBox);

//mc.add( new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL, threshold: 10 }) );

/*mc.on("swipeleft", function(ev) {
    loadMonth(nextYear, nextMonth, 1);
});

mc.on("swiperight", function(ev) {
    loadMonth(prevYear, prevMonth, 1);
});*/





    loadMonth(thisYear, thisMonth, thisDay);

  }

function loadOverview(year, month, day){
  w = window.innerWidth;
    h = window.innerHeight;
    if(h<w)w=h;
    
    overviewBox.style.display = "block";
    monthBox.style.display = "none";
    overviewBox.innerHTML = "";
    var d = new Date(year, month, day);
    var first = new Date(d.getFullYear(), d.getMonth(), 1);
    var da = new Date(d.getFullYear(), d.getMonth()+1, 0);
    var dagar = da.getDate();
    thisMonth = month;

    prevYear = d.getFullYear();
    prevMonth = d.getMonth()-1;
    if(prevMonth==-1){
      prevMonth = 11;
      prevYear -= 1;
    }
    nextYear = d.getFullYear();
    nextMonth = d.getMonth()+1;
    if(nextMonth==12){
      nextMonth = 0;
      nextYear += 1;
    }
    navButtonSize = (window.innerWidth-50)/3;


    navBox.innerHTML = "<span onClick='loadOverview("+prevYear+", "+prevMonth+", 1);'>&lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='font-weight:bold;'>" +  months[d.getMonth()].toUpperCase() + "</span> <span style='font-weight:lighter;'>" + d.getFullYear()+"</span><span onClick='loadOverview("+nextYear+", "+nextMonth+", 1);'>&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;</span>";
    var shortDateString = year+"-"+addZero(month+1);
    ds = db.dates;
    var hours = 0;
    var ldc = 0;
    var pubs = 0;
    var movies = 0;
    var rv = 0;
    var studies = 0;
    for(i=0;i<ds.length;i++){
      if(ds[i]["date"].indexOf(shortDateString) != -1){
        hours += parseInt(ds[i].hours);
        ldc += parseInt(ds[i].ldcHours);
        if(ds[i].publications!="")pubs += parseInt(ds[i].publications);
        if(ds[i].movies!="")movies += parseInt(ds[i].movies);
        if(ds[i].returnVisits!="")rv += parseInt(ds[i].returnVisits);
        if(ds[i].studies!="")studies += parseInt(ds[i].studies);
      }
    }
    document.getElementById("overviewBox").innerHTML += "Hours: "+toHours(hours)+"<br>";
    document.getElementById("overviewBox").innerHTML += "LDC Hours: "+toHours(ldc)+"<br>";
    document.getElementById("overviewBox").innerHTML += "Publications: "+pubs+"<br>";
    document.getElementById("overviewBox").innerHTML += "Movies: "+movies+"<br>";
    document.getElementById("overviewBox").innerHTML += "Return visits: "+rv+"<br>";
    document.getElementById("overviewBox").innerHTML += "Studies: "+studies+"<br>";
}
  

  function loadMonth(year, month, day){
    w = window.innerWidth;
    h = window.innerHeight;
    if(h<w)w=h;
    
    overviewBox.style.display = "none";
    monthBox.style.display = "block";
    monthBox.innerHTML = "";
    var d = new Date(year, month, day);
    var first = new Date(d.getFullYear(), d.getMonth(), 1);
    var da = new Date(d.getFullYear(), d.getMonth()+1, 0);
    var dagar = da.getDate();
    thisMonth = month;

    prevYear = d.getFullYear();
    prevMonth = d.getMonth()-1;
    if(prevMonth==-1){
      prevMonth = 11;
      prevYear -= 1;
    }
    nextYear = d.getFullYear();
    nextMonth = d.getMonth()+1;
    if(nextMonth==12){
      nextMonth = 0;
      nextYear += 1;
    }
    navButtonSize = (window.innerWidth-50)/3;


    navBox.innerHTML = "<span onClick='loadMonth("+prevYear+", "+prevMonth+", 1);'>&lt;&lt;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style='font-weight:bold;'>" +  months[d.getMonth()].toUpperCase() + "</span> <span style='font-weight:lighter;'>" + d.getFullYear()+"</span><span onClick='loadMonth("+nextYear+", "+nextMonth+", 1);'>&nbsp;&nbsp;&nbsp;&nbsp;&gt;&gt;</span>";

    boxWidth = (w-50)/7;
    boxCC = boxWidth+5;

    monthBox.innerHTML = "<table style='table-layout: fixed; border-spacing:0; margin:0; padding:0; font-size:10px; color: #555; text-align: center; position: absolute; left: 5px; top: 10px; width:"+(w-10)+"px;'><tr style='font-weight:bold;'><td>MON</td><td>TUE</td><td>WED</td><td>THU</td><td>FRI</td><td>SAT</td><td>SUN</td></tr></table>";
    var start = first.getDay();
    //monthBox.innerHTML = months[d.getMonth()];
    var week = 0;
    var dag = start;
    if(dag==0)dag=7;
    var div = document.createElement('div');
    //var x = data.events;

    for (i = 1; i <= dagar; i++) {
      var thisDiv = document.createElement('div');
      var dateString = year+"-"+addZero(month+1)+"-"+addZero(i);
      thisDiv.style.width = boxWidth+"px";
      thisDiv.style.height = boxWidth+"px";
      thisDiv.style.position = "absolute";
      thisDiv.style.left = (dag-1)*boxCC+10+"px";
      thisDiv.style.top = week*boxCC+30+"px";
      thisDiv.style.fontSize = boxWidth/4+"px";
      //thisDiv.style.boxShadow = "2px 2px 1px #ccc";
      if(i==today.getDate() && d.getMonth() == today.getMonth() && d.getFullYear() == today.getFullYear()){
        //thisDiv.style.backgroundColor = "#bbb";
        thisDiv.style.fontWeight = "bold";
        //thisDiv.style.backgroundColor = "#eef";
        thisDiv.style.color = "#328b8c";
      }

      thisDiv.myParam = i;
      thisDiv.aWidth = boxWidth;
      
      thisDiv.aHeight = boxWidth;
      thisDiv.aLeft = (dag-1)*boxCC+10;
      thisDiv.aTop = week*boxCC+50;
      thisDiv.addEventListener("click", clickDay);
      thisDiv.innerHTML = "<div style='position:absolute; left:1px; top:50%; padding:0; margin:0; -ms-transform: translateY(-50%); transform: translateY(-50%); width:100%; text-align:center;'>"+i+"</div>";
      /*for(j = 0; j < x.length; j++){
        if(x[j].date == dateString){
          if(myName != "" && JSON.stringify(x[j]).toLowerCase().indexOf(myName.toLowerCase()) != -1){
            thisDiv.style.color = "#FFFFFF";
            //thisDiv.style.backgroundColor = "#ffeeee";
            //thisDiv.firstChild.innerHTML = "- "+i+" -";
            var dot = document.createElement("div");
            dot.className = "dot";
            thisDiv.appendChild(dot);
          }
          var ring = document.createElement("div");
          ring.className = "ring";
          if(j>0){if(x[j].date == x[j-1].date)ring.className = "ring ring2";}
          if(j>1){if((x[j].date == x[j-1].date) && (x[j].date == x[j-2].date))ring.className = "ring ring3";}
          if(x[j].type == "Weekend Meeting" || x[j].type == "Midweek Meeting"){
            //thisDiv.innerHTML += "<div style='margin-bottom: 5%; width:"+boxWidth+"px; height:"+boxWidth/10+"px; background-color:#ec2c2c;'></div>";
            //thisDiv.innerHTML += "<div style='position:absolute; top:25%; left:25%;; width:50%; height:50%; border-radius:50%; background-color:transparent; border:1px solid #ec2c2c; '></div>";
          }else if(x[j].type == "Meeting for Field Service"){
            //thisDiv.innerHTML += "<div style='margin-bottom: 5%; width:"+boxWidth+"px; height:"+boxWidth/10+"px; background-color:#eca02c;'></div>";
            ring.style.borderColor = "#eca02c";
          }else{
            //thisDiv.innerHTML += "<div style='margin-bottom: 5%; width:"+boxWidth+"px; height:"+boxWidth/10+"px; background-color:#881f9b;'></div>";
            ring.style.borderColor = "#881f9b";
          }
          thisDiv.appendChild(ring);
          
        }
      }*/

      div.appendChild(thisDiv);

      dag++;
      if(dag==8){
        dag=1;
        week++;
      }
    }
    monthBox.appendChild(div);
  }