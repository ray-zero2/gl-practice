attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;

uniform mat4 mvpMatrix;

varying vec2 vUv;
varying vec3 vNormal;

void main(){
  vUv = uv;
  vNormal = normal;
  gl_Position = mvpMatrix * vec4(position, 1.0);
}
