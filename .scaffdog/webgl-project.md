---
name: 'webgl-project'
root: '.'
output: '**/*'
ignore: []
questions:
  value: 'Please enter any text.'
---

# `{{inputs.value}}/vs.glsl`
```
attribute vec3 position;

void main(){
  gl_Position = vec4(position, 1.0);
}

```

# `{{inputs.value}}/fs.glsl`
```
precision mediump float;

// #include ../../../../common/utils/glsl/hsv2rgb;

void main(){
  gl_FragColor = vec4(1.0, .0, .0, 1.0);
}

```

# `{{inputs.value}}/index.astro`

```astro
---
import SimpleCanvasTemplate from "../../../../common/SimpleCanvasTemplate.astro";
---

<SimpleCanvasTemplate title="first" className="js-canvas" />

<script>
  import vs from './vs.glsl?raw';
  import fs from './fs.glsl?raw';
  import { GlUtils } from './GlUtils';
  import pane from './pane';
  import { mat4 } from 'gl-matrix';
  import { filmer } from '../../../../common/filmer';
  import Camera from './camera';
  import Torus from './Torus';

  const canvas = document.querySelector<HTMLCanvasElement>(".js-canvas")!;
  const gl = canvas.getContext('webgl')!;
  const torus = new Torus();

  const animate = ({time}) => {}


  filmer.add({id: 'animation', update: animate, order: 1});
  filmer.start();
</script>
```

# `{{inputs.value}}/pane.js`
```JavaScript
import { filmer } from '../../../../common/filmer'
import { Pane } from 'tweakpane';
import * as TweakpaneEssentialsPlugin from '@tweakpane/plugin-essentials'

const pane = new Pane();
pane.registerPlugin(TweakpaneEssentialsPlugin);

const fpsGraph = pane.addBlade({
  view: 'fpsgraph',
  label: 'fpsgraph',
});

filmer.add({ id: 'fpsStart', update: () => fpsGraph.begin(), order: -Infinity });
filmer.add({ id: 'fpsEnd', update: () => fpsGraph.end(), order: Infinity });

export default pane;

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

# `{{inputs.value}}/Torus.js`
```JavaScript
import { mat4 } from 'gl-matrix';

export default class Torus {
  constructor(radius = 1, tube = 0.1, radialSegments = 12, tubularSegments = 18) {
    this.vertices = [];
    this.uv = [];
    this.indices = [];
    this.color = [];

    this.radius = radius;
    this.tube = tube;
    this.radialSegments = radialSegments;
    this.tubularSegments = tubularSegments;

    this.init();
  }

  getVerticesLength() {
    return this.vertices.length / 3;
  }

  init() {
    this.setParams();
  }

  setUv() {
    for (let j = 0; j <= this.radialSegments; j++) {
      for (let i = 0; i <= this.tubularSegments; i++) {

      }
    }
  }

  setParams() {
    for (let j = 0; j <= this.radialSegments; j++) {
      for (let i = 0; i <= this.tubularSegments; i++) {

        // set vertex
        const u = i / this.tubularSegments * Math.PI * 2;
				const v = j / this.radialSegments * Math.PI * 2;

				const vertex = [
          ( this.radius + this.tube * Math.cos( v ) ) * Math.cos( u ),
          ( this.radius + this.tube * Math.cos( v ) ) * Math.sin( u ),
          this.tube * Math.sin( v )
        ];
				this.vertices.push(...vertex);


        // set uv
        const uv = [i / this.tubularSegments, j / this.radialSegments]
        this.uv.push(...uv);
      }
    }

    for ( let j = 1; j <= this.radialSegments; j ++ ) {

			for ( let i = 1; i <= this.tubularSegments; i ++ ) {

				// indices
				const a = ( this.tubularSegments + 1 ) * j + i - 1;
				const b = ( this.tubularSegments + 1 ) * ( j - 1 ) + i - 1;
				const c = ( this.tubularSegments + 1 ) * ( j - 1 ) + i;
				const d = ( this.tubularSegments + 1 ) * j + i;

				// faces
				this.indices.push( a, b, d );
				this.indices.push( b, c, d );

			}

		}
  }
}

```
