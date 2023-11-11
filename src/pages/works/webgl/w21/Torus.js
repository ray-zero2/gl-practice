import { mat4 } from 'gl-matrix';
import Vec3  from './Vec3';


export default class Torus {
  constructor(radius = 1, tube = 0.1, radialSegments = 12, tubularSegments = 18) {
    this.vertices = [];
    this.uv = [];
    this.indices = [];
    this.color = [];
    this.faceNormals = [];

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

				const a = ( this.tubularSegments + 1 ) * j + i - 1;
				const b = ( this.tubularSegments + 1 ) * ( j - 1 ) + i - 1;
				const c = ( this.tubularSegments + 1 ) * ( j - 1 ) + i;
				const d = ( this.tubularSegments + 1 ) * j + i;

				this.indices.push( a, b, d );
				this.indices.push( b, c, d );

        const vertexA = new Vec3(
          this.vertices[3 * a],
          this.vertices[3 * a + 1],
          this.vertices[3 * a + 2]
        )
        const vertexB = new Vec3(
          this.vertices[3 * b],
          this.vertices[3 * b + 1],
          this.vertices[3 * b + 2]
        )
        const vertexC = new Vec3(
          this.vertices[3 * c],
          this.vertices[3 * c + 1],
          this.vertices[3 * c + 2]
        )
        const vertexD = new Vec3(
          this.vertices[3 * d],
          this.vertices[3 * d + 1],
          this.vertices[3 * d + 2]
        )

        const vecAB = vertexB.copy().sub(vertexA);
        const vecAD = vertexD.copy().sub(vertexA);

        const vecBC = vertexC.copy().sub(vertexB);
        const vecBD = vertexD.copy().sub(vertexB);

        const normal1 = vecAB.copy().cross(vecAD).normalize().toArray();
        const normal2 = vecBC.copy().cross(vecBD).normalize().toArray();

        this.faceNormals.push(
          ...normal1,
          ...normal1,
          ...normal1,
        );
        this.faceNormals.push(
          ...normal2,
          ...normal2,
          ...normal2,
        );
			}
		}

  }

}
