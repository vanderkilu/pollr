<template>
    <div class="comment-container">
        <span class="comment__user-initial">P</span>
        <p class="comment__username">{{comment.user.profile}}</p>
        <p class="comment__created">{{comment.created | cleanDate }}</p>
        <p class="comment__text">{{comment.text}}</p>
        <span class="comment__likes-count" @click="toggleCount">
            <i class="heart" :class="{colored: hasLiked}"> &hearts; </i>
            {{this.likes }}
        </span>
    </div>
</template>

<script>
import { likeToggle } from '../api'
import {getAuth} from '../helpers'
export default {
    props: ['comment', 'profile'],
    data() {
        return {
            likes: this.comment.likes.length || 0,
            hasLiked: false,
        }
    },
    computed: {
        liked() {
            const hasLiked = this.comment.likes.find(id => id === getAuth().userId )
            return (hasLiked) ? true : false
        },
        notAuthenticated() {
            return localStorage.getItem('jwt') === null
        },
    },
    methods: {
        async toggleCount() {
            if (this.notAuthenticated) 
                return this.$router.push({name: 'login'})
            const {data} = await likeToggle(this.comment._id)
            this.likes += data.data
            if (data.data === -1) {
                this.hasLiked = false 
            }
            else {
                this.hasLiked = true
            }

        }
    },
    mounted() {
        this.hasLiked = this.liked
    }
}
</script>

<style scoped>
    .comment-container {
        display: grid;
        grid-template-columns: 5rem 1fr;
        padding: 1rem 3rem;
        background-color: white;
        box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.1);
        margin-bottom: 1rem;
        width: 60%;
        border-radius: 5px;
    }
    .comment__user-initial {
        grid-row: 1 / span 2;
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
        background-color:#ede7f6;
        color: #673ab7;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .comment__username {
        color: #673ab7;
        font-size: 1.2rem;
    }
    .comment__created {
        color: #bdbdbd;
    }
    .comment__text {
        margin-top: 2rem;
        grid-column: 1 / 3;
        font-size: 1.4rem;
        color: #9e9e9e;
    }
    .comment__likes-count {
        grid-column: 1 / 3;
        margin-top: 1rem;
        color: #673ab7;
        cursor: pointer;
        padding: 0.4rem;
    }
    .heart {
        font-size: 2rem;
        color: #673ab7;
    }
    .colored {
        color: red;
    }
</style>
