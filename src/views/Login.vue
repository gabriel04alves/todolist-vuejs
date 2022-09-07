<template>
  <v-container fill-height fluid text-center id="td">
    <v-container>
        <v-row>
            <v-col id="titulopg" class="primary--text text-center mx-auto pb-4 " cols="1" sm="8" offset="4" >
                <h1 class="h1">Bem vindo ao Task of the day </h1>
                <h3>Aqui você pode organizar suas tarefas do dia!</h3>
            </v-col>
        </v-row>
        <v-row id="box" class="elevation-4 mx-auto pa-10" > 
            <v-col cols="auto">
                <v-img max-height="250" max-width="250" src="@/assets/images/task img.png"></v-img>
            </v-col>
            <v-col>
                <v-form id="form">
                    <v-text-field label="Email" v-model="user.email"></v-text-field>
                    <v-text-field label="Senha" 
                    v-model="user.password" 
                    :type="show ? 'text' : 'password'" 
                    :append-icon= "show ? 'mdi-eye' : 'mdi-eye-off' " 
                    @click:append="show = !show">
                    </v-text-field>
                    <v-row>
                        <v-col>                            
                            <v-btn class="button" @click="login"><span>Login</span></v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <h3>Acesse com: </h3>
                            <v-icon @click="loginGoogle" color="blue">mdi-google</v-icon>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
    <v-snackbar color="red" v-model="errorLogin" danger multline timeout="1500">
        Usuário ou senha inválidos 
    </v-snackbar>

    <v-dialog v-model="novaConta" persistent max-width="300">
        <v-card>
            <v-card-title>Conta não encontrada.</v-card-title>
            <v-card-text>
                A conta não foi localizada. Deseja criar uma nova conta com os dados informados?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="criarNovaConta">Sim</v-btn>
                <v-btn color="red darken-1" text @click="novaConta = false">Não</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
    import * as fb from "@/plugins/firebase";
    export default {
    data() {
        return {
        user: {},
        show: false,
        errorLogin: false,
        novaConta: false,
        };
    },
    methods: {
        reset() {
        this.user = {};
        },
        async loginGoogle() {
            await fb.auth.signInWithPopup(fb.googleProvider)
            this.$router.push({ name: "Home" });
        },
        async login() {
        try {
            await fb.auth.signInWithEmailAndPassword(
            this.user.email,
            this.user.password
            );
            this.$router.push({ name: "Home" });
        } catch (error) {
            const errorCode = error.code;
            switch (errorCode) {
            case "auth/wrong-password":
                this.errorLogin = true;
                break;
            case "auth/invalid-email":
                this.errorLogin = true;
                break;
            case "auth/user-not-found":
                this.novaConta = true;
                break;
            default:
                this.errorLogin = true;
                break;
            }
        }
        },
        async criarNovaConta() {
        this.novaConta = false;
        await fb.auth.createUserWithEmailAndPassword(
            this.user.email,
            this.user.password
        );
        this.login();
        },
        
    },
    
    };
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Oswald&family=PT+Serif&family=Poppins:wght@100;200&family=Raleway:ital,wght@0,200;0,300;1,200&family=Roboto+Condensed:ital,wght@0,300;1,300&display=swap');

#td {
    font-family: 'Roboto Condensed', sans-serif; 
    }

h1 {
    font-size: 40px;
}

#box {
    border-radius: 25px;
}


.button {
 display: inline-block;
 padding: 12px 24px;
 border: 1px solid #1899D6;
 border-radius: 4px;
 transition: all 0.2s ease-in;
 position: relative;
 overflow: hidden;
 font-size: 19px;
 color: black;
 z-index: 1;
}

.button:before {
 content: "";
 position: absolute;
 left: 50%;
 transform: translateX(-50%) scaleY(1) scaleX(1.25);
 top: 100%;
 width: 140%;
 height: 180%;
 background-color: rgba(255, 255, 255, 0.918);
 border-radius: 50%;
 display: block;
 transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
 z-index: -1;
}

.button:after {
 content: "";
 position: absolute;
 left: 55%;
 transform: translateX(-50%) scaleY(1) scaleX(1.45);
 top: 180%;
 width: 160%;
 height: 190%;
 background-color: #1899D6;
 border-radius: 50%;
 display: block;
 transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
 z-index: -1;
}

.button:hover {
 color: #ffffff;
 border: 1px solid #1899D6;
}

.button:hover:before {
 top: -35%;
 background-color: #1899D6;
 transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

.button:hover:after {
 top: -45%;
 background-color: #1899D6;
 transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}


</style>