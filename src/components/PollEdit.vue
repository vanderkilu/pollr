<template>
    <div class="text-center">
        <div class="form-container">
            <p class="instructions">create polls by adding a question <br> and two alternatives </p>
            <form @submit.prevent="updateAll" class="poll-create">
                <input type="text" placeholder="question" v-model="poll">
                <input type="text" placeholder="first alternative" v-model="altA.value">
                <input type="text" placeholder="second alternative" v-model="altB.value">
                <button type="submit" class="btn btn-custom"> update </button>
            </form>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
export default {
    
}
</script>

