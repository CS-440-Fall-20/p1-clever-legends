function handleKeyDown(event)
{
    if(event.keyCode == 87) //w
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

    else if(event.keyCode == 38) //up
    {
        if(forward == 0)
        {
            forward = -1;
            console.log(forward)
        }
    }
    
    else if(event.keyCode == 40) //down
    {
        if(backward == 0)
        {
            backward = 1
            console.log(backward)
        }
    }

    else if(event.keyCode == 27){

        gl = 0;
    }

    else if(event.keyCode == 32){
        if (mode == 0){
            mode = 1;
            console.log(mode)
        }
        
        else if(mode == 1){
            mode = 2;
            console.log(mode)
        }
        
        else if(mode == 2){
            mode = 0;
            console.log(mode)
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

    else if(event.keyCode == 38) //up
    {
        if(forward == -1)
        {
            forward = 0
            console.log('forward')
        }
    }
    
    else if(event.keyCode == 40) //down
    {
        if(backward == 1)
        {
            backward = 0
            console.log(backward)
        }
    }
}
