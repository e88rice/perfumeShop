function setThumbnail(event) {
    for (let image of event.target.files) {
        let reader = new FileReader();

        reader.onload = function(event) {
            let img = document.createElement("img");
            img.setAttribute("src", event.target.result);
            img.style.width="100px";
            img.style.height="100px";
            document.querySelector(".imgs_box").appendChild(img);
        };

        console.log(image);
        reader.readAsDataURL(image);
    }
}