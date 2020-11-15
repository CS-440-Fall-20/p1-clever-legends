function BufferFaces(elements){
    iBuffer = gl.createBuffer() // Index / face buffer
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(elements), gl.STATIC_DRAW)
}

function BufferVertices(vertices, colors){

    vBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW)

    vPosition = gl.getAttribLocation(program, "vPosition")
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vPosition)

    // var color_buffer = gl.createBuffer();
    // gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
    // gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    // var vColor = gl.getAttribLocation(program, "vColor");
    // gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(vColor);
}
function BufferNormal(normal){

    nBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normal), gl.STATIC_DRAW)

    vNormal = gl.getAttribLocation(program, "vNormal")
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(vNormal)

}
