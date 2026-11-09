// Pages en thème clair (en validation : accueil uniquement). Partagé par ThemeRoot, Header et ParticleCanvas.
const LIGHT_PATHS = ['/']

export function isLightPath(pathname: string): boolean {
  return LIGHT_PATHS.includes(pathname)
}
