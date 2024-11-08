  function changeLanguage(){
      const btn = document.getElementById('changeLang')
      if (btn.innerText==="Show an English option"){
          document.getElementById('org').innerText='GU OF THE MIA OF RUSSIA IN MOSCOW'
          document.getElementById('surname').innerText='Spiridonova'
          document.getElementById('name').innerText='Maria'
          document.getElementById('patronymic').innerText='Arkadievna'
          document.getElementById('gender').innerText='Fem.'
          btn.innerText='Покажи русский вариант'
          btn.style.background='#00FF00'
      }
      else{
          document.getElementById('org').innerText='ГУ МВД РОССИИ ПО Г. МОСКВЕ'
          document.getElementById('surname').innerText='Спиридонова'
          document.getElementById('name').innerText='Мария'
          document.getElementById('patronymic').innerText='Аркадьевна'
          document.getElementById('gender').innerText='Жен.'
          btn.innerText='Show an English option'
          btn.style.background='#00BFFF'
      }
  }
             