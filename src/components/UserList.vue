<template>
    <div>
        <transition-group name="user-list">
            <user-item
                    v-for="user in users"
                    :user="user"
                    :key = "user.id"
                    @remove = "$emit('remove', user)"
                    @move = "$emit('move', user)"
            >

            </user-item>
        </transition-group>
    </div>
</template>

<script>
import UserItem from "@/components/UserItem.vue";

export default {
    name: "UserList",
    components: {UserItem},
    props: {
        users: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>