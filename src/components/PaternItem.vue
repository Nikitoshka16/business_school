<template>
    <div class="patern">
        <div>
            <div> {{patern.title}}</div>
            <div> {{patern.preview}}</div>
            <div> {{patern.message}}</div>
        </div>
        <div class="patern__btns">
            <my-button
                    @click="$emit('pick', patern)"
            >
                Выбрать
            </my-button>
            <my-button
                @click = "$emit('remove', patern)"
            >
                Удалить
            </my-button>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
    components: {MyButton},
    props: {
        patern: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.patern {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-content: center;
    justify-content: space-between;
}
.patern__btns{
    display: flex;
    padding: 10px;
    align-items: center;
}
</style>