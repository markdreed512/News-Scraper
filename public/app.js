// $.getJSON("/articles", function(data) {
//     console.log(data)
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<h2>" + data[i].headline+ "</h2>" + "<p>" + data[i].summary + "</p>" + "<p><a href=" + data[i].url + ">read more...</a></p>");
//     }
//   });

//put 

//When you click comment button, grab data-id and assign to  variable. capture input and insert into db

$(".comment-btn").on('click', function (event) {
   //capture value in input field
   var dataId = event.target.getAttribute("data-id");
   var userInput = {
       note: $("#" + dataId).val().trim()
   };
   console.log("user input: ", userInput);
   
   //send to controller
//    $.ajax("/api/burger" , {
//        type: "POST",
//        data: userInput
//    }).then(
//        function () {
//            console.log("created new burger");
//            // Reload the page to get the updated list
//            location.reload();
//        }
//    );
});

// $("#submitBtn").on('click', function (event) {
//     event.preventDefault();
//    //capture value in input field
//    var userInput = {
//        name: $('#userInput').val().trim()
//    }
   
//    console.log("user input: ", userInput);
//    //send to controller
//    $.ajax("/api/burger" , {
//        type: "POST",
//        data: userInput
//    }).then(
//        function () {
//            console.log("created new burger");
//            // Reload the page to get the updated list
//            location.reload();
//        }
//    );
// });