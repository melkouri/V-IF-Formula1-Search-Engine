window.addEventListener('load', rechercherEcuries);

function rechercherEcuries() {
    rechercheInfosEcurie();
    recherchePrincipalsEcurie();
    rechercheDriversEcurie();
    rechercheFirstDriverTeamEcurie()
}

function rechercheInfosEcurie() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requeteInfosEcurie(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherInfosEcurie(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
} 

function recherchePrincipalsEcurie() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requetePrincipalsEcurie(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherPrincipals(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
} 

function rechercheDriversEcurie() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requeteDriversEcurie(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherDrivers(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
} 

function rechercheFirstDriverTeamEcurie() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requeteFirstDriverTeamEcurie(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherFirstDriverTeam(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
} 


// Affichage des résultats dans un tableau
function afficherInfosEcurie(data) {
    if(data.results.bindings[0].label)
    {
        document.getElementById("label").innerHTML = data.results.bindings[0].label.value;
    }
    if(data.results.bindings[0].thumbnail)
    {
        document.getElementById("thumbnail").src = data.results.bindings[0].thumbnail.value;
    }
    if(data.results.bindings[0].abstract)
    { 
        document.getElementById("abstract").innerHTML = "<nobr class='property'></nobr>" + data.results.bindings[0].abstract.value + "<br>";
    }
    if(data.results.bindings[0].engine)
    {
        document.getElementById("engine").innerHTML = "<br>" + "<nobr class='property'> Engine : </nobr>" + data.results.bindings[0].engine.value + "<br>";
    }
    if(data.results.bindings[0].lastSeason)
    {
        document.getElementById("lastSeason").innerHTML = "<br>" + "<nobr class='property'> Last Season : </nobr>" + data.results.bindings[0].lastSeason.value + "<br>";
    }
}

function afficherPrincipals(data) {
    if(data.results.bindings[0]?.principals)
    {
        document.getElementById("principals").innerHTML = "<nobr class='property'> Principals : </nobr>" + "<br>";
        data.results.bindings.forEach(r=>{
            document.getElementById("principals").innerHTML += r.principals.value + "<br>";
        })
    }
}

function afficherDrivers(data) {
    if(data.results.bindings[0]?.drivers)
    {
        document.getElementById("drivers").innerHTML = "<br>" + "<nobr class='property'> Drivers : </nobr>" + "<br>";
        data.results.bindings.forEach(r=>{
            document.getElementById("drivers").innerHTML += " <a href = 'pilote.html#"+r.drivers.value+"'>" +r.labelDriver.value+" <br></a>";
        })
    }
}


function afficherFirstDriverTeam(data) {
    if(data.results.bindings[0]?.firstDriverTeam)
    {
        document.getElementById("firstDriverTeamLabel").innerHTML = "<p class=\"categorie2\"><img src='../assets/firstWin.png' class='icone'/> First Driver Team Of :</p>"  + "<br>";
        data.results.bindings.forEach(r=>{
            document.getElementById("firstDriverTeam").innerHTML +=  " <a href = 'grandprixyear.html#"+r.firstDriverTeam.value+"'>" +r.labelGP.value+" <br></a>";
        })
    } else {
        document.getElementById("firstDriverTeam").remove();
    }
}


function requeteInfosEcurie(urlDbPedia) {
    return `SELECT DISTINCT ?label ?thumbnail ?abstract ?engine ?lastSeason WHERE 
    { 
        OPTIONAL {
            <${urlDbPedia}> rdfs:label ?label.
            FILTER (LANG(?label) = 'en') 
        }
        OPTIONAL {
            <${urlDbPedia}> dbo:thumbnail ?thumbnail.
        }
        OPTIONAL {
            <${urlDbPedia}> dbo:abstract ?abstract.
            FILTER (LANG(?abstract) = 'en')
        }
        OPTIONAL {
            <${urlDbPedia}> dbp:2022Engine ?engine.
        }
        OPTIONAL {
            <${urlDbPedia}> dbp:lastSeason ?lastSeason.
        }
    }`
}


function requetePrincipalsEcurie(urlDbPedia) {
    return `SELECT DISTINCT ?principals WHERE 
    { 
        <${urlDbPedia}> dbp:principal ?listPrincipals.
        ?listPrincipals rdfs:label ?principals.
        FILTER (LANG(?principals) = 'en'). 
    }`
}

function requeteDriversEcurie(urlDbPedia) {
    return `SELECT DISTINCT ?drivers ?labelDriver WHERE 
    { 
        <${urlDbPedia}> ^dbp:2022Team ?drivers.
        ?drivers rdfs:label ?labelDriver.
        FILTER (LANG(?labelDriver) = 'en').  
    }`
}

function requeteFirstDriverTeamEcurie(urlDbPedia) {
    return `SELECT DISTINCT ?firstDriverTeam ?labelGP ?yearGP WHERE 
    { 
        <${urlDbPedia}> ^dbo:firstDriverTeam ?firstDriverTeam. 
        ?firstDriverTeam rdfs:label ?labelGP.
        ?firstDriverTeam dbp:year ?yearGP.
        FILTER (LANG(?labelGP) = 'en').  
    } 
    ORDER BY DESC(?yearGP)
    `
}