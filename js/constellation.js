/*jshint loopfunc: true */
/*global h_spect*/
/*global h_con*/
/*global fo_t_path*/
/*global h_hip*/
/*global h_x_rel*/
/*global h_y_rel*/
/*global h_z_rel*/
/*global h_absmag*/
/*global h_x*/
/*global h_y*/
/*global h_z*/
/*global h_bf*/
/*global h_dist_rel*/
/*global h_dist*/
/*global h_proper*/
/*global DIAGRAM_HR*/
/*global getCurrentScene*/
/*global BABYLON*/
/*global CONSTELLATIONS*/
/*global SIZE_OF_THE_SUN*/
function ConstellationsManager(rdata) {
    "use strict";
    this.constellationsArray = {};

    this.oneConstellationMode = false; // 0 means all constellation, 1 mean only one is showed
    this.showAllStars = false;
    this.drawSun = true;
    this.rawdata = rdata;
    this.currentCst = "UMa";
    this.mainNode = null;

    this.getAll = function () {
        return this.constellationsArray;
    };

    this.get = function (cstname) {
        return this.constellationsArray[cstname];
    };

    this.setCurrentToColor = function () {
        this.get(this.currentCst).ConnexionToColor();
    };

    this.setdrawAlsoEarth = function (ea) {
        this.drawEarth = ea;
    };

    this.drawAlsoSun = function () {
        var scene = getCurrentScene(),
            sun = BABYLON.Mesh.CreateSphere("SUN", 10, SIZE_OF_THE_SUN, scene),
            background = BABYLON.MeshBuilder.CreatePlane("background", {
                width: SIZE_OF_THE_SUN,
                height: SIZE_OF_THE_SUN
            }, scene, true);

        //abstractMesh
        sun.parent = this.mainNode;
        background.parent = this.mainNode;

        sun.material = new BABYLON.StandardMaterial("sunmat", scene);
        sun.material.specularColor = new BABYLON.Color3(0, 0, 0);
        sun.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        sun.material.emissiveColor = new BABYLON.Color3(0, 1, 1);
        sun.position = new BABYLON.Vector3(0, 0, 0);

        background.alpha = 0;
        background.material = new BABYLON.StandardMaterial("bck", scene);
        background.position = new BABYLON.Vector3(0, SIZE_OF_THE_SUN / 2, 0);

        background.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        background.material.diffuseTexture = new BABYLON.DynamicTexture("bck", 512, scene, false);
        background.material.specularColor = new BABYLON.Color3(0, 0, 0);
        background.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        background.material.emissiveColor = new BABYLON.Color3(0, 1, 1);

        background.material.diffuseTexture.drawText("SUN", 0, 200, "bold 200px Segoe UI", "white", "#555555");

    };

    /*

             //turn the world...
                var stars_inf = CONSTELLATIONS.get(CONSTELLATIONS.currentCst).getStatInfo()
                
                var p0 = {"x":stars_inf.mid_x, "y":stars_inf.mid_y}; 
                var c =  {"x":0, "y":0};
                var p2 =  {"x": 1, "y": 0 };
                console.log("angle = ", find_angle(p0,c,p2) * (180/Math.PI));

                CONSTELLATIONS.mainNode.rotation.x = Math.abs(find_angle(p0,c,p2));
                console.log ("=>",CONSTELLATIONS.mainNode.rotation.x * (180/Math.PI));
            
                

    */

    this.redrawAllWithOptions = function () {
        var scene = getCurrentScene(),
            c;


        while (scene.meshes.length !== 0) {
            scene.meshes[0].dispose();
        }

        var stars_inf = CONSTELLATIONS.get(CONSTELLATIONS.currentCst).getStatInfo();
        this.mainNode = new BABYLON.AbstractMesh("the world", scene);
    //    this.mainNode.position.x = stars_inf.mid_x;
    //    this.mainNode.position.y = stars_inf.mid_y;
    //    this.mainNode.position.z = stars_inf.mid_z;



        if (this.oneConstellationMode === true) {
            c = CONSTELLATIONS.get(this.currentCst);
            if (this.showAllStars === true) {
                c.drawAllStars(scene);
            } else {
                c.drawConstellationStars(scene);
            }
            c.drawConstellationConnexion(scene);



        } else {
            for (var key in CONSTELLATIONS.getAll()) {
                c = CONSTELLATIONS.get(key);
                if (this.showAllStars === true) c.drawAllStars(scene);
                else c.drawConstellationStars(scene);

                c.drawConstellationConnexion(scene);
            }

        }
        this.setCurrentToColor();

        if (this.drawSun === true) {
            this.drawAlsoSun();
        }

    };

    this.findByHyg = function (hyg) {
        var ret = [];
        for (var key in this.constellationsArray) {
            var cst = this.constellationsArray[key];
            var s = cst.contains(hyg);
            if (s.length !== 0) {
                ret.push(cst);
            }
        }
        return ret;
    };

    this.find_angle = function (p0, c, p1) {
        var p0c = Math.sqrt(Math.pow(c.x - p0.x, 2) +
            Math.pow(c.y - p0.y, 2)); // p0->c (b)   
        var p1c = Math.sqrt(Math.pow(c.x - p1.x, 2) +
            Math.pow(c.y - p1.y, 2)); // p1->c (a)
        var p0p1 = Math.sqrt(Math.pow(p1.x - p0.x, 2) +
            Math.pow(p1.y - p0.y, 2)); // p0->p1 (c)
        return Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c));
    }

    this.init = function () {
        // Stars to constellations
        for (var i = 0; i < this.rawdata.allStarsArray().length; i++) {

            var c_star = this.rawdata.allStarsArray()[i];
            if (c_star[h_spect] == 'Ap...') c_star[h_spect] = "A2";
            if (c_star[h_spect] == 'Am...') c_star[h_spect] = "A2";
            if (c_star[h_spect] == 'Am') c_star[h_spect] = "A2";
            if (c_star[h_spect] == 'Ap Si') c_star[h_spect] = "A2";
            if (c_star[h_spect] == 'A+...') c_star[h_spect] = "A2";
            if (c_star[h_spect] == 'A') c_star[h_spect] = "A2";
            if (c_star[h_spect] === undefined) continue;
            if (DIAGRAM_HR.getColor(c_star[h_spect]) == undefined) continue;


            if (!(c_star[h_con] in this.constellationsArray)) {
                if (c_star[h_con] == null) continue;
                this.constellationsArray[c_star[h_con]] = new Constellation(this.rawdata.allStarsArray()[i][h_con]);
            }
            this.constellationsArray[c_star[h_con]].all_stars.push(this.rawdata.allStarsArray()[i]);

            // spectrum filter

        }
        // Creation of link
        for (var p = 0; p < fo_t_path.length; p++) {
            var aStar = fo_t_path[p];
            this.constellationsArray[aStar[0]].fullname = aStar[1];

            for (var k = 2; k < aStar.length; k++) {
                var a = this.rawdata.allStarsArray().filter(function (val) {
                    return val[h_hip] == aStar[k];
                });
                if (a.length != 1)
                    throw "findAStars(" + aStar[0] + "=" + aStar[k] + ") : a.length is different of 1. (" + a + ")" + "(" + a.length + ")";

                var e = this.constellationsArray[aStar[0]].cst_stars;
                if (e.find(function (g) {
                        return g == a[0];
                    }) === undefined) e.push(a[0]);
            }
        }

        for (var l = 0; l < fo_t_path.length; l++) {
            var aConstell = fo_t_path[l];

            var c = this.constellationsArray[aConstell[0]];
            for (var m = 3; m < aConstell.length; m++) // 3 because, the 2 first is the name and the shortname
            {
                var from = c.cst_stars.filter(function (val) {
                    return val[h_hip] == aConstell[m - 1];
                });
                var to = c.cst_stars.filter(function (val) {
                    return val[h_hip] == aConstell[m];
                });

                c.cst_connect.push([from[0], to[0], null]);
            }
        }
    };
}


function Constellation(name) {
    this.fullname = "";
    this.shortname = name;
    this.infostat = {};
    this.all_stars = [];
    this.cst_stars = [];
    this.cst_connect = [];

    this.getStarsLength = function () {
        return this.cst_stars.length;
    };
    this.getConnexionLength = function () {
        return this.cst_connect.length;
    };

    this.resetConnexionColor = function () {
        this.setToColor(new BABYLON.Color3(1, 1, 1));
    };

    this.ConnexionToColor = function () {
        this.setToColor(new BABYLON.Color3(1, 0, 0));
    };


    this.setToColor = function (color) {
        for (var i = 0; i < this.cst_connect.length; i++) {

            var line = this.cst_connect[i][2];
            line.color = color;
        }
    };

    this.getHTMLInfo = function (hipnb) {
        var stars = this.find(hipnb);
        return "const :" + stars[h_con] + "&emsp;" +
            "x-rel,y-rel,z-rel:" + stars[h_x_rel] + "," + stars[h_y_rel] + "," + stars[h_z_rel] + "&emsp;" +
            "x,y,z:" + (stars[h_x] * 3.262).toFixed(2) + "," + (stars[h_y] * 3.262).toFixed(2) + "," + (stars[h_z] * 3.262).toFixed(2) + "&emsp;" +
            "spect :" + stars[h_spect] + "&emsp;" +
            "bf :" + stars[h_bf] + "<br>" +


            "hyg  :" + stars[h_hip] + "&emsp;" +
            "name:" + stars[h_proper] + "&emsp;" +
            "dist-rel:" + stars[h_dist_rel] + "&emsp;" +
            "dist:" + (stars[h_dist] * 3.262).toFixed(2) + " al &emsp;" +
            "absMag :" + stars[h_absmag] + "<br>" +

            "sp_name :" + DIAGRAM_HR.getName(stars[h_spect]) + "&emsp;" +
            "sp_radius :" + DIAGRAM_HR.getRadius(stars[h_spect]) + "&emsp;" +
            "sp_mass :" + DIAGRAM_HR.getMass(stars[h_spect]) + "<br>";

    };


    this.find = function (hipnb) {
        var a = this.all_stars.filter(function (val) {
            return val[h_hip] == hipnb;
        });
        if (a.length != 1)
            throw "findAStars(" + hipnb + ") : a.length is different of 1. (" + a + ")" + "(" + a.length + ")";
        return a[0];
    };

    this.drawAStars = function (scene, stars_info) {
        try {
            var star = BABYLON.Mesh.CreateSphere("SP:" + stars_info[h_hip] + ":" + stars_info[h_con], 10, SIZE_OF_THE_SUN * DIAGRAM_HR.getRadius(stars_info[h_spect]), scene);
            //Abstract Mesh
            star.parent = CONSTELLATIONS.mainNode;

            star.material = new BABYLON.StandardMaterial("SM:" + stars_info[h_hip], scene);

            var c = DIAGRAM_HR.getColor(stars_info[h_spect]);
            star.material.diffuseColor = new BABYLON.Color3(0, 0, 0); // color object
            star.material.specularColor = new BABYLON.Color3(0, 0, 0);
            star.material.emissiveColor = new BABYLON.Color3(c[0], c[1], c[2]);
            star.position = new BABYLON.Vector3(stars_info[h_x_rel], stars_info[h_y_rel], stars_info[h_z_rel]);
        } catch (err) {
            return;
        }

    };

    this.drawConstellationStars = function (scene) {
        for (var p = 0; p < this.cst_stars.length; p++) {
            var stars_info = this.cst_stars[p];
            this.drawAStars(scene, stars_info);
        }
    };

    this.drawAllStars = function (scene) {
        for (var p = 0; p < this.all_stars.length; p++) {
            var stars_info = this.all_stars[p];
            this.drawAStars(scene, stars_info);
        }
    };

    this.drawConstellationConnexion = function (scene) {
        for (var i = 0; i < this.cst_connect.length; i++) {
            var from = this.cst_connect[i][0];
            var to = this.cst_connect[i][1];
            var lines = BABYLON.Mesh.CreateLines("lines", [
                    new BABYLON.Vector3(from[h_x_rel], from[h_y_rel], from[h_z_rel]),
                    new BABYLON.Vector3(to[h_x_rel], to[h_y_rel], to[h_z_rel]),
                ], scene);

            //abstractMesh
            console.log("name 89", CONSTELLATIONS.mainNode.name);
            lines.parent = CONSTELLATIONS.mainNode;
            this.cst_connect[i][2] = lines;

        }
    };

    
    /*
    lname: "La Balance"

max_dist: 1435
max_x: -164
max_y: -152
max_z: -64
mid_x: -388.6666666666667
mid_y: -535
mid_z: -241.44444444444446
min_dist: 232
min_x: -705
min_y: -1199
min_z: -559
nb_star: 9
    
    
    */

    this.getStatInfo = function () {
        if (this.statinfo != null) return this.statinfo;

        var x = 0,
            y = 0,
            z = 0;
        var min_x =cube_stars,
            min_y =cube_stars,
            min_z =cube_stars;
        var max_x =0,
            max_y =0,
            max_z =0;
        var min_dist = this.cst_stars[0][h_dist_rel];
        var max_dist = 0;
        
        var farest_star = this.cst_stars[0];
        
        
        
        for (var i = 0; i < this.cst_stars.length; i++) {
            x += this.cst_stars[i][h_x_rel];
            y += this.cst_stars[i][h_y_rel];
            z += this.cst_stars[i][h_z_rel];
            
            if (min_dist > this.cst_stars[i][h_dist_rel]) min_dist = this.cst_stars[i][h_dist_rel];
            if (this.cst_stars[i][h_dist_rel] != cube_stars && max_dist < this.cst_stars[i][h_dist_rel]) max_dist = this.cst_stars[i][h_dist_rel];
            
            if(this.cst_stars[i][h_dist_rel] != cube_stars && farest_star[h_dist_rel] < this.cst_stars[i][h_dist_rel])farest_star =this.cst_stars[i];
            
            if (min_x > this.cst_stars[i][h_x_rel]) min_x = this.cst_stars[i][h_x_rel];
            if (min_y > this.cst_stars[i][h_y_rel]) min_y = this.cst_stars[i][h_y_rel];
            if (min_z > this.cst_stars[i][h_z_rel]) min_z = this.cst_stars[i][h_z_rel];
            if (this.cst_stars[i][h_dist_rel] != cube_stars && max_x < this.cst_stars[i][h_x_rel]) max_x = this.cst_stars[i][h_x_rel];
            if (this.cst_stars[i][h_dist_rel] != cube_stars && max_y < this.cst_stars[i][h_y_rel]) max_y = this.cst_stars[i][h_y_rel];
            if (this.cst_stars[i][h_dist_rel] != cube_stars && max_z < this.cst_stars[i][h_z_rel]) max_z = this.cst_stars[i][h_z_rel];
        }
        x = x / this.cst_stars.length;
        y = y / this.cst_stars.length;
        z = z / this.cst_stars.length;

        this.statinfo = {
            "fullname": this.fullname,
            "shortname": this.shortname,
            "nb_star": this.cst_stars.length,
            "mid_x": x,
            "mid_y": y,
            "mid_z": z,
            "max_x": max_x,
            "max_y": max_y,
            "max_z": max_z,
            "min_x": min_x,
            "min_y": min_y,
            "min_z": min_z,
            "min_dist": min_dist,
            "max_dist": max_dist,
            "farest_cst_star":farest_star
        };
        console.log(":",this.statinfo);
        console.log(":>",this.cst_stars);
        return this.statinfo;
    };
}
