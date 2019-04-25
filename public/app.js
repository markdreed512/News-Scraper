//When you click comment button, grab data-id and assign to  variable. capture input and insert into db
$(".comment-btn").on('click', function (event) {
   var dataId = event.target.getAttribute("data-id");
   var userInput = {userInput: $("#" + dataId).val().trim()}
   $.ajax("/articles/" + dataId, {
       type: "POST", 
       data: userInput,
       dataType: "json"
   }).then(function () {
                 location.reload();
             });
});
