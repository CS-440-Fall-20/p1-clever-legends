
function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT || gl.DEPTH_BUFFER_BIT)
    if(mode == 0)
    {

        terrainView = "Dots"
        if (toggleShading == 0.0)
        {
          gl.drawArrays(gl.POINTS, flatVert.length, gl.FLOAT, 0)
        }
        else
        {
          gl.drawElements(gl.POINTS, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        }


    }
    else if (mode == 1)
    {
        terrainView = "Wireframe"
        if (toggleShading == 0.0)
        {
          gl.drawArrays(gl.LINE_STRIP, flatVert.length, gl.FLOAT, 0)
        }
        else
        {
          gl.drawElements(gl.LINE_STRIP, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        }



    }
    else if (mode == 2)
    {

        terrainView = "Filled"
        if (toggleShading == 0.0)
        {
          gl.drawArrays(gl.TRIANGLES, flatVert.length, gl.FLOAT, 0)
        }
        else
        {
          gl.drawElements(gl.TRIANGLES, terrainFaces.length, gl.UNSIGNED_SHORT, 0)
        }

    }



    window.requestAnimationFrame(updateScene)
}
