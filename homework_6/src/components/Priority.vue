<template>
    <div>
        <li class="list-group-item">{{point.name}}
            <button class='btn btn-sm btn-danger' @click="completePriorDo(index)">Выполнить</button>
        </li>
    </div>
</template>
<script>
    export default{
        props:{
            point:{
                type: Object,
                required: true
            },
            index:{
                type: Number,
                required: true
            },
            completePriorDo:{
                type: Function,
                required: true
            }
        }
    }
</script>