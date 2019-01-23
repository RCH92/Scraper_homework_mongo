
$(document).ready(()=>{
$.getJSON('/articles0', data => {
    renderArticles(data);
    
    
});

})
const renderArticles = (element) => {
   element.forEach(element => {
        let article = $('<div class="flexright article">');
        // formatting link for use in api call
        let link = (((element.link).slice(25)).split('/')).join('_');
        article.data('link', link);
        // defining <img>
        var image = decode64(element.img);
        // image.attr('data-link', link);
        article.append(image);
        // defining title <div>
        let titleDiv = $('<div class="flexdown titleDiv">');
        titleDiv.data('link', link);
        //defining article title
        let titleEL = $(`<h3>${element.title}</h3>`); 
        titleEL.data('link', link);
        titleDiv.append(titleEL);
        
        let day = element.day;
        titleDiv.append(`<h4>${day}</h4>`);
        // adding finished HTML to article
        article.append(titleDiv);
        // adding article to page
        $('#articleContainer').append(article);
    });
}

// ***IMAGE BASE64 DECODER***//
// =============================== //
const decode64 = (img) => {
var image = new Image(200, 150);
image.src = img;
containerWidth = null,
containerHeight = null;



return image;
}
// ================================ //

// click listener to go to article body
$('#articleContainer').on('click', '.article', function() {
    let query = $(this).data('link');
    $.get(`/scrape/${query}`).then(function(data){
        if(data._id){
            window.location.replace(`/comment/${data._id}`);
        }else{
            console.log("err 404 not found")
        }
    });
    console.log();
})