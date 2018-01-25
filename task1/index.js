$('document').ready(function () {
    $.get("/title", function (data, status) {
        console.log("Data: " + data);
        $("#title").html(data);
    });
});