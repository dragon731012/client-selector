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
    }
}

populate();