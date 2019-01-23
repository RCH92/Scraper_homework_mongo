$(document).ready(()=>{
    let id = $("#commentArticle").data('id');
    
    $.getJSON(`/article/${id}`, data => {
        renderArticles(data);
 
    });
    $.getJSON(`/comments/${id}`, data => {
        // console.log("WEEEEEEE"/ + data);
        renderComments(data);
    })
    
});
const renderComments = (data) => {
    data.forEach(element => {
        let comment = $('<div class="comment">');
        let title = $(`<h4 class="commentTitle">Title: ${element.title}</h4>`);
        comment.append(title);
        let body = $(`<p>Body: ${element.body}</p>`);
        comment.append(body);
        $('#commentArticle').append(comment);
    })
}
const renderArticles = (data) => {
    let image = new Image();
    image.src = data.img;

    let title = $(`<h1 id="commentTitle">${data.title}</h1>`);
    let body = $('<div>');
    let bodyContent = (data.body).split('/');
    
    bodyContent.forEach(element => {
        bodyParagraph = $(`<p>${element}</p>`);
        body.append(bodyParagraph);
    });
    
    $('#commentArticle').prepend(body);
    $('#commentArticle').prepend(image);
    $('#commentArticle').prepend(title);
}
$('#commentForm').on('click', '#submitButton', function(){
event.preventDefault();
let commentBody = $('#commentBody').val();
let commentTitle = $('#commentSubject').val();
let today = new Date();
let id = $("#commentArticle").data('id')
    $.post(`/comment/${id}`, { 
        title: commentTitle,
        body: commentBody,
        artID: id,
        date: today
    }).then(data => {
        setTimeout(function(){
            location.reload()   
        }, 2000);
        console.log("Success! Comment posted.");
    }).catch(err => console.log(err));

    
})
$('#scrapeBtn').on("click", function(){
    $.get('/scrape').then(() => {
        location.reload();
    });
});