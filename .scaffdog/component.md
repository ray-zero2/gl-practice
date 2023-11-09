---
name: 'component'
root: '.'
output: '**/*'
ignore: []
questions:
  value: 'Please enter any text.'
---

# `{{inputs.value}}/vs.glsl`
```
attribute vec3 position;
// uniform   mat4 mvpMatrix;

void main(){
  // gl_Position = mvpMatrix * vec4(position, 1.0);
  gl_Position = vec4(position, 1.0);
}

```

# `{{inputs.value}}/fs.glsl`
```
void main(){
  gl_FragColor = vec4(1.0, .0, .0, 1.0);
}

```

# `{{inputs.value}}/index.astro`

```
---
import SimpleCanvasTemplate from "../../../../common/SimpleCanvasTemplate.astro";
---

<SimpleCanvasTemplate title="first" className="js-canvas" />

<script>
  import vs from './vs.glsl?raw';
  import fs from './fs.glsl?raw';
  import { GlUtils } from './GlUtils'
  import { mat4 } from 'gl-matrix';
  import { filmer } from '../../../../common/filmer'
  import Camera from './camera'

  const canvas = document.querySelector<HTMLCanvasElement>(".js-canvas")!;
  const gl = canvas.getContext('webgl')!;


  const animate = ({time}) => {}

  filmer.add({id: 'animation', update: animate});
  filmer.start();
</script>
```

# `{{inputs.value}}/camera.js`
```JavaScript
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

```

# `{{inputs.value}}/GlUtils.js`

```JavaScript
export class GlUtils {
  constructor(gl) {
    this.gl = gl;
  }

  createShader(source, type) {
    const shader = this.gl.createShader(type);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    if (success)
      return shader;
    console.error(this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
  }

  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success)
      return program;
    console.error(this.gl.getProgramInfoLog(program));
    this.gl.deleteProgram(program);
  }

  setAttribute(program, name, data, size, { type, usage } = { type: this.gl.FLOAT, usage: this.gl.STATIC_DRAW }) {
    const location = this.gl.getAttribLocation(program, name);
    const vbo = this.createVBO(data, usage);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, size, type, false, 0, 0);
  }

  createVBO(data, usage = this.gl.STATIC_DRAW) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), usage);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    return buffer;
  };

  createIBO(data, usage = this.gl.STATIC_DRAW) {
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), usage);
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    return buffer;
  }
}


```
