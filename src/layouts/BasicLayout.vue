<template>
    <div class="basic-layout">
        <Menu />
        <div class="container">
            <slot />
        </div>
    </div>
</template>

<script>
import Menu from '../components/Menu.vue'
export default {
    name: 'BasicLayout',
    components: {
        Menu
    }
}
</script>