var modelViewMatrix, modelViewMatrixLoc
var projectionMatrix, projectionMatrixLoc
var eye, at, up
var currentOrientation
var rotatingLeft = 0
var rotatingUp = 0
var rotatingSwirl = 0
var forward, backward = 0

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


function WebGLSetup(){
    canvas = document.getElementById("gl-canvas")
    gl = WebGLUtils.setupWebGL(canvas)
    if (!gl) { alert("WebGL isn't available") }
    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(173/255, 216/255, 230/255,1)
    gl.enable(gl.DEPTH_TEST);
    //  Load shaders and initialize attribute buffers
    gl.clear(gl.COLOR_BUFFER_BIT)
    program = initShaders(gl, "vertex-shader", "fragment-shader")
    gl.useProgram(program)
    
    canvas.addEventListener('keydown', handleKeyDown)
    canvas.addEventListener('keyup', handleKeyUp)
}

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)
    if(mode == 0)
    {
        gl.drawElements(gl.POINTS, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
    }
    else if (mode == 1)
    {
        gl.drawElements(gl.LINE_STRIP, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
    }
    else if (mode == 2)
    {
        gl.drawElements(gl.TRIANGLES, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
    }
    
    window.requestAnimationFrame(updateScene)
}



window.onload = function init() {
    WebGLSetup()
    mode = 2 
    get_patch(-10, 10, -10, 10)
    BufferVertices(terrainVerts)
    BufferFaces(terrainFaces)
    
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")
    
    eye = vec3(0, 5, 5) //Position of Camera
    at = vec3(0, 0,0) // 
    up = vec3(0, -1, 0)
    modelViewMatrix = lookAt(eye, at, up)
    currentOrientation = rotateX(0)

    projectionMatrix = perspective(60, 1, -2, 2)

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix))
    
    render()



}


