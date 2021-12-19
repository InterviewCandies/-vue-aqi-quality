import Vue from 'vue'
import App from './App.vue'

import { Button, Card, Menu, MenuItem, Row, Col, Submenu } from 'element-ui'

Vue.component(Button.name, Button);
Vue.component(Card.name, Card);
Vue.component(Submenu.name, Submenu);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
