<template>
     <table class="tabl">
      <thead>
      <tr>
        <th>#</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
      </thead>

      <tbody>
      <tr class="tr" v-for="(record,idx) of records" :key="record.id">
        <td>{{ idx +1}}</td>
        <td>{{record.amount|currency}}</td>
        <td>{{record.date|date('datetime')}}</td>
        <td>{{record.categoriname}}</td>
        <td>
          <span 
          :class="record.typeclass"
          class="white-text badge ">{{record.typetext}}</span>
        </td>
        <td>
          <button
          v-tooltip="'смотреть запись'"
           class="btn-small btn" @click="$router.push('/detail/'+ record.id)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<style lang="scss" scoped>
tr{
    background-color: #fff;
    
}

.tabl{
   
    color: #1a0303;
    font-size: 15px;
    font-weight: 700;
}

</style>
<script>
export default {
    props:['records']
}
</script>