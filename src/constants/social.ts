export type SocialNetwork = {
  name: string
  icon: string
  url: string
}

/** Liens officiels CReFF-PME — source unique pour toute la plateforme */
export const SOCIAL_LINKS: SocialNetwork[] = [
  {
    name: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    url: 'https://www.linkedin.com/in/creff-pme-a086a43b1',
  },
  {
    name: 'X',
    icon: 'fab fa-x-twitter',
    url: 'https://x.com/CReFFPME',
  },
  {
    name: 'Facebook',
    icon: 'fab fa-facebook-f',
    url: 'https://www.facebook.com/profile.php?id=61584604711374',
  },
]

export const SOCIAL_URLS = {
  linkedin: 'https://www.linkedin.com/in/creff-pme-a086a43b1',
  x: 'https://x.com/CReFFPME',
  facebook: 'https://www.facebook.com/profile.php?id=61584604711374',
} as const
