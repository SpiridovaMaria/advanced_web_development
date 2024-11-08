<template>
    <div>
         <li class="list-group-item">{{point.name}}
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
            }
        }
    }
</script>