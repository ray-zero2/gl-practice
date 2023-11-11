precision mediump float;

varying vec2 vUv;

#include ../../../../common/utils/glsl/hsv2rgb;

void main(){
  gl_FragColor =
    vec4(hsv2rgb(vec3(vUv.x, 1.0, 1.0)), 1.0);
}
