<template>
  <div class="wrapper-poll">
    <div class="question">
        <span class="question__category">{{poll.category.name}}</span>
        <h1 class="question__text">{{poll.title}}</h1>
        <div class="question__detail">
            asked by
            <span class="question__user">{{poll.user.profile}}</span>
            on
            <span class="question__time">{{poll.created | cleanDate }}</span>
        </div>
    </div>
    <div class="options" >
      <p class="flash" v-show="flashed">You have already voted </p>
      <div class="poll-option" v-for="(option,i) in options" :key="i" @click="vote(option)">
        <h3 class="poll-option__text">{{option.value}}</h3>
        <div class="progress">
          <div class="bar" :style="{width: percent(option) + '%' }"></div>
        </div>
        <p class="poll-count">{{updateOptionCount(option) }} votes</p>
        <span class="poll-percent">{{percent(option)}}% </span>
      </div>
    </div>

    <div class="comment">
      <h3 class="comment__title">Responses</h3>
      <form class="comment__form" @submit.prevent="createComment">
        <textarea type="text" class="comment__input" v-model="comment"></textarea>
        <button class="btn">publish</button>
      </form>
      <app-comment-container v-for="comment in comments" :key="comment.id" :comment="comment"></app-comment-container>
    </div>

    <app-loader v-show="isLoading"></app-loader>
  </div>
</template>


<script>
import io from "socket.io-client";
import CommentContainer from "./CommentContainer.vue";
import Loader from './Loader.vue'
import {
  getPoll,
  getAllOptionsForPoll,
  doVote,
  updateCount,
  getAllComment,
  commentCreate
} from "../api";

export default {
  data() {
    return {
      id: this.$route.params.id,
      poll: {title: '', category: {name: ''}, user: {profile: ''}}, //mock poll
      options: [],
      increment: 0,
      socket: io("http://localhost:3000"),
      optionToUpdate: "",
      voted: false,
      isUser: false,
      comments: [],
      comment: "",
      isLoading: true,
      flashed: false
    };
  },
  mounted() {
    this.socket.on("vote", data => {
      this.increment = data.count;
      this.optionToUpdate = data.option;
    });
    this.socket.on("COMMENTED", data => {
      this.comments.push(data);
    });
    this.getData();
    this.getComments();
  },
  computed: {
    totalPollVote() {
      return this.increment + this.poll.count;
    }
  },
  methods: {
    notAuthenticated() {
      return localStorage.getItem('jwt') === null
    },
    percent(option) {
      const total = this.totalPollVote
      if (total === 0) return 0
      return Math.floor(this.updateOptionCount(option) / total  * 100);
    },
    async updateVoteCount() {
      const data = await updateCount(this.id);
      return data;
    },
    generateTotalVote(instance) {
      return instance.votes.length;
    },
    async getComments() {
      const comments = await getAllComment(this.id);
      this.comments = comments.data;
    },
    async vote(option) {
      if (this.notAuthenticated) return this.$router.push({name: 'login'});
      if (!this.voted) {
        const data = await doVote(this.id, option._id);
        const message = { count: 0, option: data.data.pollOption };
        const type = data.data.type;
        if (type === "increase") {
          message.count++;
          this.updateVoteCount();
        }
        else {
          this.flashed = true
        }
        this.socket.emit("vote", message);
        this.voted = true;
      }
    },
    updateOptionCount(option) {
      if (this.optionToUpdate === option.value) {
        return this.increment + this.generateTotalVote(option);
      }
      return this.generateTotalVote(option);
    },
    async getData() {
      const pollData = await getPoll(this.id);
      const optionData = await getAllOptionsForPoll(this.id);
      this.poll = pollData.data;
      this.options = optionData.data;
      this.isLoading = false
    },
    async createComment() {
      if (this.notAuthenticated) return this.$router.push({name: 'login'});
      const comment = await commentCreate(this.id, { text: this.comment });
      this.socket.emit("COMMENT", comment.data);
      this.comment = "";
    }
  },
  components: {
    appCommentContainer: CommentContainer,
    appLoader: Loader
  }
};
</script>

<style scoped>
.wrapper-poll {
  margin: 5rem 0;
}
.question {
  width: 60%;
  margin-bottom: 10rem;
}
.question__detail {
  font-size: 1.7rem;
  color: #757575;
  margin-top: 1rem;
}
.question__user {
  color: #424242;
}
.question__text {
  font-size: 3.5rem;
  color: #212121;
  margin-top: 2rem;
}
.question__vote {
  margin-top: 2rem;
}
.question__category {
    color: #b71c1c;
    font-size: 1.6rem;
    border-radius: 3px;
    padding: 1rem 2rem;
    background-color: #ffcdd2;
    font-weight: 600;
    border-radius: 6rem;
}
.options {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
}

.poll-option {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 6rem;
  font-size: 1.7rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  background-color: white;
  transition: all 0.5s;
}
.poll-option:hover {
    transform: scale(1.04);
}
.poll-option__text {
  color: #616161;
}
.poll-option > * {
  margin: 1rem 0;
}
.poll-percent {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.8rem;
}
.poll-count {
  color: #9e9e9e;
  font-size: 1.4rem;
}
.comment__input {
  width: 100%;
  padding: 1rem 2rem;
  transition: all 0.35s;
  margin-bottom: 2rem;
  border: none;
  border-radius: 3px;
  box-shadow: 0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.1);
  height: 5rem;
  color: #616161;
  font-family: inherit;
}
.comment__input:focus {
  padding: 6rem 4rem;
  outline: none;
}
.comment__form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
  width: 60%;
}
.comment {
  margin-top: 30rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.comment__title {
  font-size: 2rem;
  color: #212121;
  font-weight: 600;
}
.btn {
  padding: 2rem 4rem;
  border: none;
  border-radius: 5px;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.01);
  background-color: white;
  color: #673ab7;
  font-size: 1.4rem;
  transition: all 0.4s;
  opacity: 1;
  margin-bottom: 5rem;
}
.btn:focus {
  outline: none;
}
.btn:hover {
  cursor: pointer;
}
.progress {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 3rem;
}
.flash {
  padding: 1rem 2rem;
  background-color: #f9fbe7;
  color: #424242;
  font-size: 1.5rem;
  border-radius: 5px;
  width: 40%;
}
.bar {
  width: 0;
  height: 1rem;
  background-color: #673ab7;
  border-radius: 2rem;
}
@media only screen and (max-width: 900px) {
  .options {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}
</style>
