const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');

if (!gl) {
    throw new Error('WebGL not supported');
};

const vertexData = [
 // Front
 0.5, 0.5, 0.5,
 0.5, -.5, 0.5,
 -.5, 0.5, 0.5,
 -.5, 0.5, 0.5,
 0.5, -.5, 0.5,
 -.5, -.5, 0.5,

 // Left
 -.5, 0.5, 0.5,
 -.5, -.5, 0.5,
 -.5, 0.5, -.5,
 -.5, 0.5, -.5,
 -.5, -.5, 0.5,
 -.5, -.5, -.5,

 // Back
 -.5, 0.5, -.5,
 -.5, -.5, -.5,
 0.5, 0.5, -.5,
 0.5, 0.5, -.5,
 -.5, -.5, -.5,
 0.5, -.5, -.5,

 // Right
 0.5, 0.5, -.5,
 0.5, -.5, -.5,
 0.5, 0.5, 0.5,
 0.5, 0.5, 0.5,
 0.5, -.5, 0.5,
 0.5, -.5, -.5,

 // Top
 0.5, 0.5, 0.5,
 0.5, 0.5, -.5,
 -.5, 0.5, 0.5,
 -.5, 0.5, 0.5,
 0.5, 0.5, -.5,
 -.5, 0.5, -.5,

 // Bottom
 0.5, -.5, 0.5,
 0.5, -.5, -.5,
 -.5, -.5, 0.5,
 -.5, -.5, 0.5,
 0.5, -.5, -.5,
 -.5, -.5, -.5,
];

/*const colorData = [
    1, 0, 0,    // V1.color
    0, 1, 0,    // V2.color
    0, 0, 1,    // V3.color
];*/
const vertexdata2 = [
    // Front
 0.5, 0.5, 0.5,
 0.5, -.5, 0.5,
 -.5, 0.5, 0.5,
 -.5, 0.5, 0.5,
 0.5, -.5, 0.5,
 -.5, -.5, 0.5,

 // Left
 -.5, 0.5, 0.5,
 -.5, -.5, 0.5,
 -.5, 0.5, -.5,
 -.5, 0.5, -.5,
 -.5, -.5, 0.5,
 -.5, -.5, -.5,

 // Back
 -.5, 0.5, -.5,
 -.5, -.5, -.5,
 0.5, 0.5, -.5,
 0.5, 0.5, -.5,
 -.5, -.5, -.5,
 0.5, -.5, -.5,

 // Right
 0.5, 0.5, -.5,
 0.5, -.5, -.5,
 0.5, 0.5, 0.5,
 0.5, 0.5, 0.5,
 0.5, -.5, 0.5,
 0.5, -.5, -.5,

 // Top
 0.5, 0.5, 0.5,
 0.5, 0.5, -.5,
 -.5, 0.5, 0.5,
 -.5, 0.5, 0.5,
 0.5, 0.5, -.5,
 -.5, 0.5, -.5,

 // Bottom
 0.5, -.5, 0.5,
 0.5, -.5, -.5,
 -.5, -.5, 0.5,
 -.5, -.5, 0.5,
 0.5, -.5, -.5,
 -.5, -.5, -.5,
];


function randomcolor()
{
    return [Math.random(),Math.random(),Math.random()];
}
/*let colorData= [
    ...randomcolor(),
    ...randomcolor(),
    ...randomcolor(),

];*/


let colorData = [];
for (let face = 0 ; face<6 ; face ++ )
{
    let faceColor = randomcolor ();
    for (let vertex  = 0 ; vertex < 6 ; vertex ++)
    {
        colorData.push(...faceColor);
    } 
}

let colorData2 = [];
for (let face = 0 ; face<6 ; face ++ )
{
    let faceColor = randomcolor ();
    for (let vertex  = 0 ; vertex < 6 ; vertex ++)
    {
        colorData2.push(...faceColor);
    } 
}
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);

const colorBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);


const positionBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexdata2), gl.STATIC_DRAW);

const colorBuffer2 = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData2), gl.STATIC_DRAW);



const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, `
precision mediump float;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

uniform mat4 matrix;

void main() {
    vColor = color;
    gl_Position = matrix * vec4(position, 1);
}
`);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, `
precision mediump float;

varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1);
}
`);
gl.compileShader(fragmentShader);
console.log(gl.getShaderInfoLog(fragmentShader));

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);

const positionLocation = gl.getAttribLocation(program, `position`);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

const colorLocation = gl.getAttribLocation(program, `color`);
gl.enableVertexAttribArray(colorLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

gl.useProgram(program);
gl.enable (gl.DEPTH_TEST);

const uniformLocations = {
    matrix: gl.getUniformLocation(program, `matrix`),
};

const matrix = mat4.create();
const matrix2 = mat4.create();

mat4.translate(matrix, matrix, [0.2, 0, 0]);

mat4.scale(matrix, matrix, [0.2, 0.2, 0.2]);
mat4.translate(matrix2,matrix2,[0.5,0,0]);
mat4.scale(matrix2, matrix2, [0.2, 0.2, 0.2]);



function animate() {
    requestAnimationFrame(animate);
    mat4.rotateZ(matrix, matrix, Math.PI/2 / 70);
    mat4.rotateX(matrix, matrix, Math.PI/2 / 70);
    mat4.rotateX(matrix2, matrix2, Math.PI/2 / 70);
    mat4.rotateZ(matrix2, matrix2, Math.PI/-2 / 70);

    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix);
    gl.drawArrays(gl.TRIANGLES, 0, vertexData.length /3 );

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer2);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer2);
    gl.uniformMatrix4fv(uniformLocations.matrix, false, matrix2);

    gl.drawArrays(gl.TRIANGLES,0,vertexdata2.length/3);
   

}

animate();
