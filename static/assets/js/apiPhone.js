// Prefixo da API = https://api.hsyunqiemo.com/
// URL = https://api.hsyunqiemo.com/api/phone/classifylist

function getTypes(){
    $.ajax({
        url:"https://api.hsyunqiemo.com/api/phone/classifylist",
        type:'POST',
        data:{},
        crossDomain:true,
        success: function(data) {
            var json = JSON.parse(data);
            var sel_types = document.getElementById("sel_types");
            for(var i=0;i<json.length;i++){
                
                sel_types[sel_types.length] = new Option(json[i].por,json[i].id);
                
            }
            getBrands();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}

function getBrands(){
    $.ajax({
        url:"/api/phone/brandlist",
        type:'POST',
        data:{
            category_id:document.getElementById("sel_types").value
        },
        crossDomain:true,
        success: function(data) {
            var json = JSON.parse(data);
            var sel_brands = document.getElementById("sel_brands");
            sel_brands.innerHTML = "";
            for(var i=0;i<json.length;i++){
                
                sel_brands[sel_brands.length] = new Option(json[i].por,json[i].id);
                
            }
            getPhones();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}

function getPhones(){
    plt_arr = [];
    $.ajax({
        url:"/api/phone/serieslist",
        type:'POST',
        data:{
            category_id:document.getElementById("sel_types").value,
            brand_id:document.getElementById("sel_brands").value,
        },
        crossDomain:true,
        success: function(data) {
            var json = JSON.parse(data);
            var sel_phones = document.getElementById("sel_phones");
            sel_phones.innerHTML = "";
            for(var i=0;i<json.length;i++){
                
                sel_phones[sel_phones.length] = new Option(json[i].por,json[i].id);
                
            }
            getModels();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}

function getModels(){
    plt_arr = [];
    $.ajax({
        url:"/api/phone/modellist",
        type:'POST',
        data:{
            series_id:document.getElementById("sel_phones").value,
        },
        crossDomain:true,
        success: function(data) {
            var json = JSON.parse(data);
            var sel_models = document.getElementById("sel_models");
            sel_models.innerHTML = "";
            for(var i=0;i<json.length;i++){
                sel_models[sel_models.length] = new Option(json[i].por,json[i].cutimg); 
                plt_arr.push(json[i].file);
            }
            plot_phone();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ' ' + errorThrown);
        }
    });
}