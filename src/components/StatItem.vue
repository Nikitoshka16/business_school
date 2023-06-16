<template>
    <div class="client">
        <div>
            <p><strong>Дата рассылки -</strong> {{stat.datemailj.slice(0,-12)}}</p>
            <p><strong>Менеджер -</strong>  {{stat.name}}</p>
            <p><strong>Разослано -</strong>  {{stat.countj}}</p>
            <p><strong>Заголовок -</strong>  {{stat.titlej}}</p>
            <p><strong>Отказов -</strong>  {{stat.rejectionj}}</p>
            <p><strong>Переходов -</strong>  {{stat.transitionj}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        stat: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.client{
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-content: center;
    justify-content: space-between;
}
</style>