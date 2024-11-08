<template>
    <div>
        <div class='w-50 card p-2' style='background:#AFEEEE'>
              <div class="mb-3">
                <label for="do" class="form-label">Введите дело</label>
                <input v-model='name' type="text" class="form-control" id="do">
                <div class="form-text">{{error}}</div>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="prior" v-model='prior'>
                <label class="form-check-label" for="prior">Важно</label>
              </div>
              <button @click="sendData" class="btn btn-primary">Добавить</button>
        </div>
    
        </div>
        <div>
            <div v-if="priorDo.length==0" class='my-3 text-danger'>
                <h5>У Вас пока нет важных дел </h5>
            </div>

            <div class="card my-3" v-else style='background:#FF9C9C'>
                <div class="card-heade text-center"> Важные дела </div>
                <ul class="list-group list-group-flush">
                    <Priority v-for="(el,index) in priorDo" :key="index" :index="index" :point="el" :completePriorDo="completePriorDo"></Priority>
                </ul>
            </div>

            <div v-if="does.length==0" class='my-3'>
                <h5>У Вас пока нет дел</h5> 
            </div>

            <div class="card my-3" v-else style='background:#AFEEEE'>
                <div class="card-header text-center"> Дела </div>
                <ul class="list-group list-group-flush">
                    <Do v-for="(el,index) in does" :key="index" :index="index" :point="el" :completeDo="completeDo"></Do>
                </ul>
            </div>


            <div v-if="completedDoes.length==0" class='my-3 text-success'>
                <h5>У Вас пока нет выполненных дел</h5>
            </div>
            <div class="card" v-else style='background:#7FFF00'>
                <div class="card-header text-center">Выполненные дела</div>
                <ul class="list-group list-group-flush">
                    <CompletedDo v-for="(el,index) in completedDoes" :key="index" :index="index" :point="el"></CompletedDo>
                </ul>
            </div>
            
       </div>
</template>
<script>
    import Do from './components/Do.vue'
    import CompletedDo from './components/CompletedDo.vue'
    import Priority from './components/Priority.vue'
    
    export default{
        components:{Do, CompletedDo, Priority},
        data(){
            return{
                does: [],
                completedDoes: [],
                priorDo: [],
                error: '',
                prior: false,
                name: '',
            }
            
        },
        methods:{
            sendData(){
            console.log(prior)
                if (this.name ==''){
                    this.error='Вы забыли ввести дело!'
                    return
                }
                this.error = ''
                if(this.prior == true){
                    this.priorDo.push({
                    name: this.name})
                }
                else{
                    this.does.push({
                    name: this.name})
                }
            },
            completeDo(index){
                this.completedDoes.push(this.does[index])
                this.does.splice(index,1)
            },
            completePriorDo(index){
                this.completedDoes.push(this.priorDo[index])
                this.priorDo.splice(index,1)
            }
        }
    }
</script>
