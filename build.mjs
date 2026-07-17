import fs, { writeFileSync } from "fs";
import clients from "./clients.json" with {type: "json"};

const publicdata = [];

for (const client of clients) {
    try {
        const fav = await fetch(client.favicon);
        const arrayb = await fav.arrayBuffer();
        const buffer = Buffer.from(arrayb);
        let s = client.favicon.split("/");
        let iconname = s[s.length - 1];

        const clientdir = "files/"+client.name.replaceAll(" ","-");
        fs.mkdirSync("./public/" + clientdir + "/html", {recursive: true});

        await fs.writeFileSync("./public/" + clientdir + "/" + iconname, buffer);

        let newfiles = {};
        for (let filekey of Object.keys(client.files)) {
            let file = client.files[filekey];
            let filename = file.split("/")[file.split("/").length - 1];
            newfiles[filekey] = clientdir + "/html/" + filename;

            let filefetch = await fetch(file);
            let filehtml = await filefetch.text();
            await writeFileSync("./public/" + clientdir + "/html/" + filename, filehtml, "utf8");
            
        }

        publicdata.push({
            "name": client.name,
            "icon": clientdir + "/" + iconname,
            "version": client.version,
            "files": newfiles
        });
    } catch (e) {
        if (client.name) {
            console.error(client.name + " failed!" + e);
        } else {
            console.error("Client missing name!");
        }
    }
}

fs.writeFileSync("./public/clients.json", JSON.stringify(publicdata, null, 4));