//http://www.atlasoftheuniverse.com/startype.html
//https://en.wikipedia.org/wiki/Stellar_classification#Spectral_types
//http://www.handprint.com/ASTRO/specclass.html


function DiagramHR(){


        this.getColor=function(spect){
                var a = this.color[spect[0]]; // we take the first letter for the color.
                 if (a == null)
                 {
                  //       console.log(   "[FILE : diagramHR][getSpectrumClass] Impossible to find the spectrum Class for the spect : "+ spect);
                        return undefined; 
                 }
                return a;
                }
        this.color = {
                        "A":[0.7922,0.84,1],
                        "B":[0.66,0.74,1],
                        "W":[0.66,0.74,1],
                        "O":[0.6156,0.7058,1],
                        "F":[0.9843,0.9725,1],
                        "G":[1,0.9568,0.909],
                        "K":[1,0.866,0.7450],
                        "M":[1,0.7333,0.4823],
                        "C":[1,0.3255 ,0  ],
                        "S":[1,0.5764,0.1725 ],
                        "L":[0.5529,0.078 ,0  ],
                        "T":[0.3176,0   ,0,101 ],
                        "Y":[0.066,0.066  ,0.066 ],
                        "D":[0.5098,0.5450,0.64]
                      };

/*        this.color = {
                        "A":[202,216,255],
                        "B":[170,191,255],
                        "W":[170,191,255],
                        "O":[157,180,255],
                        "F":[251,248,255],
                        "G":[255,244,232],
                        "K":[255,221,190],
                        "M":[255,187,123],
                        "C":[255,83 ,0  ],
                        "S":[255,147,44 ],
                        "L":[141,20 ,0  ],
                        "T":[81,0   ,26 ],
                        "Y":[17,17  ,17 ],
                        "D":[130,139,164]
                      };*/
        this.getName=function(spect){
                        
                var a = this.nameClass[spect[0]]; // we take the first letter for the color.
                if (a == null)
                   return undefined; 
                return a;
                }
        
        this.nameClass = {
                        "W":"Wolf-Rayet",
                        "A": "Massive",
                        "B": "Large",
                        "O":"super massive",
                        "F":"solar type",
                        "G":"solar type",
                        "K":"solar type",
                        "M":"sub solar",
                        "C":"carbon star",
                        "S":"sub carbon star",
                        "L":"hot brown dwarf",
                        "T":"cool brown dwarf",
                        "Y":"gas giant",
                        "D":"none"
                        }

        this.getSpectrumClass=function(spect){//2
                        
                var a = null;
                if (spect[0] == 'A' || spect[0]=='B') // we take the first letter for the color.
                        a = this.spectrumClass[spect.substring(0,2)];
                else 
                        a = this.spectrumClass[spect[0]];
                if (a == null)
                   {                         
                        return undefined; 
                   } 

                return a;
                }

        this.getRadius=function(spect){try{ return this.getSpectrumClass(spect)[1];} catch(err) {throw "error, undefined spect;"}}
        this.getMass=function(spect){return this.getSpectrumClass(spect)[0];}

        this.spectrumClass = {
                        "A0":[2.40,1.87],
                        "A1":[2.30,1.80],  // from my mind
                        "A2":[2.19,1.78],
                        "A3":[2.00,1.74], // from my mind
                        "A4":[1.91,1.72], // from my mind
                        "A5":[1.86,1.69],
                        "A6":[1.80,1.66],
                        "A7":[1.74,1.63],
                        "A8":[1.66,1.60],
                        "A9":[1.62,1.55],
                        "B0":[17.00,10.0],
                        "B1":[13.21,6.42],
                        "B2":[9.11,5.33],
                        "B3":[7.60,4.80],
                        "B4":[6.75,4.25],
                        "B5":[5.90,3.90],
                        "B6":[5.17,3.56],
                        "B7":[4.45,3.28],
                        "B8":[3.80,3.00],
                        "B9":[3.29,2.70],
                        "W" :[20,12.5],
                        "O"  :[84,6.6],
                        "F"  :[1.325,1.275],
                        "G"  :[0.925,1.055],
                        "K"  :[0.65,0.83],
                        "M"  :[0.285,0.7],
//                        "C"  :[1.1,385], // this is bizarre ?? 385 ??
                        "C"  :[1.1,1.1],
                        "S"  :[0.8,0.7],
                        "L"  :[0.2625,0.2],
                        "T"  :[37.506,0.2],
                        "Y"  :[6.006,0.15],
                        "D"  :[0.735,0.014]
                                    }
}
