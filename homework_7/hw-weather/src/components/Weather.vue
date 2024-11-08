<template>
    <h3 class='text-primary text-center mb-5'>Погодное приложение</h3>
    <div class="row">
        <div class='col-7'>
            <h5>Узнать погоду в {{ city == "" ? "вашем городе" : cityName }}</h5>
            <div class="input-group mb-3">
                <input type="text" v-model="city" class='form-control' placeholder="Введите город">
                <button v-if="city != ''" @click="getWeather()" class='btn btn-primary'>Получить погоду</button>
                <button disabled v-else class='btn btn-primary'>Введите название города</button>
            </div>    
            <p class="error">{{ error }}</p>
    
            <div v-if="info != null">
                <p class='fw-semibold'>{{ showTemp }}</p>
                <p class='fw-semibold'>{{ showFeelsLike }}</p>
                <p class='fw-semibold'>{{ showMinTemp }}</p>
                <p class='fw-semibold'>{{ showMaxTemp }}</p>
            </div>
        </div>
        <div class='col mx-5'>
            <h5>Узнать погоду в {{this.region}}:</h5>
            <select v-model='region' class="form-select w-lg-50 mb-3" aria-label="Default select example">
                <option v-for='curr in Object.keys(regions).sort()' v-bind:value='curr'>{{curr}}</option>
            </select>
            <p class='fw-semibold'>{{showAvgTemp}}</p>
            <p class='fw-semibold'>{{showAvgFeelsLike}}</p>
            <p class='fw-semibold'>{{showAvgMin}}</p>
            <p class='fw-semibold'>{{showAvgMax}}</p>
        </div>
        <p></p>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                city: "",
                error: "",
                info: null,
                regions: {'Europe': ['Paris', 'London', 'Berlin', 'Milan', 'Brussels', 'Prague', 'Vienna', 'Minsk', 'Madrid','Moscow'],
                'Asia':['Beijing','New Delhi','Tokyo','Astana','Omsk','Yakutsk','Philippines','Magadan','Tashkent','Nha Trang'],
                'Australia':['Sydney','Melbourne','Brisbane','Perth','Adelaide','Wollongong','Bega','Kiama'],
                'North America':['Mexico','Ottawa','New York','Alaska','El Salvador','Costa Rica','La Paz',"St. John's",'Calgary','Arctic Bay'],
                'South America':['Buenos Aires','Brasilia','Santiago','Caracas','Georgetown','Asuncion','Quito','Lima','Paramaribo','Montevideo']},
                region: '',
                reg_info:{'Europe': [0,0,0,0], 'Asia': [0,0,0,0], 'Australia': [0,0,0,0],'North America': [0,0,0,0], 'South America': [0,0,0,0] }
            }
        },
        created(){
            Object.keys(this.reg_info).forEach((reg)  => 
                this.regions[reg].forEach((element) => 
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${element}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
                    .then(res => {
                        this.reg_info[reg][0] += res.data.main.temp;
                        this.reg_info[reg][1] += res.data.main.feels_like;
                        this.reg_info[reg][2] += res.data.main.temp_min;
                        this.reg_info[reg][3] += res.data.main.temp_max;
                    }))  
            )   
        },
        computed: {
            cityName() {
                return "«" + this.city + "»"
            },
            showTemp() {
                return "Температура: " + this.info.main.temp
            },
            showFeelsLike() {
                return "Ощущается как: " + this.info.main.feels_like
            },
            showMinTemp() {
                return "Минимальная температура: " + this.info.main.temp_min
            },
            showMaxTemp() {
                return "Максимальная температура: " + this.info.main.temp_max
            },
            showAvgTemp(){
                if (this.region != '')
                    return "Средняя температура: "+ (this.reg_info[this.region][0]/this.regions[this.region].length).toFixed(2)
            },
            showAvgFeelsLike(){
                if (this.region != '')
                    return "Ощущается как: "+ (this.reg_info[this.region][1]/this.regions[this.region].length).toFixed(2)
            },
            showAvgMin(){
                if (this.region != '')
                    return "Средняя минимальная температура: "+ (this.reg_info[this.region][2]/this.regions[this.region].length).toFixed(2)
            },
            showAvgMax(){
                if (this.region != '')
                    return "Средняя максимальная температура: "+ (this.reg_info[this.region][3]/this.regions[this.region].length).toFixed(2)
            },
        },
        methods: {
            getWeather() {
                if(this.city.trim().length < 2) {
                    this.error = "Нужно название более одного символа :)"
                    return false
                }

                this.error = ""

                axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=0ba39c23e0dd0a5b63ccdd6354473356`)
                    .then(res => (this.info = res.data))
            },
        }
    }
</script>
