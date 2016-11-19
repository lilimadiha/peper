import {Router} from 'meteor/akryum:vue-router2';
import Toolbar from '/imports/client/views/templates/toolbar/Toolbar.vue';
import SideNavigation from '/imports/client/views/templates/navigation/SideNavigation.vue';
import Index from '/imports/client/views/public/Index.vue';
import ComponentsAvatar from '/imports/client/views/public/components/Avatar.vue';
import ComponentsButton from '/imports/client/views/public/components/Button.vue';

import GoldIndex from '/imports/client/views/public/gold/Index.vue';
import GoldDefaultToolbar from '/imports/client/views/templates/toolbar/GoldDefaultToolbar.vue';


Router.configure(router => {
    router.addRoutes([
        {
            path: "/",
            name: "Index",
            meta: { fixToolbar: true },
            components: {
                default: Index,
                toolbar: Toolbar,
                navigation: SideNavigation,
            }
        },
        {
            path: "/nizul",
            name: "Nizul",
            meta: { fixToolbar: true },
            components: {
                default: Index,
                toolbar: Toolbar,
                navigation: SideNavigation,
            }
        },
        {
            path: "/components/button",
            name: "ComponentsButton",
            meta: { fixToolbar: true },
            components: {
                default: Index,
                toolbar: Toolbar,
                navigation: SideNavigation,
            }
        },
        {
            path: "/components/avatar",
            name: "ComponentsAvatar",
            meta: { fixToolbar: true },
            components: {
                default: ComponentsAvatar,
                toolbar: Toolbar,
                navigation: SideNavigation,
            }
        },
        {
            path: "/gold",
            name: "GoldIndex",
            meta: { fixToolbar: true },
            components: {
                default: GoldIndex,
                toolbar: GoldDefaultToolbar,
                navigation: SideNavigation,
            }
        },
    ]);
});
