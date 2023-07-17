<template>
    <div class="account">
        <BasicLayout>
            <h1>Welcome to settings</h1>
            <div class="account__section">
                <p class="title">
                    Change name <span v-if="user">{{ user.displayName }}</span>
                </p>
                <ChangeName />
            </div>
            <div class="account__section">
                <p class="title">
                    Change email <span>{{ user.email }}</span>
                </p>
                <ChangeEmail />
            </div>
        </BasicLayout>
    </div>
</template>

<script>
import BasicLayout from '../layouts/BasicLayout.vue'
import ChangeName from '../components/Account/ChangeName.vue'
import ChangeEmail from '../components/Account/ChangeEmail.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name: 'Account',
    components: {
        BasicLayout,
        ChangeName,
        ChangeEmail
    },
    setup() {
        const store = useStore()
        const user = computed(() => store.state.user)

        return {
            user
        }
    }
}
</script>

<style lang="scss" scoped>
.account {
    h1 {
        margin: 50px 0;
        text-align: center;
    }

    &__section {
        position: relative;
        padding: 10px;
        border: 1px solid #16212b;
        padding-top: 25px;
        margin-top: 40px;

        .title {
            position: absolute;
            top: -12px;
            background-color: #16212b;
            color: #fff;
            padding: 2px 10px;
        }
    }
}
</style>