/* 1.导入Vue和VueRouter的包 */
import Vue from "vue";
import VueRouter from "vue-router";

/* 2.调用Vue.use()函数，把VueRouter安装为Vue的插件 */
Vue.use(VueRouter);

/* 3.创建路由实例对象 */
const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/sdk" },
    {
      path: "/sdk",
      name: "sdk",
      component: (resolve) => require(["../page/sdk/indexDemo.vue"], resolve), //src\page\polkat/indexDemo.vue
      children: [
        { path: "/sdk", component: (resolve) => require(["../page/sdk/components/account/indexDemo.vue"], resolve) },
        { path: "/sdk/accountMenagement", component: (resolve) => require(["../page/sdk/components/account/indexDemo.vue"], resolve) },
        { path: "/sdk/assets", component: (resolve) => require(["../page/sdk/components/assets/indexDemo.vue"], resolve) },
        { path: "/sdk/identities", component: (resolve) => require(["../page/sdk/components/identities/indexDemo.vue"], resolve) },
        { path: "/sdk/claims", component: (resolve) => require(["../page/sdk/components/claims/indexDemo.vue"], resolve) },
        { path: "/sdk/settlements", component: (resolve) => require(["../page/sdk/components/settlements/indexDemo.vue"], resolve) },
        { path: "/sdk/network", component: (resolve) => require(["../page/sdk/components/network/indexDemo.vue"], resolve) },
        { path: "/sdk/demo", component: (resolve) => require(["../page/sdk/components/deMo.vue"], resolve) },
        { path: "/sdk/demo1", component: (resolve) => require(["../page/sdk/components/deMo1.vue"], resolve) },
      ],
    },
    {
      path: "/polkat",
      name: "polkat",
      component: (resolve) => require(["../page/polkat/indexDemo.vue"], resolve), //src\page\polkat/indexDemo.vue
      children: [
        {
          path: "/polkat",
          name: "pk-init",
          component: (resolve) => require(["../page/polkat/components/initDemo.vue"], resolve), //src\page/polkat/components/initDemo.vue
        },
        {
          path: "/polkat/init",
          name: "pk-init",
          component: (resolve) => require(["../page/polkat/components/initDemo.vue"], resolve), //src\page/polkat/components/initDemo.vue
        },
        {
          path: "/polkat/account",
          name: "pk-account",
          component: (resolve) => require(["../page/polkat/components/accountDemo.vue"], resolve), //src\page/polkat/components/initDemo.vue
        },
        {
          path: "/polkat/import",
          name: "pk-import",
          component: (resolve) => require(["../page/polkat/components/importJson.vue"], resolve), //src\page/polkat/components/initDemo.vue
        },
        {
          path: "/polkat/api",
          name: "pk-apiDemo",
          component: (resolve) => require(["../page/polkat/components/apiDemo.vue"], resolve), //src\page/polkat/components/initDemo.vue
        },
      ],
    },
    {
      path: "/entity",
      name: "entity",
      component: (resolve) => require(["../page/entity/indexDemo.vue"], resolve), //src\page\polkat/indexDemo.vue
      children: [
        {
          path: "/entity",
          component: (resolve) => require(["../page/entity/components/testDemo1.vue"], resolve), //src\page/polkat/components/initDemo.vue
        },
      ],
    },
    {
      path: "/*",
      component: (resolve) => require(["../page/sdk/indexDemo.vue"], resolve), //src\page\polkat/indexDemo.vue
    },

    /* 重定向规则：用户在访问地址 A 的时候，强制用户跳转到地址 C ，从而展示特定的组件页面。
        通过路由规则的 redirect 属性，指定一个新的路由地址 */

    // 路由规则
  ],
});

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

/* 4.向外共享router */
export default router;
