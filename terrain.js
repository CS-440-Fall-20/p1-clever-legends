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
	return noise.perlin2(x/3, z/3)*6
}


function getPatchVert(xmin, xmax, zmin, zmax, eyeOffset){

    var step = 1;
    var terrainVerts = []
    var collength = 0
    for (var z = zmin; z <= zmax; z+=step){
        for (var x = xmin; x <= xmax; x+=step)
        {
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


function getPatchFaces(mode)
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
    terrainFaces = getPatchFaces(mode)
    trueVertFaces = getPatchFaces(2)
    return [terrainVerts, terrainFaces]
}


function findNormal(v1, v2, v3)
{
    var a = subtract(v2, v1)
    var b = subtract(v3, v2)

    var crossProduct = cross(a, b)
    return crossProduct
}


function setFaceNormals()
{
    faceNormal = []

    for(var i = 0; i < trueVertFaces.length; i += 3)
    {
        var v1 = terrainVerts[trueVertFaces[i]]
        var v2 = terrainVerts[trueVertFaces[i+1]]
        var v3 = terrainVerts[trueVertFaces[i+2]]
        var normal = findNormal(v1, v2, v3)
        faceNormal.push(normalize(normal))
    }    
}


function getPatchNormal(){

    setFaceNormals()

    terrainNormal = []
    var integer = []
    for(var i = 0; i < terrainVerts.length; i++)
    {
        terrainNormal[i] = vec3(0, 0, 0)
        integer[i] = 0
    }
    
    for(var i = 0; i < terrainFaces.length; i++)
    {
        var indexFaceNormal = Math.floor(i/3)
        var elementTerrainFace = terrainFaces[i]
        var elementFaceNormal = faceNormal[indexFaceNormal]

        terrainNormal[elementTerrainFace] = add(terrainNormal[elementTerrainFace], elementFaceNormal)
        integer[elementTerrainFace] += 1
    }

    for(var i = 0; i < terrainNormal.length; i++)
    {
        terrainNormal[i] = scale(1/integer[i], terrainNormal[i])
    }

    return terrainNormal
}
