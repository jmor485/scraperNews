$.getJSON("/articles", function (data) {

    for (var i = 0; i < data.length; i++) {

            $("#articles").append("<div class='div' data-id='" + data[i]._id + "'><h3>" + data[i].title+ "</h3><a href='" + data[i].link + "'>Click Here for Full Article</a><p>" + data[i].summary + "</p></div>");
        // }
        // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />"
        //     + data[i].link + "<br />"
        //     + data[i].summary + "</p>");
    }

});

$(document).on("click", "#btn", function () {
    //to empty or not to empty

    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .then(function (data) {

            console.log(data);

        })
});

$(document).on("click", "#saved", function () {

    $.ajax({
        method: "GET",
        url: "/articles/saved"
    })
        .then(function (data) {

        })
})

$(document).on("click", ".div", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");


    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

        .then(function (data) {

            console.log(data);

            $("#notes").append("<h2>" + data.title + "</h2>");

            $("#notes").append("<input id='titleinput' name='title' >");

            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");

            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");


            if (data.note) {

                $("#titleinput").val(data.note.title);

                $("#bodyinput").val(data.note.body);
            }
        });

});

$(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id");


    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {

            title: $("#titleinput").val(),

            body: $("#bodyinput").val()
        }
    })

        .then(function (data) {

            console.log(data);

            $("#notes").empty();
        });


    $("#titleinput").val("");
    $("#bodyinput").val("");
})
