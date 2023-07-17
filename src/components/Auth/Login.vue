<template>
    <div class="login">
        <h2>Login</h2>

        <form @submit.prevent="onLogin">
            <div class="mb-3">
                <!-- <label class="form-label" for="email">Email</label> -->
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Type your email" 
                    class="form-control"
                    v-model="formData.email"
                    :class="{ error: formError.email }"
                />
            </div>
            <div class="mb-3">
                <!-- <label class="form-label" for="password">Password</label> -->
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Type your password" 
                    class="form-control"
                    v-model="formData.password"
                    :class="{ error: formError.password }"
                />
            </div>
            <button type="submit" class="btn btn-success">{{ !loading ? 'Login' : 'Login user...' }}</button>
        </form>

        <p @click="changeShowLogin">Sign up</p>
    </div>
</template>

<script>
import * as Yup from 'yup'
import { ref } from 'vue'
import { auth, signInWithEmailAndPassword } from '../../utils/firebase'
export default {
    name: 'Login',
    props: {
        changeShowLogin: {
            type: Function
        }
    },
    setup() {
        let formData = {}
        let formError = ref({})
        let loading = ref(false)

        const schemaForm = Yup.object().shape({
            email: Yup.string().email(true).required(true),
            password: Yup.string().required(true),
        })

        const onLogin = async () => {
            loading.value = true
            try {
                await schemaForm.validate(formData, { abortEarly: false })
                
                try {
                    const { email, password } = formData
                    await signInWithEmailAndPassword(auth, email, password)
                } catch (error) {
                    console.log(error)
                }
            } catch (err) {
                err.inner.forEach(error => {
                    formError.value[error.path] = error.message
                })
            }
            loading.value = false
        }

        return {
            formData,
            formError,
            loading,
            onLogin
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    background-color: #fff;
    padding: 30px;
    box-shadow: 0px 0px 38px -5px rgba(0,0,0,.45);
    width: 400px;
    border-radius: 10px;

    h2 {
        text-align: center;
        margin-bottom: 30px;
    }

    form {
        button {
            width: 100%;
        }

        input.error {
            border-color: #faa;
            background-color: #ffeded;
        }
    }

    p {
        text-align: center;
        margin-top: 30px;

        &:hover {
            cursor: pointer;
            opacity: 0.6;
        }
    }
}
</style>