const borderArray = ["5px solid black", "5px solid yellow", "5px solid green"];


let setCookie = function(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
};


let getCookie = function(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    console.log(decodedCookie)
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        };
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        };
    }
    return "";
};


let init = function() {

    for (let i = 0; i < 50; i++) {
        let button = document.createElement("button");
        let img = document.createElement("img");
        img.src = "FNaF World Logo.png";
        img.id = "img" + String(i);
        img.setAttribute("data-completion", getCookie(img.id));
        img.setAttribute("onclick", "trackStuff(this);");
        img.setAttribute("draggable", "false");
        img.style.border = borderArray[Number(img.getAttribute("data-completion"))];
        document.getElementById("tracker").appendChild(img);
    };

    let columns = (window.innerWidth / 100) - 3;
    let gridTC = "";

    if (columns > 10) {
        for (let i = 0; i < 10; i++) {
            gridTC = gridTC.concat(" ", "auto");
        };
    }
    else {
        for (let i = 0; i < columns; i++) {
            gridTC = gridTC.concat(" ", "auto");
        };
    }
    document.getElementById("tracker").style.gridTemplateColumns = gridTC;

}


let trackStuff = function(me) {

    let newCompletion = Number(me.getAttribute("data-completion")) + 1;
    if (newCompletion > 2) {
        newCompletion = 0;
    };
    me.setAttribute("data-completion", String(newCompletion));
    me.style.border = borderArray[newCompletion];
    console.log(me.getAttribute("data-completion"));
    setCookie(me.id, me.getAttribute("data-completion"), 30);
};
