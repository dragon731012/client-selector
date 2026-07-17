async function populate() {
    const clientfetch = await fetch("clients.json");
    const clientdata = await clientfetch.json();
    let base = document.getElementsByClassName("clientcont")[0];

    for (let client of clientdata) {
        let element = base.cloneNode(true);
        element.style.display = "";
        element.querySelector(".clienttitle").innerText = client.name;
        element.querySelector(".clientimg").src = client.icon;
        element.querySelector(".clientversion").innerText = client.version;
        document.getElementById("cont").appendChild(element);
        
        element.addEventListener("click", () => {
            showPopup(client);
        });
    }
}

function showPopup(client) {
    document.getElementById("popup").style.pointerEvents = "";
    document.getElementById("popuptitle").innerText = client.name;
    document.getElementById("popupversion").innerText = client.version;
    if (client.description) {
        document.getElementById("popupdescription").innerText = client.description;
    } else {
        document.getElementById("popupdescription").innerText = "";
    }

    document.getElementById("popupbuttons").innerHTML = "";
    for (let filekey of Object.keys(client.files)) {
        let button = document.createElement("button");
        button.className = "popupbutton";
        button.innerText = filekey;
        document.getElementById("popupbuttons").appendChild(button);

        button.addEventListener("click", () => {
            window.location.pathname = client.files[filekey];
        });
    }

    document.getElementById("popup").style.display = "";
    setTimeout(() => {
        document.getElementById("popup").style.opacity = 1;
    }, 50);
}

document.getElementById("popup").addEventListener("click", (e) => {
    if (document.getElementById("popup").style.opacity == 1 && e.target == e.currentTarget) {
        document.getElementById("popup").style.opacity = 0;
        document.getElementById("popup").style.pointerEvents = "none";
    }
});

populate();