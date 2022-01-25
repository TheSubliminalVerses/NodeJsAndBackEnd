let id, brand, model, os, screenSize, image
$("input#submit").on("click", function () {
    id = $("input#p-id").val()
    brand = $("input#brand").val()
    model = $("input#model").val()
    os = $("input#os").val()
    screenSize = $("input#screen-size").val()
    image = $("input#image").val()

    $.post("http://localhost:8080/apiv1/submit", {_id: id, _brand: brand, _model: model, _os: os, _screenSize: screenSize, _image: image}, data => {
        if (data === "true") {
            alert("Data successfully submitted!")
        }
    })
})