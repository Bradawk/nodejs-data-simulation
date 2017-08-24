<template>
    <div>
        <div class="preloader loading">
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
            <span class="slice"></span>
        </div>
        <h1 data-text="Pending">Pending</h1>
    </div>
</template>

<script>
    export default {
        name: 'loader',
    }
</script>

<style scoped>
h1 {
    position: absolute;
    color: white;
    font-size: 3em;
    top: 55%;
    left: 52%;  
}
h1:before {
    content: attr(data-text);
    position: absolute;
    overflow: hidden;
    max-width: 7em;
    white-space: nowrap;
    color: #F6AF95;
    animation: loading 2s infinite;
}
@keyframes loading {
    0% {
        max-width: 0;
    }
}
</style>
