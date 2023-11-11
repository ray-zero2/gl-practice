export default class Vec3 {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x; this.y = y; this.z = z;
  }

  set(x, y, z) {
    this.x = x; this.y = y; this.z = z;
    return this;
  }

  setVec3(vec3) {
    this.x = vec3.x; this.y = vec3.y; this.z = vec3.z;
    return this;
  }

  get length() {
    return Math.hypot(this.x, this.y, this.z);
  }

  toArray() {
    return [this.x, this.y, this.z];
  }

  normalize() {
    const length = this.length;
    if(length !== 0) this.div(length);
    return this;
  }

  add(vec3) {
    this.x += vec3.x; this.y += vec3.y; this.z += vec3.z;
    return this;
  }

  sub(vec3) {
    this.x -= vec3.x; this.y -= vec3.y; this.z -= vec3.z;
    return this;
  }

  mul(scaler) {
    this.x *= scaler; this.y *= scaler; this.z *= scaler;
    return this;
  }

  div(scaler) {
    if(scaler !== 0) this.x /= scaler; this.y /= scaler; this.z /= scaler;
    return this;
  }

  dot(vec3) {
    return this.x * vec3.x + this.y * vec3.y + this.z * vec3.z;
  }

  cross(vec3) {
    const x = this.y * vec3.z - this.z * vec3.y;
    const y = this.z * vec3.x - this.x * vec3.z;
    const z = this.x * vec3.y - this.y * vec3.x;
    return this.set(x, y, z);
  }

  copy() {
    return new Vec3(this.x, this.y, this.z);
  }
}
