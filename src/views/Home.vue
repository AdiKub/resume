<template>
  <div class="home">
    <backgrount>
    <div>
      <sideBar>
      <content>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
  	// const fireDb = window.firebase.database();
		// fireDb.ref().on('value', (snapshot, err) => {
		// 	if (err) {console.log(err)} 
		// 	else {
		// 		dispatch({ type: 'SET_RESUME', title: snapshot.val() }) 
		// 	}
		// })
}
</script>
