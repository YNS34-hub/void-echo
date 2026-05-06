// 粒子顶点着色器
export const particleVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uSize;

  attribute float aScale;
  attribute vec3 aRandomness;

  varying vec3 vColor;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // 滚动时的扭曲效果
    float distortion = sin(uScrollProgress * 10.0 + modelPosition.x * 5.0) * 0.5;
    modelPosition.y += distortion * uScrollProgress;

    // 鼠标影响
    float mouseDistance = distance(modelPosition.xy, uMouse * 3.0);
    float mouseInfluence = smoothstep(3.0, 0.0, mouseDistance);
    modelPosition.xy += normalize(modelPosition.xy - uMouse * 3.0) * mouseInfluence * 0.5;

    // 随机运动
    modelPosition.xyz += aRandomness * (1.0 + uScrollProgress * 2.0);

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // 颜色变化
    vColor = vec3(
      0.5 + 0.5 * sin(uTime + modelPosition.x * 2.0),
      0.5 + 0.5 * sin(uTime + modelPosition.y * 2.0 + 2.0),
      0.5 + 0.5 * sin(uTime + modelPosition.z * 2.0 + 4.0)
    );
  }
`

// 粒子片段着色器
export const particleFragmentShader = `
  varying vec3 vColor;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(vColor, strength);
  }
`

// 几何体顶点着色器
export const geometryVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uMouse;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normal;

    vec3 newPosition = position;

    // 滚动时的变形
    float distortion = sin(uScrollProgress * 5.0 + position.x * 3.0) * 0.3;
    newPosition += normal * distortion * uScrollProgress;

    // 鼠标影响
    float mouseDistance = distance(newPosition.xy, uMouse * 2.0);
    float mouseInfluence = smoothstep(2.0, 0.0, mouseDistance);
    newPosition.z += mouseInfluence * 0.5;

    // 时间动画
    newPosition += sin(uTime * 0.5 + position * 2.0) * 0.1;

    vElevation = newPosition.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`

// 几何体片段着色器
export const geometryFragmentShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec3 uColor;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    // 基础颜色
    vec3 color = uColor;

    // 法线颜色混合
    color = mix(color, vec3(0.545, 0.361, 0.965), vNormal.x * 0.5 + 0.5);
    color = mix(color, vec3(0.024, 0.714, 0.831), vNormal.y * 0.5 + 0.5);

    // 高度颜色
    color += vElevation * 0.2;

    // 故障效果
    float glitch = step(0.95, sin(uTime * 10.0 + vUv.y * 50.0));
    color = mix(color, vec3(1.0, 0.0, 0.25), glitch * uScrollProgress);

    // 发光边缘
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
    color += fresnel * vec3(0.545, 0.361, 0.965) * 0.5;

    gl_FragColor = vec4(color, 0.9);
  }
`
