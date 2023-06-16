<template>
    <div>
        <transition-group name="patern-list">
            <patern-item
                    v-for="patern in paterns"
                    :patern="patern"
                    :key = "patern.id"
                    @pick = "$emit('pick', patern)"
                    @remove = "$emit('remove', patern)"
            >

            </patern-item>
        </transition-group>
    </div>

</template>

<script>
import PaternItem from "@/components/PaternItem.vue";

export default {
    components: {PaternItem},
    props: {
        paterns: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>