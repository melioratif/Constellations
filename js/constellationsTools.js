
/*
column's id of hyg datas
*/
var h_id = 0; 
var h_hip = 1;
var h_hd = 2;
var h_hr = 3;
var h_gl = 4;
var h_bf = 5;
var h_proper  = 6;
var h_ra  = 7;
var h_dec = 8;
var h_dist = 9;
var h_pmra = 10;
var h_pmdec = 11;
var h_rv = 12;
var h_mag = 13;
var h_absmag = 14;
var h_spect = 15;
var h_ci = 16;
var h_x = 17;
var h_y = 18;
var h_z = 19;
var h_vx = 20;
var h_vy = 21;
var h_vz = 22;
var h_rarad = 23;
var h_decrad = 24;
var h_pmrarad = 25;
var h_pmdecrad = 26;
var h_bayer = 27;
var h_flam = 28;
var h_con = 29;
var h_comp = 30;
var h_comp_primary = 31;
var h_base = 32;
var h_lum = 33;
var h_dist_rel = 34;
var h_x_rel = 35;
var h_y_rel = 36;
var h_z_rel = 37;
/**************************************************************************/
// variable presentation
var cube_stars = 1000; // all stars will be inside a cube of cube_stars.

/**************************************************************************/
/*******Simplify data: all constellations stars***/
var cst_hyg_data = {
                        farest_stars : 0,
                        middle_stars : 0,
                        data : []};
/**************************************************************************/
var getNumberOfStars = function(cstname,starsE){
        var e = selectConstellationsStars(cstname,starsE)
        return e.length;


}
/**************************************************************************/
var constructConstData = function(){
        for (var p = 0; p < fo_t_path.length; p++)
                {
                        var aStar = fo_t_path[p];
                        for (var i = 2; i < aStar.length; i++)
                        {
                           var a = cst_hyg_data.data.filter(function(val) { return val[h_hip] ==aStar[i];});
                           if (a.length == 0)
                                cst_hyg_data["data"].push(findAStars(aStar[i],all_hyg_data));
                        }
                }
}
/*************************************************/
var computeDistanceAndFarestStars=function(starsE)
{
        var farest = 0;
        var numbofst = 0
        var middle_stars = 0;
        for (var i=0; i <starsE.data.length; i++)
        {
            if (starsE.data[i][h_dist] >= 10000000) continue;
            if (Math.abs(starsE.data[i][h_dist]) > farest) farest = Math.abs(starsE.data[i][h_dist]);    
            middle_stars+=  starsE.data[i][h_dist]*3.262;
            numbofst+=1;// because of the if continue;
        }
        starsE["farest_stars"] =farest; 
        starsE["middle_stars"] = middle_stars /= numbofst;
}

var addRelativityDist=function(starsE)
{
        farest = starsE["farest_stars"] ; 
        for (var i=0; i <starsE.data.length; i++)
        {
          starsE.data[i].push(Math.round((starsE.data[i][h_dist]/farest)*cube_stars));
          starsE.data[i].push(Math.round((starsE.data[i][h_x]/farest)*cube_stars));
          starsE.data[i].push(Math.round((starsE.data[i][h_y]/farest)*cube_stars));
          starsE.data[i].push(Math.round((starsE.data[i][h_z]/farest)*cube_stars));
        }
}
/********************************************************************/
/********************************************************************/
function unique(arr) {
    var hash = {}, result = [];
    for ( var i = 0, l = arr.length; i < l; ++i ) {
        if ( !hash.hasOwnProperty(arr[i]) ) { //it works with objects! in FF, at least
            hash[ arr[i] ] = true;
            result.push(arr[i]);
        }
    }
    return result;
}


/********************************************************
Find a stars in hip table.
********************************************************/
var findAStars=function(nb,starsE)
{
var a = starsE.data.filter(function(val) { return val[h_hip] ==nb;});
if (a.length != 1)
        throw "findAStars("+nb+") : a.length is different of 1. ("+ a +")"+"("+a.length+")";
return a[0];
}
/******************************************************************/
var selectConstellationsStars = function(cstname,starsE)
{
var a = starsE.data.filter(function(val) { return val[h_con] ==cstname;});
if (a.length ==0)
        throw "selectConstellationsStars() : a.length is 0 for the constellation "+cstname;
return a;
}

var drawAConstellationConnexion = function(from,to,scene){

//console.log(from);
//console.log(to);

var lines = BABYLON.Mesh.CreateLines("lines", [
    new BABYLON.Vector3(from[h_x_rel], from[h_y_rel], from[h_z_rel]),
    new BABYLON.Vector3(to[h_x_rel], to[h_y_rel], to[h_z_rel]),
], scene);
        
};

var createAStars = function(stars_info,scene)
{        

        createASphereStars(stars_info[h_x_rel],stars_info[h_y_rel],stars_info[h_z_rel],stars_info[h_hip],scene);
  //      createAVolumetricStars(x,y,z,name,scene);
};


var createASphereStars = function (x,y,z,name, scene) {

//        console.log("starsCreation : "+ sph+"(x,y,z)=> ("+x+","+y+","+z+")");

    
    var light0 = new BABYLON.PointLight("LI:"+name, new BABYLON.Vector3(x,y,z), scene);

    
    // Creating light sphere
    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var lightSphere0 = BABYLON.Mesh.CreateSphere("SP:"+name, 10, 30, scene);
    
    lightSphere0.material = new BABYLON.StandardMaterial("SM:"+name, scene);
    lightSphere0.material.diffuseColor = new BABYLON.Color3(0.5,0.7 , 0);
    lightSphere0.material.specularColor = new BABYLON.Color3(1, 0, 0);
    lightSphere0.material.emissiveColor = new BABYLON.Color3(1, 0.5, 1);

    lightSphere0.position = light0.position;    
};


var createAVolumetricStars = function () {
	var scene = new BABYLON.Scene(engine);

	//Adding a light
	var light = new BABYLON.PointLight("PL", new BABYLON.Vector3(20, 20, 100), scene);

	// Create the "God Rays" effect (volumetric light scattering)
	var godrays = new BABYLON.VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 100, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);

	// By default it uses a billboard to render the sun, just apply the desired texture
	// position and scale
	//godrays.mesh.material.diffuseTexture = new BABYLON.Texture('textures/sun.png', scene, true, false, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
	godrays.mesh.material.diffuseTexture.hasAlpha = true;
	godrays.mesh.position = new BABYLON.Vector3(-150, 150, 150);
	godrays.mesh.scaling = new BABYLON.Vector3(350, 350, 350);

	light.position = godrays.mesh.position;

	return scene;
}

