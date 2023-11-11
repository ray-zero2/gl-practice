precision mediump float;

varying vec2 vUv;
varying vec3 vNormal;

uniform vec3 light;

#include ../../../../common/utils/glsl/hsv2rgb;

void main(){
  vec3 normal = normalize(vNormal);
  vec3 light = normalize(light);
  float dProd = clamp(dot(normal, light), 0.0, 1.0);

  gl_FragColor =
    vec4(hsv2rgb(vec3(vUv.x, 1.0, 1.0)) * vec3(dProd), 1.0);
}
