var shiftPressed = false
var projDecrement = 0.05
var farChange = 5
var nearChange = 5
var ogLeft = -1
var ogRight = 1
var ogBottom = -1
var ogTop1 = 1
var ogNear = 0.00
var ogFar = 40

function handleKeyDown(event)
{

    if(event.keyCode == 67) //c
    {
      toggleShading = (toggleShading + 1) % 3
      gl.uniform1fv(toggleShadingL, [toggleShading])


    }

    else if(event.keyCode == 87) //w
    {
        if(rotatingUp == 0)
        {
            rotatingUp = -1

        }

    }
    else if(event.keyCode == 83) //s
    {
        if(rotatingUp == 0)
        {
            rotatingUp = 1

        }

    }
    else if(event.keyCode == 81) //q
    {
        if(rotatingSwirl == 0)
        {
            rotatingSwirl = -1

        }
    }
    else if(event.keyCode == 69) //e
    {
        if(rotatingSwirl == 0)
        {
            rotatingSwirl = 1

        }

    }
    else if(event.keyCode == 65) //a
    {
        if(rotatingLeft == 0)
        {
            rotatingLeft = -1

        }

    }
    else if(event.keyCode == 68) //d
    {
        if(rotatingLeft == 0)
        {
            rotatingLeft = 1

        }

    }


    else if(event.keyCode == 27){ //Esc

        exit();

    }

    else if(event.keyCode == 67){ //Change Coloring Modes

        changeShading();
    }

    else if(event.keyCode == 86){ //Change Coloring Modes

        changeTerrainView();
    }

    else if (event.keyCode == 38) //up
    {
        acc = 0.02
        speedUp();
    }

    else if (event.keyCode == 40) //down
    {
        acc = -0.02
        slowDown();

    }


    else if (event.keyCode == 16)
    {
        shiftPressed = true
        console.log("Shift Pressed")
    }


    else if (event.keyCode == 49)
    {
        console.log("1")

        if ((shiftPressed) && ((ogLeft - left) < projDecrement * 5)){
            left -= projDecrement
        }
        else if ((!shiftPressed) && ((left - ogLeft) < projDecrement * 5)){
            left += projDecrement
        }
    }

    else if (event.keyCode == 50)
    {
        console.log("2")

        if ((shiftPressed) && ((ogRight - right) < projDecrement * 5)){
            right -= projDecrement
        }
        else if ((!shiftPressed) && ((right - ogRight) < projDecrement * 5)){
            right += projDecrement
        }
    }
    else if (event.keyCode == 51)
    {
        console.log("3")

        if ((shiftPressed) && ((ogTop1 - top1) < projDecrement * 5)){
            top1 -= projDecrement
        }
        else if ((!shiftPressed) && ((top1 - ogTop1) < projDecrement * 5)){
            top1 += projDecrement
        }
    }
    else if (event.keyCode == 52)
    {
        console.log("4")

        if ((shiftPressed) && ((ogBottom - bottom) < projDecrement * 5)){
            bottom -= projDecrement
        }
        else if ((!shiftPressed) && ((bottom - ogBottom) < projDecrement * 5)){
            bottom += projDecrement
        }
    }
    else if (event.keyCode == 53)
    {
        console.log("5")

        if ((shiftPressed) && ((ogNear - near) < nearChange * 0)){
            near -= nearChange
        }
        else if ((!shiftPressed) && ((near - ogNear) < nearChange * 3)){
            near += nearChange
        }
    }
    else if (event.keyCode == 54)
    {
        console.log("6")

        if ((shiftPressed) && ((ogFar - far) < farChange * 2)){
            far -= farChange
        }
        else if ((!shiftPressed) && ((far - ogFar) < farChange * 4)){
            far += farChange
        }
    }
}

function handleKeyUp(event)
{
    if(event.keyCode == 87) //w
    {
        if(rotatingUp == -1)
        {
            rotatingUp = 0

        }
    }
    else if(event.keyCode == 83) //s
    {
        if(rotatingUp == 1)
        {
            rotatingUp = 0

        }
    }
    else if(event.keyCode == 81) //q
    {
        if(rotatingSwirl == -1)
        {
            rotatingSwirl = 0

        }
    }
    else if(event.keyCode == 69) //e
    {
        if(rotatingSwirl == 1)
        {
            rotatingSwirl = 0

        }
    }
    else if(event.keyCode == 65) //a
    {
        if(rotatingLeft == -1)
        {
            rotatingLeft = 0

        }
    }
    else if(event.keyCode == 68) //d
    {
        if(rotatingLeft == 1)
        {
            rotatingLeft = 0

        }
    }
    else if (event.keyCode == 38) //up
    {
        acc = 0

    }

    else if (event.keyCode == 40) //down
    {
        acc = 0


    }

    else if (event.keyCode == 16)
    {
        shiftPressed = false
    }

}


function speedUp() {
    if(speed < 2)
    {speed += acc}

}
function slowDown() {
    if(speed > 0.00)
    {speed += acc}
}

function changeTerrainView(){
    if (mode == 0)
    {
        mode = 1;
        terrainFaces = getPatchFaces(mode)
        BufferFaces(terrainFaces)
    }
    else if(mode == 1)
    {
        mode = 2;
        terrainFaces = getPatchFaces(mode)
        BufferFaces(terrainFaces)
    }
    else if(mode == 2)
    {
        mode = 0;
        terrainFaces = getPatchFaces(mode)
        BufferFaces(terrainFaces)
    }
}

function changeShading(){
    if (shading == 0)
    shading = 1;
    else if(shading == 1)
    shading = 2;
    else if(shading == 2)
    shading = 0;
}

function exit(){
    /*Passes empty vertex list to buffer.
    Initiates exit sequence*/
    over = true
    eye = vec3(0,0,0)
    speed = 0
    terrainView = "None"
    shading = "None"
    var vertices = []
    BufferVertices(vertices);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length); //Rendering the triangle

}

function directionChange(){
    if(rotatingLeftAngle == 0)
            direction = "North"
    else if(rotatingLeftAngle > 0 && rotatingLeftAngle < 90)
        direction = "North East"

    else if(rotatingLeftAngle > 90)
        direction = "East"

    else if(rotatingLeftAngle < 0 && rotatingLeftAngle > -90)
        direction = "North West"

    else if(rotatingLeftAngle < - 90)
        direction = "West"
}

function movementConstraints(){


        if(rotatingLeftAngle > 90)
        {
            rotatingLeftAngle = 90
            rotatingLeft = 0
        }
        else if(rotatingLeftAngle < -90)
        {
            rotatingLeftAngle = -90
            rotatingLeft = 0
        }

        if(rotatingUpAngle > 90)
        {
            rotatingUpAngle = 90
            rotatingUp = 0
        }
        else if(rotatingUpAngle < -90)
        {
            rotatingUpAngle = -90
            rotatingUp = 0
        }
}
