/*jshint loopfunc: true */
/*global document*/
/*global rotatecamera:true*/
/*global CONSTELLATIONS*/
/*global confirm*/
/*global getCurrentScene*/
/*global BABYLON*/


var cameraOn = function (cstname) {
    "use strict";
    var stars = CONSTELLATIONS.get(cstname).getStatInfo(),
        scene = getCurrentScene();
 
    scene.activeCamera.setTarget(new BABYLON.Vector3(stars.farest_cst_star[h_x_rel] / 2, stars.farest_cst_star[h_y_rel] / 2, stars.farest_cst_star[h_z_rel] / 2));
    

    
    if (scene.activeCamera.name === "ArcRotateCamera") {
        
        scene.activeCamera.setPosition(new BABYLON.Vector3(stars.farest_cst_star[h_dist_rel]*1.5 , 0, 0));
    } else {
        getCurrentScene().activeCamera.position = new BABYLON.Vector3(0, 0, 0);
    }
    for (var key in CONSTELLATIONS.getAll()) {
        var cons = CONSTELLATIONS.get(key);
        cons.resetConnexionColor();
    }

    CONSTELLATIONS.get(cstname).ConnexionToColor();
    document.getElementById("renderCanvas").focus();
    document.getElementById("viewDrop").classList.remove("show");
};




var constructMenu = function () {
    'use strict';
    document.getElementById("buttonview").addEventListener("click", function () {
        document.getElementById("viewDrop").classList.toggle("show");
        document.getElementById("viewDrop").getElementsByTagName("input")[0].focus();
    }, false);
    document.getElementById("buttonrotate").addEventListener("click", function () {
        rotatecamera = !rotatecamera;

    }, false);



    document.getElementById("buttonstars").addEventListener("click", function () {
        if (document.getElementById("buttonstars").textContent === "Show All Stars") {
            if (CONSTELLATIONS.oneConstellationMode === false && !confirm('Warning, ShowAll mode. Are you shure you want to show all stars ?')) {
                return;
            }
            document.getElementById("buttonstars").textContent = "Hide All Stars";
            CONSTELLATIONS.showAllStars = true;
        } else {
            document.getElementById("buttonstars").textContent = "Show All Stars";
            CONSTELLATIONS.showAllStars = false;
        }

        CONSTELLATIONS.redrawAllWithOptions();

    }, false);

    document.getElementById("buttononeconst").addEventListener("click", function () {

        if (document.getElementById("buttononeconst").textContent === "Show current Constellation") {
            if (CONSTELLATIONS.showAllStars) {
                if (!confirm('Warning, ShowAll mode. Are you shure you want to show all stars ?')) {
                    return;
                }
            }
            document.getElementById("buttononeconst").textContent = "Set All Constellation";
            CONSTELLATIONS.oneConstellationMode = true;
            cameraOn(CONSTELLATIONS.currentCst);
            
            
        } else {
            document.getElementById("buttononeconst").textContent = "Show current Constellation";
            CONSTELLATIONS.oneConstellationMode = false;
        }
        CONSTELLATIONS.redrawAllWithOptions();
           
        
    }, false);

    document.getElementById("buttoncamera").addEventListener("click", function () {

        if (document.getElementById("buttoncamera").textContent === "Free Camera") {
            getCurrentScene().setActiveCameraByName("FreeCamera");
            document.getElementById("buttoncamera").textContent = "Rotate Camera";
            document.getElementById("buttonrotate").style.display = "none";
            rotatecamera = false;
        } else {
            getCurrentScene().setActiveCameraByName("ArcRotateCamera");
            cameraOn(CONSTELLATIONS.currentCst);
            document.getElementById("buttoncamera").textContent = "Free Camera";
            document.getElementById("buttonrotate").style.display = "";
        }
    }, false);


    document.getElementById("buttongobackhome").addEventListener("click", function () {
        if (getCurrentScene().activeCamera.name == "ArcRotateCamera") {
            getCurrentScene().activeCamera.setPosition(new BABYLON.Vector3(0, 0, 0));
        } else {
            getCurrentScene().activeCamera.position = new BABYLON.Vector3(0, 0, 0);
            var stars = CONSTELLATIONS.get(CONSTELLATIONS.currentCst).getStatInfo();
            getCurrentScene().activeCamera.setTarget(new BABYLON.Vector3(stars.farest_cst_star[h_x_rel] / 2, stars.farest_cst_star[h_y_rel] / 2, stars.farest_cst_star[h_z_rel] / 2));
        }
        document.getElementById("renderCanvas").focus();
    }, false);


    document.getElementById("myInputview").addEventListener("keyup", function () {
        filterFunction('viewDrop', 'myInputview');
    });

    var short = [];
    for (var key in CONSTELLATIONS.getAll()) {
        short.push(key);
    }
    short = short.sort(function (a, b) {
        return CONSTELLATIONS.get(b).getStarsLength() - CONSTELLATIONS.get(a).getStarsLength();
    });

    var mydropdwn = document.getElementById("viewDrop");
    for (var i in short) {
        var constel = CONSTELLATIONS.get(short[i]);
        var divelem = document.createElement("div");
        mydropdwn.appendChild(divelem);

        // <button id="buttonview" class="dropbtn">View</button>
        var btelem = document.createElement("button");
        btelem.type = "button";
        btelem.className = "dropbtn";
        btelem.textContent = constel.fullname + "(" + constel.cst_stars.length + ")";
        btelem.onclick = function (j) {
            return function () {
                CONSTELLATIONS.currentCst = j;
                CONSTELLATIONS.redrawAllWithOptions();
                cameraOn(j);
                document.getElementById("buttongobackhome").click();
            };
        }(constel.shortname);


        divelem.appendChild(btelem);
        divelem.appendChild(document.createElement("br"));
    }


    var canvas = document.querySelector("#renderCanvas");
    canvas.addEventListener("click", function () {
        document.getElementById("viewDrop").classList.remove("show");
    });
};

function filterFunction(idm, inputid) {
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
