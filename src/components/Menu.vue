<template>
    <nav class="navbar navbar-expand-lg menu">
        <div class="container">
            <div class="menu left">
                <router-link class="navbar-brand item" to="/">Nominas</router-link>    
            </div>
            <router-link class="menu center" to="/">
                <img class="image" src="../assets/nomina.png" />
            </router-link>
            <div class="menu right">
                <router-link class="navbar-brand item" to="/account">
                    Hola, {{ user.displayName || user.email }}
                </router-link>
                <span class="item logout" @click="logout">
                    <ArrowRight />
                </span>
            </div>
        </div>    
    </nav>    
</template>

<script>
import ArrowRight from '../components/Icons/ArrowRight.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { auth } from '../utils/firebase'
export default {
    name: 'Menu',
    components: {
        ArrowRight
    },
    setup() {
        const store = useStore()
        const user = computed(() => store.state.user)

        const logout = () => auth.signOut()

        return {
            user,
            logout
        }
    }
}
</script>

<style lang="scss" scoped>
.menu {
    background-color: #16202b;

    .item {
        color: #fff;
        &:hover {
            color: #1fa1f1;
        }
    }

    .menu.left {
        width: 50%;
    }
    .menu.right {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .logout:hover {
            cursor: pointer;
        }
    }
    .menu.center {
        background-color: #16212b;
        position: relative;
        top: 15px;
        padding: 20px;
        margin: -20px;
        border-radius: 50%;
        &:hover {
            box-shadow: 0px 10px 10px -3px rgba(0,0,0,.3);
            -webkit-box-shadow: 0px 10px 10px -3px rgba(0,0,0,.3);
            -moz-box-shadow: 0px 10px 10px -3px rgba(0,0,0,.3);
        }
        .image {
            width: 40px;
        }
    }
}
</style>