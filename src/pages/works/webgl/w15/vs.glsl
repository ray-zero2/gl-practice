attribute vec3 position;
attribute vec4 color;
varying vec4 vColor;
uniform  mat4 mvpMatrix;

void main(){
  gl_Position = mvpMatrix * vec4(position, 1.0);
  vColor = color;
}
