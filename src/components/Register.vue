<template>
  <div>
    <div class="container">
    <div class="row">
      <div class="add-row">
        <div class="login">
          <h3>Register</h3>
          <form action="index.html">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email" placeholder="Email Address">
              <label for="email"></label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password" placeholder="Password">
              <label for="password"></label>
            </div>
            <button v-on:click="register" class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'register',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
            // console.log(user);
            alert(`Account Created for ${this.email}`);
            this.$router.push('/');
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
button {
    border: 1px solid #7200ca;
  color:#7200ca;
  border-radius: 25px;
  padding: 10px 25px;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
}

h3 {
  font-size: 20px;
  color: #62757f;
}

#email, #password {
  border: none;
  height: 49px;
  background: transparent;
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}

.input-field {
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
margin-top: 20px;
}
.material-icons {
  color:#7200ca;
  margin-right: 15px;
  font-size: 24px;
}
</style>