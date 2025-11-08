function render() {
    globalThis.clearInterval(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(radius * Math.sin(theta) * Math.cos(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(theta));
    modelViewMatrix = lookAt(eye, atob, up);

    projectionMatrix = ortho(left, right, bottom, ytop, near, far);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, numPositions);
    requestAnimationFrame(render);
}

in vec4 aPosition;
in vec4 aColor;
out vec4 vcolor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    vcolor = aColor;
    gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
}

in vec4 vColor;
out vec4 fColor;

void main() {
    fColor = vColor;
}

document.getElementById("depthSlider").onchange = function() {
    far = event.target.value/2;
    near = -event.target.value/2;
};