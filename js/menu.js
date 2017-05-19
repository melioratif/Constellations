
var constructMenu = function()
{      
        document.getElementById("buttonview").addEventListener("click", function() {myF("viewDrop");}, false);

        document.getElementById("buttonstars").addEventListener("click", function() {

                        var scene= getCurrentScene();
                        var camera = scene.activecamera;
                        scene.removeMesh(scene.getActiveMeshes());
                        scene.removeMaterial

                        for (key in  CONSTELLATIONS.getAll()){
                                var cons = CONSTELLATIONS.get(key);
 
                                if (document.getElementById("buttonstars").textContent === "Show All Stars")
                                        cons.drawAllStars(scene);
                                else    
                                        cons.drawConstellationStars(scene);
                        }
                        if (document.getElementById("buttonstars").textContent === "Show All Stars")
                                document.getElementById("buttonstars").textContent = "Show All Stars"
                        else    
                                document.getElementById("buttonstars").textContent = "Hide All Stars"

                }, false);


        document.getElementById("buttongobackhome").addEventListener("click", function() 
                                        {
                                                getCurrentScene().activeCamera.position = new BABYLON.Vector3(0,0,0);
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

/*******************Debug***************************/
                console.log("number of stars:",CONSTELLATIONS.get(cstname).getStarsLength());
                console.log("number of connect:",CONSTELLATIONS.get(cstname).getConnexionLength());
                var connect = CONSTELLATIONS.get(cstname).cst_connect;         
                for (var i =0; i < connect.length; i++)
                        {
                         console.log("from:",connect[i][0][h_hip],"==","to",connect[i][1][h_hip]);
                        }
                var ti = document.getElementById("textinformation");             
                ti.innerHTML = CONSTELLATIONS.get(cstname).getHTMLInfo(connect[0][0][h_hip]);
//                ti.innerHTML = CONSTELLATIONS.get(cstname).getHTMLInfo(87073);


/**********************************************/
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
                document.getElementById("renderCanvas").focus();
                document.getElementById("viewDrop").classList.remove("show");

                }
