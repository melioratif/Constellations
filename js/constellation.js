function ConstellationsManager(rdata) {

    this.constellationsArray = {};

    this.oneConstellationMode = false; // 0 means all constellation, 1 mean only one is showed
    this.showAllStars = false;
    this.drawSun = true;
    this.rawdata = rdata;
    this.currentCst = "UMa";

    this.getAll = function () {
        return this.constellationsArray;
    }
    this.get = function (cstname) {
        return this.constellationsArray[cstname];
    }

    this.setCurrentToColor = function () {
        this.get(this.currentCst).ConnexionToColor();
    }

    this.setdrawAlsoEarth = function (ea) {
        this.drawEarth = ea;
    }

    this.drawAlsoSun = function () {
        var scene = getCurrentScene();
        var sun = BABYLON.Mesh.CreateSphere("SUN", 10, SIZE_OF_THE_SUN, scene);
        sun.material = new BABYLON.StandardMaterial("sunmat", scene);
        sun.material.specularColor = new BABYLON.Color3(0, 0, 0);
        sun.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        sun.material.emissiveColor = new BABYLON.Color3(0, 1, 1);
        sun.position = new BABYLON.Vector3(0, 0, 0);

        var background = BABYLON.MeshBuilder.CreatePlane("background", {
            width: SIZE_OF_THE_SUN,
            height: SIZE_OF_THE_SUN
        }, scene, true);
        background.alpha = 0;
        background.material = new BABYLON.StandardMaterial("bck", scene);
        background.position = new BABYLON.Vector3(0, SIZE_OF_THE_SUN / 2, 0);

        background.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;
        background.material.diffuseTexture = new BABYLON.DynamicTexture("bck", 512, scene, false);
        background.material.specularColor = new BABYLON.Color3(0, 0, 0);
        background.material.diffuseColor = new BABYLON.Color3(1, 1, 1);
        background.material.emissiveColor = new BABYLON.Color3(0, 1, 1);

        background.material.diffuseTexture.drawText("SUN", 0, 200, "bold 200px Segoe UI", "white", "#555555");

    }


    this.redrawAllWithOptions = function () {
        var scene = getCurrentScene();
        while (scene.meshes.length != 0) {
            scene.meshes[0].dispose();
        }


        if (this.oneConstellationMode == true) {
            var c = CONSTELLATIONS.get(this.currentCst);
            if (this.showAllStars == true)
                c.drawAllStars(scene);
            else
                c.drawConstellationStars(scene);

            c.drawConstellationConnexion(scene);

        } else {
            for (key in CONSTELLATIONS.getAll()) {
                var c = CONSTELLATIONS.get(key);
                if (this.showAllStars == true) c.drawAllStars(scene);
                else c.drawConstellationStars(scene);

                c.drawConstellationConnexion(scene);
            }

        }
        this.setCurrentToColor();

        if (this.drawSun == true) {
            this.drawAlsoSun();
        }

    }

    this.findByHyg = function (hyg) {
        var ret = [];
        for (key in constellationsArray) {
            var cst = constellationsArray[key];
            var s = cst.contains(hyg);
            if (s.length != 0) {
                ret.push(cst);
            }
        }
        return ret;
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
            if (c_star[h_spect] == undefined) continue;
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

            for (var i = 2; i < aStar.length; i++) {
                var a = this.rawdata.allStarsArray().filter(function (val) {
                    return val[h_hip] == aStar[i];
                });
                if (a.length != 1)
                    throw "findAStars(" + aStar[0] + "=" + aStar[i] + ") : a.length is different of 1. (" + a + ")" + "(" + a.length + ")";

                var e = this.constellationsArray[aStar[0]].cst_stars;
                if (e.find(function (g) {
                        return g == a[0]
                    }) == undefined) e.push(a[0]);
            }
        }

        for (var p = 0; p < fo_t_path.length; p++) {
            var aConstell = fo_t_path[p];

            var c = this.constellationsArray[aConstell[0]];
            for (var i = 3; i < aConstell.length; i++) // 3 because, the 2 first is the name and the shortname
            {
                var from = c.cst_stars.filter(function (val) {
                    return val[h_hip] == aConstell[i - 1];
                });
                var to = c.cst_stars.filter(function (val) {
                    return val[h_hip] == aConstell[i];
                });

                c.cst_connect.push([from[0], to[0], null]);
            }
        }
    }
}


function Constellation(name) {
    this.fullname = "";
    this.shortname = name;
    this.infostat = {};
    //        this.middle_stars = 0;
    this.all_stars = [];
    this.cst_stars = [];
    this.cst_connect = [];

    this.getStarsLength = function () {
        return this.cst_stars.length;
    }
    this.getConnexionLength = function () {
        return this.cst_connect.length;
    }

    this.resetConnexionColor = function () {
        this.setToColor(new BABYLON.Color3(1, 1, 1));
    }

    this.ConnexionToColor = function () {
        this.setToColor(new BABYLON.Color3(1, 0, 0));
    }


    this.setToColor = function (color) {
        for (var i = 0; i < this.cst_connect.length; i++) {

            var line = this.cst_connect[i][2];
            line.color = color;
        }
    }

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

    }


    this.find = function (hipnb) {
        var a = this.all_stars.filter(function (val) {
            return val[h_hip] == hipnb;
        });
        if (a.length != 1)
            throw "findAStars(" + hipnb + ") : a.length is different of 1. (" + a + ")" + "(" + a.length + ")";
        return a[0];
    }

    this.drawAStars = function (scene, stars_info) {
        try {
            var sun = BABYLON.Mesh.CreateSphere("SP:" + stars_info[h_hip] + ":" + stars_info[h_con], 10, SIZE_OF_THE_SUN * DIAGRAM_HR.getRadius(stars_info[h_spect]), scene);
            sun.material = new BABYLON.StandardMaterial("SM:" + stars_info[h_hip], scene);

            var c = DIAGRAM_HR.getColor(stars_info[h_spect]);
            sun.material.diffuseColor = new BABYLON.Color3(0, 0, 0); // color object
            sun.material.specularColor = new BABYLON.Color3(0, 0, 0);
            sun.material.emissiveColor = new BABYLON.Color3(c[0], c[1], c[2]);
            sun.position = new BABYLON.Vector3(stars_info[h_x_rel], stars_info[h_y_rel], stars_info[h_z_rel])
        } catch (err) {
            return;
        }

    }

    this.drawConstellationStars = function (scene) {
        for (var p = 0; p < this.cst_stars.length; p++) {
            var stars_info = this.cst_stars[p];
            this.drawAStars(scene, stars_info);
        }
    }

    this.drawAllStars = function (scene) {
        for (var p = 0; p < this.all_stars.length; p++) {
            var stars_info = this.all_stars[p];
            this.drawAStars(scene, stars_info);
        }
    }

    this.drawConstellationConnexion = function (scene) {
        for (var i = 0; i < this.cst_connect.length; i++) {
            var from = this.cst_connect[i][0];
            var to = this.cst_connect[i][1];
            var lines = BABYLON.Mesh.CreateLines("lines", [
                    new BABYLON.Vector3(from[h_x_rel], from[h_y_rel], from[h_z_rel]),
                    new BABYLON.Vector3(to[h_x_rel], to[h_y_rel], to[h_z_rel]),
                ], scene);
            this.cst_connect[i][2] = lines;

        };
    }


    this.getStatInfo = function () {
        if (this.statinfo != null) return this.statinfo;

        var x = 0,
            y = 0,
            z = 0;
        var min_dist = this.cst_stars[0][h_dist_rel];
        var max_dist = 0;
        for (var i = 0; i < this.cst_stars.length; i++) {
            x += this.cst_stars[i][h_x_rel];
            y += this.cst_stars[i][h_y_rel];
            z += this.cst_stars[i][h_z_rel];
            if (min_dist > this.cst_stars[i][h_dist_rel]) min_dist = this.cst_stars[i][h_dist_rel];
            if (max_dist < this.cst_stars[i][h_dist_rel]) max_dist = this.cst_stars[i][h_dist_rel];
        }
        x = x / this.cst_stars.length;
        y = y / this.cst_stars.length;
        z = z / this.cst_stars.length;

        this.statinfo = {
            "mid_x": x,
            "mid_y": y,
            "mid_z": z,
            "min_dist": min_dist,
            "max_dist": max_dist
        };
        return this.statinfo;
    }


}
