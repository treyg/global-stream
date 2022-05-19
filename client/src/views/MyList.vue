<template>
    <div>
        <h1>My List</h1>
        <div v-for="item in mediaList" :key="item.id">
            <h2>{{ item.title }}</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyList',
    data() {
        return {
            mediaList: [],
        }
    },
    methods: {
        getMediaList() {
            this.mediaList = JSON.parse(localStorage.getItem('mediaList'));
        }
    },
    mounted() {
        this.getMediaList();
    }
}
</script>

<style scoped>
</style>