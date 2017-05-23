
var constructMenu = function()
{      
        document.getElementById("buttonview").addEventListener("click", function() {myF("viewDrop");}, false);
        document.getElementById("buttonstars").addEventListener("click", function() {


                        if (document.getElementById("buttonstars").textContent === "Show All Stars"){
                                if(CONSTELLATIONS.oneConstellationMode == false && !confirm('Warning, ShowAll mode. Are you shure you want to show all stars ?')) return; 
                                document.getElementById("buttonstars").textContent = "Hide All Stars";
                                CONSTELLATIONS.showAllStars = true;
                        }
                        else    
                        {
                                document.getElementById("buttonstars").textContent = "Show All Stars";
                                CONSTELLATIONS.showAllStars = false;
                        }

                CONSTELLATIONS.redrawAllWithOptions();

                }, false);

        document.getElementById("buttononeconst").addEventListener("click", function() 
                                {

                                if (document.getElementById("buttononeconst").textContent === "Set One Constellation Mode")
                                        {
                                        if (CONSTELLATIONS.showAllStars)
                                                if(!confirm('Warning, ShowAll mode. Are you shure you want to show all stars ?')) return; 
                                        document.getElementById("buttononeconst").textContent = "Set All Constellation Mode"
                                        CONSTELLATIONS.oneConstellationMode =  true;                               
                                        }
                                else    
                                        {
                                                document.getElementById("buttononeconst").textContent = "Set One Constellation Mode"
                                                CONSTELLATIONS.oneConstellationMode = false;                                
                                        }
                                CONSTELLATIONS.redrawAllWithOptions();
                                }, false);






        document.getElementById("buttongobackhome").addEventListener("click", function() 
                                        {
                                            cameraOn(CONSTELLATIONS.currentCst);    
                                            document.getElementById("renderCanvas").focus();
                                        },false);


        document.getElementById("myInputview").addEventListener("keyup", function() {filterFunction('viewDrop','myInputview');});

        var short = [];
        for(key in CONSTELLATIONS.getAll()){short.push(key);}
        short = short.sort(function(a, b){return CONSTELLATIONS.get(b).getStarsLength() - CONSTELLATIONS.get(a).getStarsLength();});

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
                });



}

function myF(mId) {
             document.getElementById(mId).classList.toggle("show");
            document.getElementById(mId).getElementsByTagName("input")[0].focus();
            CONSTELLATIONS.currentCst = mID;    
        }

function filterFunction(idm,inputid) {
            var input = document.getElementById(inputid);
            var filter = input.value.toUpperCase();

            var div = document.getElementById(idm);
            var a = div.getElementsByTagName("div");
            
//            var  CONSTELLATIONS.findByHyg(f);

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

                var ti = document.getElementById("textinformation");             
                ti.innerHTML = "Camera Pos:"+getCurrentScene().activeCamera.position; 

                var x=0,y=0,z=0;
                var min_dist= stars[0][h_dist_rel];        
                var max_dist= 0;        
                for(var i = 0; i < stars.length; i++)
                {       
                        x+= stars[i][h_x_rel];
                        y+= stars[i][h_y_rel];
                        z+= stars[i][h_z_rel];
                        if(min_dist > stars[i][h_dist_rel])min_dist = stars[i][h_dist_rel];
                        if(max_dist < stars[i][h_dist_rel])max_dist = stars[i][h_dist_rel];
                }
                x= x/stars.length;
                y= y/stars.length;
                z= z/stars.length;
                
                
                getCurrentScene().activeCamera.setTarget(new BABYLON.Vector3(x,y,z));
                getCurrentScene().activeCamera.setPosition(new BABYLON.Vector3(0,0,0));
//                getCurrentScene().activeCamera.radius = (max_dist+min_dist)/2;

                for (key in  CONSTELLATIONS.getAll()){
                      var cons = CONSTELLATIONS.get(key);
                      cons.resetConnexionColor();
                }       
                
                CONSTELLATIONS.get(cstname).ConnexionToColor();
                document.getElementById("renderCanvas").focus();
                document.getElementById("viewDrop").classList.remove("show");

                var ti = document.getElementById("textinformation");             
                ti.innerHTML = "Camera Pos:"+getCurrentScene().activeCamera.position; 
                }
