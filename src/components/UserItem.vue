<template>
    <div class="user">
        <div>
            <div><strong>Имя </strong>{{user.name}}</div>
            <div><strong>Логин </strong>{{user.email}}</div>
            <div><strong>Админ </strong>{{user.admin}}</div>
        </div>
        <div class="user__btns">
            <my-button
                v-show="!user.blocked"
                @click="$emit('remove', user)"
            >
                Заблокировать
            </my-button>
            <my-button
                style="color: crimson; border-color: crimson"
                v-show="user.blocked"
                @click="$emit('move', user)"
            >
                Разблокировать
            </my-button>
        </div>
    </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton.vue";

export default {
    components: {MyButton},
    props: {
        user: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.user{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-content: center;
    justify-content: space-between;
}
.user__btns{
    display: flex;
}
</style>