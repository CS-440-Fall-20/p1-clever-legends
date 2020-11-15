
function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)
    if(mode == 0)
    {
        gl.drawElements(gl.POINTS, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        terrainView = "Dots"
        
        
    }
    else if (mode == 1)
    {
        gl.drawElements(gl.LINE_STRIP, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        terrainView = "Wireframe"
       

    }
    else if (mode == 2)
    {
        
        gl.drawElements(gl.TRIANGLES, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        terrainView = "Filled"
        
    }
    
    window.requestAnimationFrame(updateScene)
}

