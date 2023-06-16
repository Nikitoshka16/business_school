<template>
    <div>
        <transition-group name="stat-list">
            <stat-item
                    v-for="stat in stats"
                    :stat="stat"
                    :key = "stat.id"
            >

            </stat-item>
        </transition-group>
    </div>

</template>

<script>
import StatItem from "@/components/StatItem.vue";

export default {
    components: {StatItem},
    props: {
        stats: {
            type: Array,
            required: true
        }
    }
}
</script>

<style scoped>

</style>