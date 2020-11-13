var canvas, gl, terrainVerts, terrainFaces, mode, rowLength

noise.seed(0)


function BufferFaces(elements){    
    iBuffer = gl.createBuffer() // Index / face buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), gl.STATIC_DRAW)    
}

function BufferVertices(vertices){

    vBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)
    
    vPosition = gl.getAttribLocation(program, "vPosition")
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition)
}


function getHeight(x, z)
{
	return noise.perlin2(x/4 , z/4)*6
}


function getPatchVert(xmin, xmax, zmin, zmax, eyeOffset){

    var terrainVerts = []
    var step = 1
    var collength = 0
    for (var z = zmin; z <= zmax; z+=step){
        for (var x = xmin; x <= xmax; x+=step)
        {
            if(eyeOffset[0] != 0 || eyeOffset[2] != 0)
            {
                console.log('hit')
            }
            var xTemp = x + eyeOffset[0]
            var zTemp = z + eyeOffset[2]
            xTemp = xTemp - xTemp % step
            zTemp = zTemp - zTemp % step
            var y = getHeight(xTemp, zTemp)
            terrainVerts.push(vec3(xTemp, y, zTemp))
        }
        collength += 1
    }
    rowLength = terrainVerts.length / collength
    return terrainVerts
    
}


function getPatchFaces()
{
    var collength = terrainVerts.length / rowLength
    var faces = []

    if(mode == 0) // Point mode
    {
        for(var i = 0; i < terrainVerts.length; i++)
        {
            faces.push(i)
        }
    }
    else if(mode == 1) // Wireframe mode
    {
        for(var col = rowLength - 1; col >= 0; col--)
        {
            faces.push(col)
        }
        for(var row = 1; row < collength; row++)
        {
            for(var col = 0; col < collength - 1; col++)
            {
                var v1 = row * rowLength + col
                var v2 = (row - 1) * rowLength + col + 1
                faces.push(v1, v2)
            }
            for(var col = (row + 1) * rowLength - 1; col >= row * rowLength; col--)
            {
                faces.push(col)
            }
        }
    }
    else if(mode == 2) // Face mode
    {
        for(var row = 0; row < collength - 1; row++)
        {
            for(var col = 0; col < rowLength - 1; col++)
            {
                var v1 = row * rowLength + col
                var v2 = v1 + 1
                var v3 = (row + 1) * rowLength + col
                var v4 = v3 + 1
                faces.push(v1, v3, v2, v4, v2, v3)
            }
        }
    }

    return faces
    
}


function get_patch(xmin, xmax, zmin, zmax, eyeOffset){
    terrainVerts = getPatchVert(xmin, xmax, zmin, zmax, eyeOffset);
    terrainFaces = getPatchFaces()
    return [terrainVerts, terrainFaces]
}


function updateScene()
{
    var speed = 0.01
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

    if(length(subtract(vec2(eye[0], eye[2]), vec2(lastBufferPos[0], lastBufferPos[2]))) > 3)
    {        
        var eyeOffset = subtract(eye, eyeOriginalPos)


        get_patch(-30, 30, -30, 30, eyeOffset)
        BufferVertices(terrainVerts)
        BufferFaces(terrainFaces)
        
        lastBufferPos = eye.slice(0, 3)
    }

    render()
}






