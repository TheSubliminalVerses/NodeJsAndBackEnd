let id, brand, model, os, screenSize, image
$("input#submit").on("click", function () {
    id = $("input#p-id").val()
    brand = $("input#brand").val()
    model = $("input#model").val()
    os = $("input#os").val()
    screenSize = $("input#screen-size").val()
    image = $("input#image").val()

    $.post("http://localhost:8080/apiv1/submit", {id: id, brand: brand, model: model, os: os, screenSize: screenSize, image: image}, data => {
        if (data === "true") {
            alert("Data successfully submitted!")
        }
    })
})