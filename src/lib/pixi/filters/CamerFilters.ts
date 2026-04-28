import { Filter, GlProgram } from "pixi.js";

const vertex = `
in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition(void) {
  vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
  position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
  position.y = position.y * (2.0 * uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;
  return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord(void) {
  return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void) {
  gl_Position = filterVertexPosition();
  vTextureCoord = filterTextureCoord();
}
`;

function createFilter(fragment: string) {
  return new Filter({
    glProgram: new GlProgram({ vertex, fragment }),
    resources: {
      shaderUniforms: {
        uTime: { value: 0, type: "f32" },
        uResolution: {
          value: [720, 540],
          type: "vec2<f32>",
        },
      },
    },
  });
}

const commonUtil = `
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}
`;

/* =========================
   01 ORIGINAL
========================= */
export function OriginalFilter() {
  const fragment = `
  in vec2 vTextureCoord;
  uniform sampler2D uTexture;

  void main(void) {
    gl_FragColor = texture2D(uTexture, vTextureCoord);
  }
  `;
  return createFilter(fragment);
}

/* =========================
   02 DREAMY (BLUE 몽환)
========================= */
export function DreamyFilter() {
  const fragment = `
  in vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uResolution;

  ${commonUtil}

  void main(void) {
    vec2 uv = vTextureCoord;

    vec3 base = texture2D(uTexture, uv).rgb;

    vec3 blur = vec3(0.0);
    blur += texture2D(uTexture, uv + vec2(-0.004, -0.004)).rgb;
    blur += texture2D(uTexture, uv + vec2(0.004, -0.004)).rgb;
    blur += texture2D(uTexture, uv + vec2(-0.004, 0.004)).rgb;
    blur += texture2D(uTexture, uv + vec2(0.004, 0.004)).rgb;
    blur *= 0.25;

    vec3 color = mix(base, blur, 0.4);

    color.r *= 0.95;
    color.g *= 1.05;
    color.b *= 1.22;

    color = pow(color, vec3(0.85));

    color = mix(color, vec3(0.7,0.8,1.0), 0.15);

    float noise = random(uv * uResolution + uTime) - 0.5;
    color += noise * 0.04;

    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.8, 0.25, dist);
    color *= mix(0.8, 1.1, vignette);

    gl_FragColor = vec4(color,1.0);
  }
  `;
  return createFilter(fragment);
}

/* =========================
   03 COOLBLUE (네 코드)
========================= */
export function CoolblueFilter() {
  const fragment = `
  in vec2 vTextureCoord;

  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uResolution;

  ${commonUtil}

  void main(void) {
    vec2 uv = vTextureCoord;

    float shift = 0.0025;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;

    vec3 color = vec3(r, g, b);

    color *= 1.10;

    color.r *= 0.89;
    color.g *= 1.02;
    color.b *= 1.2;

    color = (color - 0.5) * 1.28 + 0.5;

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, 0.78);

    color = pow(color, vec3(0.92));

    float noise = random(uv * uResolution + uTime * 3.0) - 0.5;
    color += noise * 0.08;

    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.78, 0.22, dist);
    color *= mix(0.72, 1.08, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
  `;
  return createFilter(fragment);
}

/* =========================
   04 Y2K PINK
========================= */
export function Y2KPinkFilter() {
  const fragment = `
  in vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uResolution;

  ${commonUtil}

  void main(void) {
    vec2 uv = vTextureCoord;

    float shift = 0.0018;
    float r = texture2D(uTexture, uv + vec2(shift, 0.0)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - vec2(shift, 0.0)).b;

    vec3 color = vec3(r, g, b);

    // 대비는 약하게
    color = (color - 0.5) * 1.08 + 0.5;

    // 연한 핑크 + 살짝 보라
    color.r *= 1.06;
    color.g *= 1.01;
    color.b *= 1.10;

    // 뽀용한 파스텔 틴트
    color = mix(color, vec3(1.0, 0.82, 0.94), 0.14);
    color = mix(color, vec3(0.88, 0.76, 1.0), 0.07);

    // 채도 살짝 낮춰서 적외선 느낌 제거
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, 0.88);

    // 약한 디카 노이즈
    float noise = random(uv * uResolution + uTime * 2.5) - 0.5;
    color += noise * 0.035;

    // 부드러운 비네팅
    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.82, 0.24, dist);
    color *= mix(0.84, 1.06, vignette);
    
    // 대비 뽀용
    color = (color - 0.5) * 1.2 + 0.5;
    color = pow(color, vec3(0.82));

    // 블랙포인트
    color = smoothstep(vec3(0.08), vec3(1.0), color);

    gl_FragColor = vec4(color, 1.0);
  }
  `;

  return createFilter(fragment);
}

/* =========================
   05 GRAINY
========================= */
export function GrainyFilter() {
  const fragment = `
  in vec2 vTextureCoord;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uResolution;

  ${commonUtil}

  void main(void) {
    vec2 uv = vTextureCoord;

    vec3 color = texture2D(uTexture, uv).rgb;

    color *= 1.3;
    color = (color - 0.5) * 1.05 + 0.5;
    color = smoothstep(vec3(0.06), vec3(1.0), color);

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray), color, 0.6);

    float noise = random(uv * uResolution + uTime * 5.0) - 0.5;
    color += noise * 0.15;

    float scan = sin(uv.y * uResolution.y * 1.5) * 0.02;
    color -= scan;

    float dist = distance(uv, vec2(0.5));
    float vignette = smoothstep(0.8, 0.2, dist);
    color *= mix(0.6, 1.05, vignette);

    gl_FragColor = vec4(color,1.0);
  }
  `;
  return createFilter(fragment);
}
