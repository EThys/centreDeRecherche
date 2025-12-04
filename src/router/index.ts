import { createRouter, createWebHistory } from 'vue-router'
//@ts-ignore
import HomeView from '../views/HomeView.vue'
//@ts-ignore
import ForumView from "../views/ForumView.vue";
//@ts-ignore
import PublicationView from "../views/PublicationView.vue";
//@ts-ignore
import EventView from "../views/EventView.vue";
//@ts-ignore
import ActivityRecherche from "../views/ActivityRechercheView.vue";
//@ts-ignore
import AllActuality from "../views/AllActualityView.vue";
//@ts-ignore
import PublicationDetail from "../views/PublicationDetailView.vue";
//@ts-ignore
import EventDetailView from '@/views/EventDetailView.vue';
//@ts-ignore
import ActualityDetailView from '@/views/ActualityDetailView.vue';
import ContactView from '@/views/ContactView.vue';
import AuthView from '@/views/AuthView.vue';
//@ts-ignore
import AboutView from '@/views/AboutView.vue';
//@ts-ignore
import EntrepreneursView from '@/views/EntrepreneursView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/authentification',
      name: 'authentification',
      component: AuthView,
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumView,
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/publications',
      name: 'publications',
      component: PublicationView,
    },
    {
      path: '/publications/:id',
      name: 'PublicationDetail',
      component: PublicationDetail,
      props: true
    }, 
    {
      path: '/actualites',
      name: 'actualites',
      component: AllActuality,
    },
    {
      path: '/actualites/:id',
      name: 'ActualityDetail',
      component: ActualityDetailView,
      props: true
    },
    {
      path: '/evenements',
      name: 'evenement',
      component: EventView,
    },
    {
      path: '/events/:id',
      name: 'EventDetail',
      component: EventDetailView
    },
    {
      path: '/activites-recherche',
      name: 'activites-recherche',
      component: ActivityRecherche,
    },
    {
      path: '/entrepreneurs',
      name: 'entrepreneurs',
      component: EntrepreneursView,
    },
    {
      path: '/politique-confidentialite',
      name: 'privacy-policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/mentions-legales',
      name: 'legal-notice',
      component: () => import('../views/LegalNoticeView.vue'),
    },
    {
      path: '/conditions-utilisation',
      name: 'terms-of-service',
      component: () => import('../views/TermsOfServiceView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, behavior: 'smooth' }
  }
})

// Guard de route pour protéger les pages nécessitant une authentification
router.beforeEach((to, from, next) => {
  // Vérifier si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifier si l'utilisateur est authentifié (vérifier le token dans localStorage)
    const token = localStorage.getItem('auth_token')
    
    if (!token) {
      // Rediriger vers la page d'autorisation si non authentifié
      next({
        name: 'unauthorized',
        query: { redirect: to.fullPath } // Sauvegarder la route demandée pour redirection après login
      })
    } else {
      // L'utilisateur est authentifié, continuer
      next()
    }
  } else {
    // La route ne nécessite pas d'authentification, continuer
    next()
  }
})

export default router