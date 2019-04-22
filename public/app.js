$.getJSON("/articles", function(data) {
    console.log(data)
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<p data-id='" + data[i]._id + "'>" + "<h2>" + data[i].headline+ "</h2>" + "<p>" + data[i].summary + "</p>" + "<p><a href=" + data[i].url + ">read more...</a></p>");
    }
  });