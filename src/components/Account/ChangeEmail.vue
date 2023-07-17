<template>
    <form class="form change-email" @submit.prevent="onChangeEmail">
        <div class="two fields col-12 d-flex justify-content-between">
            <div class="field col-5">
                <input 
                    type="email" 
                    placeholder="New email" 
                    class="form-control"
                    v-model="formData.email"
                    :class="{ error: formError.email }"    
                />
            </div>
            <div class="field col-5">
                <input 
                    type="password" 
                    placeholder="Current password" 
                    class="form-control"
                    v-model="formData.password"
                    :class="{ error: formError.password }"    
                />
            </div>
        </div> 
        <p v-if="messageError">{{ messageError }}</p>
        <button type="submit" class="btn btn-primary w-25 mt-3">{{ loading ? 'Updating user...' : 'Update' }}</button>
    </form>
</template>

<script>
import { ref } from 'vue'
import * as Yup from 'yup'
import { reauthenticate } from '../../utils/firebaseFunctions'
import { useStore } from 'vuex'
import { auth, updateEmail } from '../../utils/firebase'
export default {
    name: 'ChangeEmail',
    setup() {
        const formData = {}
        const formError = ref({})
        const messageError = ref("")
        const loading = ref(false)
        const store = useStore()

        const schemaForm = Yup.object().shape({
            email: Yup.string().email(true).required(true),
            password: Yup.string().required(true)
        })

        const onChangeEmail = async () => {
            formError.value = {}
            loading.value = true

            try {
                await schemaForm.validate(formData, { abortEarly: false })

               /*  try {
                    await updateProfile(auth.currentUser, {
                        email: email.value
                    })

                    store.dispatch('reloadUser')
                } catch (error) {
                    console.log(error)
                } */
                try {
                    const { email, password } = formData
                    await reauthenticate(password)
                    await updateEmail(auth.currentUser, email.value)
                    auth.signOut()
                } catch (error) {
                    messageError.value = error.message
                }
            } catch(err) {
                err.inner.forEach(error => {
                    formError.value[error.path] = error.message
                })
            }

            loading.value = false
        }

        return {
            onChangeEmail,
            formError,
            formData,
            loading,
            messageError
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

    &.change-email {
        text-align: center;
    }

    input.error {
        border-color: #faa;
        background-color: #ffeded;
    }
}
</style>