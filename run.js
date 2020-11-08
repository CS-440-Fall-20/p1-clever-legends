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


window.onload = function init() {
    WebGLSetup()
    mode = 1
    get_patch(-0.8, 0.8, -0.8, 0.8)
    BufferVertices(terrainVerts)
    BufferFaces(terrainFaces)
    console.log("Terrain vertices", terrainVerts.slice(0, 10))
    console.log("Perlin values: ", PerlinGen(15, 10))
    render()
}

