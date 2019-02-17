<template>
    <div class="wrapper">
        <router-link :to="{name: 'home'}">
            <img src=../assets/logo.png class="logo" alt="logo">
        </router-link>
        <div class="container">
            <section class="left-content">
                <h1 class="left-content__text--bold"> Create a <span class="black-color">poll</span> now and see results in <span class="black-color">realtime </span></h1>
                <h6 class="left-content__text--small">People opinions and interest count, let them help you make the right choice</h6>
                <slot></slot>
            </section>
            <section class="right-content">
                <img src="../assets/poll.svg" alt="poll image">
            </section>
        </div>
    </div>
</template>


<style scoped>
    .wrapper {
        background-image: linear-gradient(to bottom right, #7e57c2 ,#673ab7);
        height: 75vh;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        padding: 2rem 10rem;
    }
    .container {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        grid-column-gap: 5rem;
    }
    .left-content__text--bold {
        font-size: 4.7rem;
        font-weight: 600;
        line-height: 1.4;
        color: #eeeeee;
        text-transform: capitalize;
        padding-top: 5rem;
    }
    .left-content__text--small {
        color: #e0e0e0;
        margin: 5rem 0;
        font-size: 1.5rem;
    }
    .black-color {
        text-decoration-style:dotted;
        text-decoration-line: underline;
        text-decoration-color: #fce4ec;
        color: white;
    }
    .btn-cta {
        padding: 2rem 4rem;
        border: none;
        border-radius: 3px;
        box-shadow: 0 1rem 2rem rgba(0,0,0,0.01);
        background-color: #ede7f6;
        color: #673ab7;
        font-size: 1.4rem;
        transition: all 0.4s
    }
    .btn-cta:hover {
        color: gray;
    }
    .logo {
        width: 4rem;
        height: 4rem;
        display: block;
    }
    .login {
        margin-left: 2rem;
        font-size: 1.7rem;
        color: white;
        transition: all 0.4s;
    }
    .login:hover {
        color: #e0e0e0;
    }
    .right-content img {
        width: 100%;
        border-radius: 3px;
        transform: translateY(4rem);
    }
    @media only screen and (max-width : 900px) {
        .wrapper {
            overflow: hidden;
            padding: 2rem 5rem;
        }
        .right-content img  {
            width: 75%;
            margin-top: 3rem;
        }
        .container {
             grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .left-content__text--bold {
            font-size: 2rem;
        }
        .left-content__text--small {
            font-size: 1.4rem;
        }
    }
</style>