
var constructMenu = function()
{      
        document.getElementById("buttonview").addEventListener("click", function() {myF("viewDrop");}, false);
        document.getElementById("buttonselect").addEventListener("click", function() {myF("selectDrop");}, false);
        document.getElementById("myInputview").addEventListener("keyup", function() {filterFunction('viewDrop','myInputview');});
        document.getElementById("myInputselect").addEventListener("keyup", function() {filterFunction('selectDrop','myInputselect');});


//            <input type="checkbox" name="all" value=All class="dropdown-content">All<br>
        var mydropdwn = document.getElementById("selectDrop");
        var divelem = document.createElement("div");
        mydropdwn.appendChild(divelem);               
        var inputelem = document.createElement("input");
        inputelem.setAttribute("type","checkbox");
        inputelem.setAttribute("value","All");
        divelem.appendChild(inputelem);
        var txtelem = document.createTextNode("All");
        divelem.appendChild(txtelem);
        divelem.className = "dropbtn";

//    <input type="checkbox" name="none" value="None" class="dropdown-content">None<br>
        var divelem = document.createElement("div");
        mydropdwn.appendChild(divelem);               
        var inputelem = document.createElement("input");
        inputelem.setAttribute("type","checkbox");
        inputelem.setAttribute("value","None");
        divelem.appendChild(inputelem);
        var txtelem = document.createTextNode("None");
        divelem.appendChild(txtelem);
        divelem.className = "dropbtn";

        var short = [];
        for(key in CONSTELLATIONS.getAll()){short.push(key);}
        short = short.sort();
        for(i in short)
        {
                var constel = CONSTELLATIONS.get(short[i]);
                var divelem = document.createElement("div");
                mydropdwn.appendChild(divelem);               
                var inputelem = document.createElement("input");
                inputelem.setAttribute("type","checkbox");
                inputelem.setAttribute("value",constel.shortname);
                divelem.appendChild(inputelem);
                var txtelem = document.createTextNode(constel.fullname+"("+constel.cst_stars.length+")");
                divelem.appendChild(txtelem);
                divelem.className = "dropbtn";

                divelem.appendChild(document.createElement("br"));
        }

        var mydropdwn = document.getElementById("viewDrop");
        for(i in short)
        {
                var constel = CONSTELLATIONS.get(short[i]);
                var divelem = document.createElement("div");
                mydropdwn.appendChild(divelem);           
                        
                // <button id="buttonview" class="dropbtn">View</button>
                var btelem = document.createElement("button");
                btelem.type = "button";
                btelem.className = "dropbtn";
                btelem.textContent = constel.fullname+"("+constel.cst_stars.length+")";
                btelem.onclick = function(j) { return function() { cameraOn(j); }; }(constel.shortname);

                
                divelem.appendChild(btelem);
                divelem.appendChild(document.createElement("br"));
        }


                var canvas = document.querySelector("#renderCanvas");
                canvas.addEventListener("click", function () {
                        document.getElementById("viewDrop").classList.remove("show");
                        document.getElementById("selectDrop").classList.remove("show");
                });



}

function myF(mId) {
             document.getElementById(mId).classList.toggle("show");
            document.getElementById(mId).getElementsByTagName("input")[0].focus();
        }

function filterFunction(idm,inputid) {
            var input = document.getElementById(inputid);
            var filter = input.value.toUpperCase();

            var div = document.getElementById(idm);
            var a = div.getElementsByTagName("div");
            for (var i = 0; i < a.length; i++) {
                if (a[i].textContent.toUpperCase().indexOf(filter) > -1) {
                    a[i].style.display = "";
                } else {
                    a[i].style.display = "none";
                }
            }
        }


var cameraOn=function(cstname)
        {
                stars = CONSTELLATIONS.get(cstname).cst_stars;
                var x=0,y=0,z=0;        
                for(var i = 0; i < stars.length; i++)
                {       
                        x+= stars[i][h_x_rel];
                        y+= stars[i][h_y_rel];
                        z+= stars[i][h_z_rel];
                }
                x= x/stars.length;
                y= y/stars.length;
                z= z/stars.length;
                
                
                getCurrentScene().activeCamera.setTarget(new BABYLON.Vector3(x,y,z));

                for (key in  CONSTELLATIONS.getAll()){
                      var cons = CONSTELLATIONS.get(key);
                      cons.resetConnexionColor();
                   }       
                
                CONSTELLATIONS.get(cstname).ConnexionToColor();
                }











