import { mat4 } from 'gl-matrix';

export default class Camera {
  constructor(gl) {
    this.gl = gl;

    this.position = [0, 0, 0];
    this.target = [0, 0, 0];
    this.up = [0, 1, 0];

    this.view = mat4.identity(mat4.create());
    this.projection = mat4.identity(mat4.create());
    this.vp = mat4.identity(mat4.create());
  }

  lookAt(x, y, z) {
    this.target = [x, y, z];
  }

  setPosition(x, y, z) {
    this.position = [x, y, z];
  }

  setPerspective(fov, aspect, near, far) {
    const fovRad = fov * Math.PI / 180;
    this.projection = mat4.identity(mat4.create());
    mat4.perspective(this.projection, fovRad, aspect, near, far);
  }

  getMatrix() {
    return this.vp;
  }

  updateMatrix() {
    this.view = mat4.identity(mat4.create());
    this.vp = mat4.identity(mat4.create());
    mat4.lookAt(this.view, this.position, this.target, this.up);
    mat4.multiply(this.vp, this.projection, this.view);
  }
}
