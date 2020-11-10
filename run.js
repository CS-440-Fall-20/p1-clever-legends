var modelViewMatrix, modelViewMatrixLoc
var projectionMatrix, projectionMatrixLoc
var eye, at, up

function WebGLSetup(){
    canvas = document.getElementById("gl-canvas")
    gl = WebGLUtils.setupWebGL(canvas)
    if (!gl) { alert("WebGL isn't available") }
    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0,0,0,1)
    gl.enable(gl.DEPTH_TEST);
    //  Load shaders and initialize attribute buffers
    gl.clear(gl.COLOR_BUFFER_BIT)
    program = initShaders(gl, "vertex-shader", "fragment-shader")
    gl.useProgram(program)
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
}




window.onload = function init() {
    WebGLSetup()
    mode = 1
    get_patch(-20, 20, -20, 20)
    BufferVertices(terrainVerts)
    BufferFaces(terrainFaces)
    
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")
    
    eye = vec3(0, 3, 3)
    at = vec3(0, 3, 2)
    up = vec3(0, -1, 0)
    modelViewMatrix = lookAt(eye, at, up)
    projectionMatrix = perspective(60, 1, -2, 2)

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix))
    
    render()



}

