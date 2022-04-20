import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import MediaShow from "../views/MediaShow.vue";
import PersonShow from "../views/PersonShow.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  { path: "/:mediaType/:id/lang=:lang/", name: "MediaShow", component: MediaShow },
  { path: "/person/:id", name: "PersonShow", component: PersonShow },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
