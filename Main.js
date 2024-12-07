let title  = document.querySelector("#title")
let price  = document.querySelector("#price")
let taxes  = document.querySelector("#taxes")
let ads  = document.querySelector("#ads")
let discunt  = document.querySelector("#discunt")
let count  = document.querySelector("#count")
let category  = document.querySelector("#category")
let total  = document.querySelector("#total")
let submit  = document.querySelector("#submit")
let tbody = document.querySelector("#tbody")

let deletAll = document.querySelector("#deletAll")
let btndeletAll = document.querySelector("#deletAll button")
let mode = "creat"
let tem

// geet total price product

function getTotal(){
    
    if( price.value !== "" ){
        let result = (+price.value + +taxes.value + +ads.value) - +discunt.value
        total.innerHTML = result
        total.style.background = "green"
        
    }else{
        total.innerHTML = ""
        total.style.background = "red"

    }
    
}


// create produts

let dataProduct

if(localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product)
}else{
    dataProduct = []
}

submit.addEventListener("click", ()=>{
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discunt: discunt.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if( mode === "creat"){
        
        if(newPro.count > 1 ){
            for( let i = 0 ; i < newPro.count; i++){
                dataProduct.push(newPro)
                
            }
        }else{
            dataProduct.push(newPro)
    
        }

    }else{
        dataProduct[tem] = newPro
        mode = "creat"
    }

    
    localStorage.setItem("product", JSON.stringify(dataProduct))
    
    addToTable()
    
})

// clear value in inputs
submit.addEventListener("click", ()=>{
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discunt.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
})

// red data in table

function addToTable(){

    let table = '';
    for(let i = 0; i < dataProduct.length; i++){
        table += 
            `<tr>
                <th>${i + 1} </th>
                <th>${dataProduct[i].title}</th>
                <th>${dataProduct[i].price}</th>
                <th>${dataProduct[i].taxes}</th>
                <th>${dataProduct[i].ads}</th>
                <th>${dataProduct[i].discunt}</th>
                <th>${dataProduct[i].total}</th>
                <th>${dataProduct[i].category}</th>
                <th><button id="update">update</button></th>
                <th><button  onclick="deleteItem( ${i} )" id="delate">delate</button></th>
            </tr>`
        
    }
    tbody.innerHTML = table
    if(dataProduct.length> 0 ){
        deletAll.classList.add("activ")
        btndeletAll.innerHTML= `delet All ${dataProduct.length}`

    }else{
        deletAll.classList.remove("activ")
    }
        

}

addToTable()

// delate product
let BTDelet = document.querySelector("#delate")
function deleteItem(i){
    dataProduct.splice(i,1)
    localStorage.product = JSON.stringify(dataProduct)
    
    addToTable()
    
}

//  handell button deleate All


deletAll.addEventListener("click", ()=>{
    // console.log("hell");
    dataProduct.splice(0)
    
    localStorage.removeItem("product")
    addToTable()
    
})


// uppdate data

let btnUpdate = document.querySelectorAll("#update")

btnUpdate.forEach((el, indx)=>{
    el.addEventListener("click", ()=>{
        
        title.value = dataProduct[indx].title;
        price.value = dataProduct[indx].price;
        taxes.value = dataProduct[indx].taxes;
        ads.value   =  dataProduct[indx].ads;
        discunt.value = dataProduct[indx].discunt;
        // total.innerHTML = dataProduct[indx].total;
        count.style.display = "none"
        category.value = dataProduct[indx].category;
        submit.innerHTML = "update"
        mode = "update"
        tem = indx
        window.scroll({
            top: 0,
            behavior: "smooth"
            
        })
        
    })
})

// search

let modeSearch = 'title'

function search(id){
    let inputSearch = document.querySelector("#search")
    inputSearch.focus()
    inputSearch.value =''
    datas
    if (id === 'searchTitle') {
        modeSearch = 'title'
        inputSearch.placeholder = ' search by title'
    }else{
        modeSearch = 'category'
        inputSearch.placeholder = ' search by category'
    }



    // console.log(modeSearch);
    
}

// serch func

function searchDta(v){
    let table =''
    if(modeSearch === 'title'){
        for( let i = 0; i < dataProduct.length; i++){
            if(dataProduct[i].title.includes(v.toLowerCase())){
                console.log(i+1);
                table += `
                <tr>
                    <th>${i + 1} </th>
                    <th>${dataProduct[i].title}</th>
                    <th>${dataProduct[i].price}</th>
                    <th>${dataProduct[i].taxes}</th>
                    <th>${dataProduct[i].ads}</th>
                    <th>${dataProduct[i].discunt}</th>
                    <th>${dataProduct[i].total}</th>
                    <th>${dataProduct[i].category}</th>
                    <th><button id="update">update</button></th>
                    <th><button  onclick="deleteItem( ${i} )" id="delate">delate</button></th>
                </tr>`
            }
            
    
        }
        
    }else{
        for( let i = 0; i < dataProduct.length; i++){
            if(dataProduct[i].category.includes(v.toLowerCase())){
                console.log(i+1);
                table += `
                <tr>
                    <th>${i + 1} </th>
                    <th>${dataProduct[i].title}</th>
                    <th>${dataProduct[i].price}</th>
                    <th>${dataProduct[i].taxes}</th>
                    <th>${dataProduct[i].ads}</th>
                    <th>${dataProduct[i].discunt}</th>
                    <th>${dataProduct[i].total}</th>
                    <th>${dataProduct[i].category}</th>
                    <th><button id="update">update</button></th>
                    <th><button  onclick="deleteItem( ${i} )" id="delate">delate</button></th>
                </tr>`
            }
            
    
        }

    }
    tbody.innerHTML = table
    // console.log(v);
    
}

// start color mode

// switch color in light mode

let light = document.querySelector("#light")

light.onclick = ()=>{
    document.documentElement.style.setProperty("--bg-color", "#fff")
    document.documentElement.style.setProperty("--main-bg-color", "#eee")
    document.documentElement.style.setProperty("--text-color", "#000000")
    
}
// switch color in light mode

let dark = document.querySelector("#dark")

dark.onclick = ()=>{
    document.documentElement.style.setProperty("--bg-color", "#222")
    document.documentElement.style.setProperty("--main-bg-color", "rgb(23, 23, 23)")
    // document.documentElement.style.setProperty("--main-text-color", "#fff")
    document.documentElement.style.setProperty("--text-color", "#fff")
    
}

// end color mode