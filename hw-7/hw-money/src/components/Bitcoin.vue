<template>
      <div class="row">
      <div class='col'>
        <div class="card">
          <div class="card-header text-center">
            <h4>Купить биткоины</h4>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="input-group  my-3">
                <span class='fw-semibold'>Введите количество биткоинов:</span>
                <input type='number' v-model='buy_count' class='form-control mx-2'/>
              </div>
              <div class="input-group mb-3">  
                <span class='fw-semibold'>Выберите валюту:</span>
                <select class='form-select mx-2' v-model='buy_curr'>
                  <option v-for='curr in info' v-bind:value='curr.code'>{{curr.description}}</option>
                </select>
              </div>  
            </li>
            <li class="list-group-item">
              <h5 class='text-muted'>Итого:</h5> 
              <p class='text-muted fw-semibold' v-if='buy_count>0 & buy_curr!=""'>
              {{get_buy_count + ' * ' + get_buy_curr + ' = ' + get_buy_count*get_buy_curr + ' ' + getBuyCurrencySymbol}}</p>
              <p class='text-danger' v-if='error!=""'>{{error}}</p>
              <button class='btn btn-success' @click='buy_bitcoin()'>Купить</button>
            </li>
          </ul>
        </div>
      </div>
      <div class='col'>
        <div class="card">
          <div class="card-header text-center">
            <h4>Мой счет</h4>
          </div>
          <ul class="list-group list-group-flush my-3">
            <li class="list-group-item d-flex justify-content-between">
              <h5>Всего биткоинов: {{get_balance_count}}</h5>
              <h5 style='cursor: pointer;' id='balance' class='text-muted' @click='change_balance_curr()'>{{get_balance_in_curr}} {{getBalanceCurrencySymbol}}</h5>
            </li>
          </ul>
        </div>
      </div> 
    </div>  
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                balance_count: 0,
                buy_count: 0,
                buy_curr: "",
                balance_curr: "",
                info: null,
                error:"",
            }
        },
        created(){
          axios.get('https://api.coindesk.com/v1/bpi/currentprice.json').then(response => (this.info = response.data.bpi))
        },
        computed: {
            get_buy_count() {
              return this.buy_count
            },
            get_buy_curr() {
              return this.info[this.buy_curr].rate_float.toFixed(2)
            },
            get_balance_count() {
              return this.balance_count
            },
            get_balance_in_curr(){
              if(this.info != null){
                if(this.balance_curr == '')
                  this.balance_curr = Object.keys(this.info)[0]
                return this.info[this.balance_curr].rate_float.toFixed(2) * this.balance_count
              }  
            },
            getBalanceCurrencySymbol() {
              if(this.balance_curr == '')
                return false
              return (0).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: this.balance_curr,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }
              ).replace(/\d/g, '').trim()
            },
            getBuyCurrencySymbol() {
              if(this.balance_curr == '')
                return false
              return (0).toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: this.buy_curr,
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }
              ).replace(/\d/g, '').trim()
            },
        },
        methods: {
          buy_bitcoin() {
            if(this.buy_count<=0){
              this.error = 'Количество биткоинов введено некорректно.'
              return false
            }
            if(this.buy_curr==''){
              this.error = 'Валюта покупки не выбрана.'
              return false
            }
            this.error=''
            this.balance_count+=this.buy_count
            this.buy_count=''
            this.buy_curr=''
          },
          change_balance_curr(){
            let currs = Object.keys(this.info)
            if(currs.indexOf(this.balance_curr)==currs.length-1){
              this.balance_curr = currs[0]
            }
            else{
              this.balance_curr = currs[currs.indexOf(this.balance_curr)+1]
            }
          }
        }
    }
</script>

<style scoped>
  #balance:hover{
    background: #7fffd4;
  }
</style>

