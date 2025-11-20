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
import EventDetailView from '@/views/EventDetailView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/forum',
      name: 'forum',
      component: ForumView,
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

  ],
})

export default router
