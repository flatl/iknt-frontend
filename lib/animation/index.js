import Pointer from './pointer';

export default function (canvas) {
  const regl = createREGL({ canvas });

  const DEV = false;
  const seed = DEV ? 38975.579831 : new Date().getTime() % 100000;
  
  const pointer = new Pointer(regl._gl.canvas);
  let lastPressingT, dtSec=0, morphAmount=0;
  pointer.addPressingListener(e => {
    lastPressingT = lastPressingT || Date.now();
    const nowInMs = Date.now();
    dtSec = (nowInMs - lastPressingT) / 1000;
    lastPressingT = nowInMs;
  
    morphAmount += dtSec * pointer.pressure * 0.1;
  });
  
  // Calling regl() creates a new partially evaluated draw command
  const draw = regl({
    // Shaders in regl are just strings.  You can use glslify or whatever you want
    // to define them.  No need to manually create shader objects.
    frag: `
      // Fork from http://glslsandbox.com/e#8143.0
      precision mediump float;
      #define SEED ${seed}.579831
  
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uMorph;
      uniform vec2 uGrid;
  
      const int   complexity  = 10;   // complexity of curls/computation
      const float mouseSpeed  = 0.3;  // control the color changing
      const float fixedOffset = 0.7;  // Drives complexity in the amount of curls/cuves.  Zero is a single whirlpool.
      const float fluidSpeed  = 0.07; // Drives speed, smaller number will make it slower.
      const float baseColor   = 0.45;
      const float BLUR        = 0.47;
  
      #define PI 3.14159
  
      // more about noise: 
      // http://thebookofshaders.com/11/
      float random(float x) {
        return fract(sin(x) * SEED);
      }
      float noise(float x) {
        float i = floor(x);
        float f = fract(x);
        return mix(random(i), random(i + 1.0), smoothstep(0.0, 1.0, f));
      }
      float noiseS(float x) {
        return noise(x) * 2.0 - 1.0;
      }
  
      float rand(vec2 co){
        return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
      }
  
      void main() {
        vec2 p = (2.0 * gl_FragCoord.xy - uResolution) / min(uResolution.x, uResolution.y) * 0.7;
        float t = uTime * fluidSpeed + uMorph;
        float noiseTime = noise(t);
        float noiseSTime = noiseS(t);
        float noiseSTime1 = noiseS(t + 1.0);
  
        float blur = (BLUR + 0.14 * noiseSTime);
        for(int i=1; i <= complexity; i++) {
          p += blur / float(i) * sin(
              float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1))
            + fixedOffset;
        }
        for(int i=1; i <= complexity; i++) {
          p += blur / float(i) * cos(
              float(i) * p.yx + t + PI * vec2(noiseSTime, noiseSTime1))
            + fixedOffset;
        }
        p += uMouse * mouseSpeed;
  
        vec2 grid = uGrid * 2.0; // set complexity to 0 to debug the grid
        gl_FragColor = vec4(
          baseColor * vec3(
            sin(grid * p + vec2(2.0 * noiseSTime, 3.0 * noiseSTime1)),
            sin(p.x + p.y + noiseSTime)
          )
          + baseColor,
          1.0);
  
  
        gl_FragColor = vec4(
          baseColor * vec3(
            sin(grid * p + vec2(2.0 * noiseSTime, 3.0 * noiseSTime1)),
            sin(p.x + p.y + noiseSTime)
          )
          + baseColor,
        1.0);
      }
    `,
  
    vert: `
      attribute vec2 position;
      void main () {
        gl_Position = vec4(position, 0, 1);
      }
    `,
  
    // Here we define the vertex attributes for the above shader
    attributes: {
      // regl.buffer creates a new array buffer object
      position: regl.buffer([
        [-1,-1],[1,-1],[-1,1],  // no need to flatten nested arrays, regl automatically
        [-1,1],[1,1],[1,-1]     // unrolls them into a typedarray (default Float32)
      ])
  
      // regl automatically infers sane defaults for the vertex attribute pointers
    },
  
    uniforms: {
      uResolution: ({viewportWidth, viewportHeight}) => [
        viewportWidth, viewportHeight
      ],
      uTime: ({tick}) => 0.01 * tick,
      uMouse: () => [pointer.position.x, pointer.position.y],
      uMorph: () => morphAmount,
      uRandomSeed: DEV ? 138975.579831 : new Date().getTime() % 1000000, //
      uGrid: ({viewportWidth, viewportHeight}) => {
        const ratio = 0.32;
        return viewportHeight >= viewportWidth ? [1, viewportHeight / viewportWidth * ratio]
          : [viewportWidth / viewportHeight * ratio, 1]
      }
    },
  
    // This tells regl the number of vertices to draw in this command
    count: 6
  });
  
  // regl.frame() wraps requestAnimationFrame and also handles viewport changes
  regl.frame(() => {
    draw();
  })
}