// 颜色配置
export const COLORS = {
  primary: '#000000',      // 深黑
  neonPurple: '#8B5CF6',   // 霓虹紫
  neonCyan: '#06B6D4',     // 霓虹青
  glitchRed: '#FF0040',    // 故障红
  glitchBlue: '#00D4FF',   // 故障蓝
  white: '#FFFFFF',
  gray: '#1A1A1A',
}

// 3D 场景配置
export const SCENE_CONFIG = {
  cameraPosition: [0, 0, 5] as [number, number, number],
  cameraFov: 75,
  maxParticles: 5000,
  baseParticleCount: 500,
  geometryCount: 12,
  rotationSpeed: 0.001,
  mouseInfluence: 2.0,
}

// 滚动配置
export const SCROLL_CONFIG = {
  sections: 5,
  lerpFactor: 0.1,
  threshold: 0.1,
}

// 动画配置
export const ANIMATION_CONFIG = {
  glitchDuration: 0.1,
  pulseDuration: 0.5,
  shakeIntensity: 5,
  transitionDuration: 0.3,
}
