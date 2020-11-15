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
    if (!over){
        terrainVerts = getPatchVert(-patchLength, patchLength, -patchLength, patchLength, eyeOffset)
        // chooseShading()
        // getPatchNormal()
        BufferVertices(terrainVerts, terrainColors)
    }

}
function updateScene()
{
    if (!over){
        var speedRot = 0.5
        rotatingLeftAngle += speedRot * rotatingLeft
        rotatingUpAngle += speedRot * rotatingUp
        rotatingSwirlAngle += speedRot * rotatingSwirl

        movementConstraints()
        directionChange()

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
    if (!over){
    
        eyeOriginalPos = eye.slice(0, 3)
        lastBufferPos = eye.slice(0, 3)
        var eyeOffset = subtract(eye, eyeOriginalPos)
        terrainColors = []
        get_patch(-patchLength, patchLength, -patchWidth, patchWidth, eyeOffset)
        // chooseShading();
        BufferVertices(terrainVerts, terrainColors)
        BufferFaces(terrainFaces)

        modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
        projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix")

        modelViewMatrix = lookAt(eye, at, up)
        currentOrientation = rotateX(0)

        projectionMatrix = ortho(left, right, bottom, top1, near, far)

        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix))
        gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix))

        terrainNormal = getPatchNormal()

        render()
    }

}


