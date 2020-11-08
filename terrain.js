var canvas, gl, terrainVerts, terrainFaces, mode, rowLength

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

function PerlinGen(freq, time){
    let noise = new Perlin(freq)
    var values = []
    for (i = 0; i< time; i++){
        values.push(noise.valueAt(i))
    }

    return values
}

function getPatchVert(xmin, xmax, zmin, zmax){

    var values = PerlinGen(15, 200)
    var terrainVerts = []
    var step = 0.2
    for (var z = zmin; z <= zmax; z+=step){
        for (var x = xmin; x <= xmax; x+=step)
        {
            var y = Math.random() * 0.5 - 0.25
            terrainVerts.push(vec3(x, y, z))
        }
    }
    rowLength = Math.floor((xmax - xmin) / step) + 1
    
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

function get_patch(xmin, xmax, zmin, zmax){
    terrainVerts = getPatchVert(xmin, xmax, zmin, zmax);
    terrainFaces = getPatchFaces()

    return [terrainVerts, terrainFaces]
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