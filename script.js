const baseURL = 'https://makeup-api.herokuapp.com/api/v1/products.json';
const errorHandler = (er) => console.error(er);

const getAllproducts = () => {
    fetch(`${baseURL}`).then((data)=>data.json()).then((data) => {
      document.getElementById("items").innerHTML = dataHandler(data,searchValue='');
    }).catch((er) => errorHandler(er));
};

getAllproducts();

function searchData(event){
    event.preventDefault();
    var searchValue = document.getElementById('searchinput').value;
    fetch(`${baseURL}?brand=${searchValue}`).then((data)=>data.json()).then((data) => {
        if(data=="")
            document.getElementById("items").innerHTML = "Sorry We Cannot Find The Brand.."
        else
            document.getElementById("items").innerHTML = dataHandler(data, searchValue);
    }).catch((er) => errorHandler(er));
};

function dataHandler(data, searchValue){
    try{
        var content = "";
        for(i=0;i<data.length; i++){
            content+=`<div class='col-sm-2 col-md-4 col-lg-4 col-xs-1'>`+
            `${(searchValue.length != 0)?
            `<h3 class='text-capitalize'><mark>${data[i].brand}</mark></h3>`:
            `<h3 class='text-capitalize'>${data[i].brand}</h3>`
            }`+`<h6>Brand Name:${data[i].name}</h6>
            <p><a href='${data[i].product_link}'><img src='${data[i].image_link}'class='rounded'  width=200 height=200 /></a></p>
            <p>Price : ${data[i].price_sign} ${data[i].price}</p>
            <span><b>Description:</b>${data[i].description}</span>
            </div>`;
        }
        return content;
    } catch(er) {
        document.getElementById('error').innerHTML = er;
    };
}
