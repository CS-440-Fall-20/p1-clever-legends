var canvas, gl
var modelViewMatrix, modelViewMatrixLoc
var terrainVerts, terrainFaces, mode, rowLength, terrainView, terrainColors
var projectionMatrix, projectionMatrixLoc
var eye, at, up, eyeOriginalPos, lastBufferPos
var left, right, bottom, top1, near, far
var currentOrientation
var rotatingLeft = 0
var rotatingUp = 0
var rotatingSwirl = 0
var rotatingLeftAngle = 0
var rotatingUpAngle = 0
var rotatingSwirlAngle = 0
var forward, backward = 0
var trueVertFaces
var patchLength = 60
var patchWidth = 60
var acc = 0.00
var terrainNormal, faceNormal
var speed = 0.02
var shading
var tshading
var over = 0
var direction = "North"
var cameraPositionL;

var Ka = 1.0;
var Kd = 1.0;
var Ks = 1.0;
var shininessVal = 90;

var ambientColor = vec3(0.0, 0.0, 0.0);
var diffuseColor = vec3(1.0, 0.8, 1.0);
var specularColor = vec3(1.0, 1.0, 1.0);
var lightPos = vec3(0.0, 0.0, 10.0);

var cameraPosition;


noise.seed(0)



function WebGLSetup(){
    canvas = document.getElementById("gl-canvas")
    gl = WebGLUtils.setupWebGL(canvas)
    if (!gl) { alert("WebGL isn't available") }
    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clearColor(0, 0,0,1)
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
    if (over == 0){
        terrainVerts = getPatchVert(-patchLength, patchLength, -patchLength, patchLength, eyeOffset)
        // chooseShading()
        // getPatchNormal()
        BufferVertices(terrainVerts, terrainColors)
    }

}
function updateScene()
{
    if (over == 0){
        var speedRot = 1

        rotatingLeftAngle += speedRot * rotatingLeft
        rotatingUpAngle += speedRot * rotatingUp
        rotatingSwirlAngle += speedRot * rotatingSwirl

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

        modelViewMatrix = lookAt(eye, at, up)
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))

        projectionMatrix = ortho(left, right, bottom, top1, near, far)
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix))

        if(length(subtract(vec2(eye[0], eye[2]), vec2(lastBufferPos[0], lastBufferPos[2]))) > 10)
        {
            var eyeOffset = subtract(eye, eyeOriginalPos)
            newPatchVert(eyeOffset)

            lastBufferPos = eye.slice(0, 3)
        }

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

        render()
    }

}


window.onload = function init() {
    eye = vec3(0,5, 5) //Position of Camera
    at = vec3(0, 5, 4)
    up = vec3(0, -1, 0)
    left = ogLeft
    right = ogRight
    bottom = ogBottom
    top1 = ogTop1
    near = ogNear
    far = ogFar
    mode = 1
    shading = 1
    WebGLSetup()
    if (over == 0){

        eyeOriginalPos = eye.slice(0, 3)

        cameraPosition = eye;
        cameraPositionL = gl.getUniformLocation(program, "cameraPosition")

        gl.uniform3fv(cameraPositionL, flatten([eye]))

        var KaL = gl.getUniformLocation(program, "Ka")
        gl.uniform1fv(KaL, [Ka])

        var KdL = gl.getUniformLocation(program, "Kd")
        gl.uniform1fv(KdL, [Kd])

        var KsL = gl.getUniformLocation(program, "Ks")
        gl.uniform1fv(KsL, [Ks])

        var shininessValL = gl.getUniformLocation(program, "shininessVal")
        gl.uniform1f(shininessValL, shininessVal)

        ambientColorL = gl.getUniformLocation(program, "ambientColor")
        gl.uniform3fv(ambientColorL, flatten(cameraPosition))

        diffuseColorL = gl.getUniformLocation(program, "diffuseColor")
        gl.uniform3fv(diffuseColorL, flatten(diffuseColor))

        specularColorL = gl.getUniformLocation(program, "specularColor")
        gl.uniform3fv(specularColorL, flatten(specularColor))

        lightPosL = gl.getUniformLocation(program, "lightPos")
        gl.uniform3fv(lightPosL, flatten(lightPos))






        lastBufferPos = eye.slice(0, 3)
        var eyeOffset = subtract(eye, eyeOriginalPos)
        terrainColors = []
        get_patch(-patchLength, patchLength, -patchWidth, patchWidth, eyeOffset)
        // chooseShading();
        BufferVertices(terrainVerts, terrainColors)
        BufferFaces(terrainFaces)
        //BufferNormal(terrainNormal)

        modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
        projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")

        modelViewMatrix = lookAt(eye, at, up)
        currentOrientation = rotateX(0)

        projectionMatrix = ortho(left, right, bottom, top1, near, far)

        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix))

        terrainNormal = getPatchNormal()
        BufferNormal(terrainNormal)
        console.log(terrainNormal.length)
        console.log(terrainVerts.length)
        console.log(terrainNormal[0].length)


        render()
    }

}
