<template>
  <div class="home">
    <div>
    <HelloWorld/>
    </div>
  </div>
</template>

<script>
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
