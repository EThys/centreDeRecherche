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
      path: '/evenements',
      name: 'evenement',
      component: EventView,
    },
    {
      path: '/activites-recherche',
      name: 'activites-recherche',
      component: ActivityRecherche,
    },

  ],
})

export default router
