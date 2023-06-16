<template>
    <div>
        <transition-group name="client-list">
            <client-item
                    v-for="client in clients"
                    :client="client"
                    :key = "client.id"
                    @remove = "$emit('remove', client)"
            >

            </client-item>
        </transition-group>
    </div>

</template>

<script>
import ClientItem from "@/components/ClientItem.vue";

export default {
    components: {ClientItem},
    props: {
        clients: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>