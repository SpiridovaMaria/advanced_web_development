<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
        <div>
             <div class="form-outline my-3">
                 <input type="text" class="form-control my-2" v-model="search" placeholder="Введите название книги или автора">
                  <select v-model='sort' class="form-select col-6 shadow-none" aria-label="Choose category" id='filter' onchange="sort()">
                      <option value=''>Выбери фильтр</option>
                      <option value='title'>По названию</option>
                      <option value='author'>По автору</option>
                      <option value='year'>По году публикации</option>
                      <option value='price'>По цене</option>
                   </select>
                </div>
            <div v-for="book in booksFilter" class="card p-0 mb-3 mx-1" style="maxWidth: 530px">
                <div class="row g-0 w-100">
                  <img :src="book.cover" class="object-fit-fill h-md-125 col-md-4 ps-0 img-fluid rounded-start" alt="Picture is not available"/>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{book.title}}</h5>
                      <p class="card-text">Автор: {{ book.author}}</p>
                      <p class="card-text">Год публикации: {{book.year}}</p>
                      <p class="card-text">Цена: {{book.price}}₽</p>
                      <a class="btn btn-danger" :href="book.link">Подробнее</a>
                    </div>
                  </div>
                </div>
            </div>
        </div>
           
</template>
<script>
    export default {
      name: "Books",
      data() {
        return {
          bookList: [],
          search: '',
          sort: ''
        };
      },
      created(){
         fetch("books.json")
            .then(response => response.json())
            .then(data => (this.bookList = data));
      },
      computed: {
        booksFilter() {
            const book = this.bookList.filter((book) => {
                console.log(book.title.toLowerCase().includes(this.search.toLowerCase()))
                return book.title.toLowerCase().includes(this.search.toLowerCase()) ||
                       book.author.toLowerCase().includes(this.search.toLowerCase());
            });
            if (this.sort == 'title'){
                return book.sort((a, b) => a.title.localeCompare(b.title));
            }
            else if (this.sort == 'author'){
                return book.sort((a, b) => a.author.localeCompare(b.author));
            }
            else if(this.sort == 'year'){
                return book.sort((a, b) => a.year - b.year);
            }
            else if(this.sort == 'price'){
                return book.sort((a, b) => a.price - b.price);
            }
            else {
                return book
            }
            
        }
      }
    };
</script>
<style scoped>
</style>
