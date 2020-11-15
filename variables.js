var canvas, gl
var modelViewMatrix, modelViewMatrixLoc
var terrainVerts, terrainFaces, mode, rowLength, terrainView, terrainColors
var projectionMatrix, projectionMatrixLoc
var eye, at, up, eyeOriginalPos, lastBufferPos
var left, right, bottom, top1, near, far
var currentOrientation
var rotatingLeft = 0
var rotatingUp = 0
var rotatingSwirl = 0
var rotatingLeftAngle = 0
var rotatingUpAngle = 0
var rotatingSwirlAngle = 0
var forward, backward = 0
var trueVertFaces
var patchLength = 60
var patchWidth = 60
var acc = 0.00
var terrainNormal, faceNormal
var speed = 0.02
var shading
var tshading
var over = false
var direction = "North"
noise.seed(0)
