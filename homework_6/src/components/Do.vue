<template>
        <li class="list-group-item">{{point.name}}
            <button class='btn btn-sm btn-success' @click="completeDo(index)">Выполнить</button>
        </li>
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
            completeDo:{
                type: Function,
                required: true
            }
        }
    }
</script>