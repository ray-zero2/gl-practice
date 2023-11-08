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

  setAttribute(program, name, data, size, type = this.gl.FLOAT) {
    const location = this.gl.getAttribLocation(program, name);
    const buffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    this.gl.enableVertexAttribArray(location);
    this.gl.vertexAttribPointer(location, size, type, false, 0, 0);
  }
}
