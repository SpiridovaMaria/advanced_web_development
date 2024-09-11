const node_insert_table = document.getElementById('insert_table')
function insert_table(){
    let block = document.getElementById('mytable')
    let table = document.createElement('table')
    let n = Number(document.getElementById('n').value)
    if (node_insert_table.innerText=='make a table'){
        if (n>0){
            for (let i=1; i<n+1; i++){
                let tr = document.createElement('tr')
                for (let j=1; j<n+1; j++){
                    let td = document.createElement('td')
                    tr.appendChild(td)
                    td.innerText=i*j
                    if (i==1 || j==1){
                        td.style.background='#1E90FF'
                    }
                }
                table.appendChild(tr)
                block.appendChild(table)
            }
            node_insert_table.innerText='delete a table'
            node_insert_table.style.background='red'
            document.getElementById('n').type='hidden'
        }
        else{
            alert('Enter a positive number!')
        }
    }

    else{
        node_insert_table.innerText='make a table'
        node_insert_table.style.background='#0000FF'
        document.querySelector('table').remove()
        document.getElementById('n').type='number'
        document.getElementById('n').value=''
    }
}


node_insert_table.addEventListener('click', insert_table)