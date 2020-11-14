shiftPressed = false

function handleKeyDown(event)
{
    if(event.keyCode == 87) //w
    {
        if(rotatingUp == 0)
        {
            rotatingUp = -1
            trotatingUp = "Up"
        }
        
    }
    else if(event.keyCode == 83) //s
    {
        if(rotatingUp == 0)
        {
            rotatingUp = 1
            trotatingUp = "Down"
        }
 
    }
    else if(event.keyCode == 81) //q
    {
        if(rotatingSwirl == 0)
        {
            rotatingSwirl = -1
            trotatingSwirl = "Counter-Clockwise"
        }
    }
    else if(event.keyCode == 69) //e
    {
        if(rotatingSwirl == 0)
        {
            rotatingSwirl = 1
            trotatingSwirl = "Clockwise"
        }
   
    }
    else if(event.keyCode == 65) //a
    {
        if(rotatingLeft == 0)
        {
            rotatingLeft = -1
            trotatingLeft = "Left"
        }

    }
    else if(event.keyCode == 68) //d
    {
        if(rotatingLeft == 0)
        {
            rotatingLeft = 1
            trotatingLeft = "Right"
        }
     
    }

    
    else if(event.keyCode == 27){ //Esc

        exit();
        
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

    else if (shiftPressed)
    {
        if (event.keyCode == 49)
        {
            console.log("Shift and 1")
        }
        else if (event.keyCode == 50)
        {
            console.log("Shift and 2")
        }
        else if (event.keyCode == 51)
        {
            console.log("Shift and 3")
        }
        else if (event.keyCode == 52)
        {
            console.log("Shift and 4")
        }
        else if (event.keyCode == 53)
        {
            console.log("Shift and 5")
        }
        else if (event.keyCode == 54)
        {
            console.log("Shift and 6")
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
            trotatingUp = "None"
        }
    }
    else if(event.keyCode == 83) //s
    {
        if(rotatingUp == 1)
        {
            rotatingUp = 0
            trotatingUp = "None"
        }
    }
    else if(event.keyCode == 81) //q
    {
        if(rotatingSwirl == -1)
        {
            rotatingSwirl = 0
            trotatingSwirl = "None"
        }
    }
    else if(event.keyCode == 69) //e
    {
        if(rotatingSwirl == 1)
        {
            rotatingSwirl = 0
            trotatingSwirl = "None"
        }
    }
    else if(event.keyCode == 65) //a
    {
        if(rotatingLeft == -1)
        {
            rotatingLeft = 0
            trotatingLeft = "None"
        }
    }
    else if(event.keyCode == 68) //d
    {
        if(rotatingLeft == 1)
        {
            rotatingLeft = 0
            trotatingLeft = "None"
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
    if(speed < 3)
    {
        speed += acc

    }

}
function slowDown() {

    if(speed > 0.00)
    {
        
        speed += acc


    }
    
    
}

function changeTerrainView(){
    if (mode == 0){
        mode = 1;
        
    }
    
    else if(mode == 1){
        mode = 2;
        
    }
    
    else if(mode == 2){
        mode = 0;
        

    }
}  

function changeShading(){

}

function exit(){

    over = 1
    var vertices = []                  
    BufferVertices(vertices);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length); //Rendering the triangle
    
}