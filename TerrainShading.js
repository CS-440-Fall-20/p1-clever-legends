
function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)
    if(mode == 0)
    {
        gl.drawElements(gl.POINTS, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        gl.clearColor(0,0,0,1)
        terrainView = "Dots"
        
        
    }
    else if (mode == 1)
    {
        gl.drawElements(gl.LINE_STRIP, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        gl.clearColor(0,0,0,1)
        terrainView = "Wireframe"
       

    }
    else if (mode == 2)
    {
        
        gl.drawElements(gl.TRIANGLES, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        gl.clearColor(173/255, 216/255, 230/255,1)
        terrainView = "Filled"
        
    }
    
    window.requestAnimationFrame(updateScene)
}

function chooseShading(){
    if (shading == 0){
        flat();
        tshading = "Flat"
    }

    else if (shading == 1){
        smooth();
        tshading = "Smooth"
    }

    else if (shading == 2){
        phong();
        tshading = "Phong"
    }
}

function flat(){
    terrainColors = []
    for (var i = 0; i < terrainVerts.length; i++){
        terrainColors.push(vec4(1,1,1,1))
    }
}

function smooth(){
    terrainColors = []
    for (var i = 0; i < terrainVerts.length; i++){
        terrainColors.push(vec4(1,1,1,1))
    }
}

function phong(){
    terrainColors = []
    for (var i = 0; i < terrainVerts.length; i++){
        terrainColors.push(vec4(1,1,1,1))
    }
}
