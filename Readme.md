This project is about constellations. how are they in 3D.

This project is only javascript static file using babylonjs and wikipedia and hygdata (http://www.astronexus.com/hyg).

More informations on https://www.melioratif.net

To see the result : github pages -> https://melioratif.github.io/Constellations/

==========================================================================================

# User Manuel

## Buttons

### Constellations 
![The Constellation Button](/images/constellationsButton.png)

All constellations are under this button. The filter can help you to find a specific one.
Once click, the camera will automatically target on it. 

Remark that the camera only turn on itself to find the constellation. It will not put the camera on 0,0,0 (sun place). 

### Go Home
![The Go Home Button](/images/goHomeButton.png)

Are you lost ? This button put the camera back at sun place 

### Show All Stars
![The Show All Button](/images/ShowAllStarsButton.png)

Toggle between only constellation stars and All stars from HYG database.
If only the current constellation is showed, only stars of the constellation will be activated.

WARNING : In data base, there are more than 120000 stars meaning you should have a good computer one if you activate that. 
(My, a lenovo yoga 2, cannot do it).


### Show Current Constellation
![The Show Current Button](/images/ShowCurrentConstellationButton.png)

Toggle between only one constellation and all. 

### Free Camera
![The Free Camera Button](/images/FreeCameraButton.png)

There are 2 tape of camera:
* One is the Free camera. Controling with UP, DOWN, RIGHT, LEFT button and the mouse. (like in a FPS)
* The other is an Arc Rotate Camera. This camera turn around a point between the constellation and the sun. 

### Auto Rotation
![The AutoRotation button](/images/AutoRotationButton.png)

If the Rotate camera is activate, this button start to turn automaticly around a point. This point is the middle distance between stars and sun. 
The sun is always represented (see below).

## KeyBoard

The space bar allow to go to the next constellation. 

