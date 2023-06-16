<template>
    <div class="dialog" v-if ='show' @click="hideDialog">
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    name: "my-dialog",
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        hideDialog(){
            this.$emit('update:show', false)
        }
    }

}
</script>

<style scoped>
.dialog{
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    position: fixed;
    display: flex;
}
.dialog__content{
    background: white;
    border-radius: 12px;
    text-align: center;
    max-width: 350px;
    padding: 20px;
}
</style>