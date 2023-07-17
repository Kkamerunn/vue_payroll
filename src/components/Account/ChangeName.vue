<template>
    <form class="form change-name" @submit.prevent="onChangeName">
        <input 
            type="text" 
            placeholder="Name and lastname" 
            class="form-control"
            v-model="name"
            :class="{ error: formError }"    
        />
        <button type="submit" class="btn btn-primary w-25 mt-3">{{ loading ? 'Updating user...' : 'Update' }}</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import * as Yup from 'yup'
import { updateProfile, auth } from '../../utils/firebase'
import { useStore } from 'vuex'
export default {
    name: 'ChangeName',
    setup() {
        const name = ref("")
        const formError = ref(false)
        const loading = ref(false)
        const store = useStore()

        const schemaForm = Yup.object().shape({
            name: Yup.string().min(6, true).required(true)
        })

        const onChangeName = async () => {
            formError.value = false
            loading.value = true

            try {
                await schemaForm.validate({ name: name.value }, { abortEarly: false })

                try {
                    await updateProfile(auth.currentUser, {
                        displayName: name.value
                    })

                    store.dispatch('reloadUser')
                } catch (error) {
                    console.log(error)
                }
            } catch(err) {
                err.inner.forEach(error => {
                    formError.value = error.message
                })
            }

            loading.value = false
        }

        return {
            name,
            onChangeName,
            formError,
            loading
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 100%;
    }

    &.change-name {
        text-align: center;
    }

    input.error {
        border-color: #faa;
        background-color: #ffeded;
    }
}
</style>