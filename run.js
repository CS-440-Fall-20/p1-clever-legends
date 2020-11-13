var modelViewMatrix, modelViewMatrixLoc
var projectionMatrix, projectionMatrixLoc
var eye, at, up, eyeOriginalPos, lastBufferPos
var currentOrientation
var rotatingLeft = 0
var rotatingUp = 0
var rotatingSwirl = 0
var forward, backward = 0
var canvas, gl, terrainVerts, terrainFaces, mode, rowLength
var patchLength = 100
var terrainNormal
noise.seed(0)

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


async function newPatchVert(eyeOffset)
{
    terrainVerts = getPatchVert(-patchLength, patchLength, -patchLength, patchLength, eyeOffset)
    BufferVertices(terrainVerts)
}


function updateScene()
{
    var speed = 0.05
    var speedRot = 1

    var diff = vec4(subtract(at, eye), 0.0)

    var rotMat1 = rotate(rotatingLeft * speedRot, up)
    diff = mult(rotMat1, diff)

    var perp = cross(diff.slice(0,3), up)
    var rotMat2 = rotate(rotatingUp * speedRot, perp)

    diff = mult(rotMat2, diff).slice(0,3)
    up = mult(rotMat2, vec4(up, 0.0))

    var rotMat3 = rotate(rotatingSwirl * speedRot, diff)
    up = mult(rotMat3, up).slice(0,3)

    at = add(eye, diff)

    eye = add(eye, scale(speed, diff))
    at = add(at, scale(speed, diff))

    //This is supposed to move forward and back
    // eye = add(eye, vec3(speed + forward*speed, 0, 0))
    // eye  = add(eye, vec3(speed + backward*speed, 0, 0))

    // if(rotatingUp != 0)
    // {
        // alert(diff)
    // }

    modelViewMatrix = lookAt(eye, at, up)
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))

    if(length(subtract(vec2(eye[0], eye[2]), vec2(lastBufferPos[0], lastBufferPos[2]))) > 10)
    {
        var eyeOffset = subtract(eye, eyeOriginalPos)
        newPatchVert(eyeOffset)

        lastBufferPos = eye.slice(0, 3)
    }

    render()
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
    else if (mode == 3)
    {
        gl.drawElements(gl.TRIANGLE_STRIP, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
    }

    window.requestAnimationFrame(updateScene)
}


window.onload = function init() {
    eye = vec3(0, 5, 5) //Position of Camera
    at = vec3(0, 5, 4)
    up = vec3(0, -1, 0)
    mode = 1

    WebGLSetup()
    eyeOriginalPos = eye.slice(0, 3)
    lastBufferPos = eye.slice(0, 3)
    var eyeOffset = subtract(eye, eyeOriginalPos)

    get_patch(-patchLength, patchLength, -patchLength, patchLength, eyeOffset)
    BufferVertices(terrainVerts)
    BufferFaces(terrainFaces)

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")

    modelViewMatrix = lookAt(eye, at, up)
    currentOrientation = rotateX(0)

    projectionMatrix = ortho(-1, 1, -1, 1, 4, 40)

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix))


    //terrainNormal = getPatchNormal()

    console.log(terrainNormal)

    render()
}
