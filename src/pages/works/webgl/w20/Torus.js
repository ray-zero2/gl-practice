import { mat4 } from 'gl-matrix';

export default class Torus {
  constructor(radius, tube, radialSegments, tubularSegments) {
    this.vertices = [];
    this.uv = [];
    this.indices = [];
    this.center = [0, 0, 0];

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
