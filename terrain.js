var canvas, gl;

function WebGLSetup(){
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }
    //  Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0,0,0,1);
    //  Load shaders and initialize attribute buffers
     gl.clear(gl.COLOR_BUFFER_BIT);
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
}
function Buffer(vertices, colors){

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    
    vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
    
    vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
}

function getpatch(xmin, xmax, zmin, zmax){
    var terrainverts = []
    for (j = zmin; j<zmax; j++){
        for (i = xmin; i<xmax; i++){
            terrainverts.push(vec2(i/(xmax-xmin), j/(zmax-zmin)))
            
            
        }
    }
    
    return terrainverts
}

window.onload = function init() {
    WebGLSetup();
    var terrainverts = getpatch(-10, 10, -10, 10)
    console.log(terrainverts)
    var terrainvertscolors = [vec4(1,1,1,1)]*terrainverts.length
    Buffer(terrainverts, terrainvertscolors)


}   
