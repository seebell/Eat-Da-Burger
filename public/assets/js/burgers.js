$(function () {

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#newB").val().trim(),
            devoured: 0
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("New burger is ready for you!");
            location.reload();
        });
    });

    $(".devour").on("click", function (event) {
        var id = $(this).data("id");
        var nowdevoured = $(this).data("nowdevoured");
        console.log("take true " + nowdevoured);
        var newdevouredStatus = {
            devoured: nowdevoured
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newdevouredStatus
        }).then(function () {
            console.log("Changed to: ", nowdevoured);
            location.reload();
        })
    })
});