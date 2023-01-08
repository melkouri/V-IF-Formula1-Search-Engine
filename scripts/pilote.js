window.addEventListener('load', rechercherPilote);

function rechercherPilote() {
    rechercherPiloteBiographie();
    rechercherPiloteChampionnat();
    rechercherPiloteFirstDriver();
    rechercherPiloteFastestDriver()
    rechercherPiloteMate();
}

function rechercherPiloteBiographie() {
    const urlDbPedia = decodeURI(document.location.hash.slice(1));
    console.log(urlDbPedia);
    var query = requetePiloteBiographie(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log("Biographie");
            console.log(results);
            afficherResultPiloteBiographie(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function rechercherPiloteChampionnat() {
    const urlDbPedia = decodeURI(document.location.hash.slice(1));
    console.log(urlDbPedia);
    var query = requetePiloteChampionnat(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log("championnat");
            console.log(results);
            afficherResultPiloteChampionnat(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function rechercherPiloteFastestDriver() {
    const urlDbPedia = decodeURI(document.location.hash.slice(1));
    console.log(urlDbPedia);
    var query = requetePiloteFastestDriver(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log("FastestDriver");
            console.log(results);
            afficherResultPiloteFastestDriver(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function rechercherPiloteFirstDriver() {
    const urlDbPedia = decodeURI(document.location.hash.slice(1));
    console.log(urlDbPedia);
    var query = requetePiloteFirstDriver(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log("FirstDriver");
            console.log(results)
            afficherResultPiloteFirstDriver(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function rechercherPiloteMate() {
    const urlDbPedia = decodeURI(document.location.hash.slice(1));
    console.log(urlDbPedia);
    var query = requeteTeamMates(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log("teamMate");
            console.log(results)
            afficherResultTeamMates(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultPiloteBiographie(data) {
    if(data.results.bindings[0]?.nomComplet)
    {
        document.getElementById("name").innerHTML = data.results.bindings[0].nomComplet.value+ "<br><br>";
    }if(data.results.bindings[0]?.image)
    {
        document.getElementById("image").src = data.results.bindings[0].image.value+ "<br><br>";
    }if(data.results.bindings[0]?.description)
    {
        document.getElementById("description").innerHTML = data.results.bindings[0].description.value+ "<br>";
    }if(data.results.bindings[0]?.birthDate)
    {
        document.getElementById("birthDate").innerHTML ="<nobr class='property'>Birthday: </nobr>"+ dateToHtml(nullableDate(data.results.bindings[0].birthDate.value)) + "<br>";
    }if(data.results.bindings[0]?.birthPlace)
    {
        document.getElementById("birthPlace").innerHTML ="<nobr class='property'>Birth Place:</nobr> "+ data.results.bindings[0].birthPlace.value+ "<br>";
    }if(data.results.bindings[0]?.nationality)
    {
        document.getElementById("nationality").innerHTML = "<nobr class='property'>Nationality: </nobr>"+data.results.bindings[0].nationality.value+ "<br>";
    }

}

function afficherResultPiloteChampionnat(data) {
    if(data.results.bindings[0]?.championships)
    {
        document.getElementById("championShip").innerHTML = "<nobr class='property'> Number of victory registered : </nobr>"+ data.results.bindings[0].championships.value+ "<br>";
    }if(data.results.bindings[0]?.firstRace)
    {
        document.getElementById("firstRace").innerHTML = "<nobr class='property'> First race : </nobr>";
        document.getElementById("firstRace").innerHTML += "<a href = 'grandprixyear.html#"+data.results.bindings[0].firstRace.value+"'>" +data.results.bindings[0].nomRace.value+" <br></a>";
    }if(data.results.bindings[0]?.team)
    {
        document.getElementById("team").innerHTML += "<nobr class='property'> Team in 2022 :</nobr>";
        document.getElementById("team").innerHTML += "<a href = 'ecurie.html#"+data.results.bindings[0].team.value+"'>" +data.results.bindings[0].nomTeam.value+" <br></a>";
    }if(data.results.bindings[0]?.wikiPageID)
    {
        document.getElementById("wikiPage").innerHTML ="<nobr class='property'> Wikipedia Link : </nobr>"+ data.results.bindings[0].wikiPageID.value + "<br>";
    }if(data.results.bindings[0]?.lastWin)
    {
        document.getElementById("lastWin").innerHTML ="<nobr class='property'> Year of the last victory : </nobr> "+ "<a href = 'grandprixyear.html#"+data.results.bindings[0].lastWin.value+"'>" +data.results.bindings[0].nomLastWin.value+" <br></a>";
    }if(data.results.bindings[0]?.lastSeason)
    {
        document.getElementById("lastSeason").innerHTML = "<nobr class='property'> Last Season : </nobr>"+data.results.bindings[0].lastSeason.value+ "<br>";
    }

}

function afficherResultPiloteFirstDriver(data) {
    if  (data.results.bindings[0]?.firstDriver){
        document.getElementById("labelFirstDriver").innerHTML = "<p class='categorie'> <img src='../assets/firstWin.png' class='icone'/> Is first driver of  :</p>";
        data.results.bindings.forEach(r=>{
            document.getElementById("firstDriver").innerHTML += " <a href = 'grandprixyear.html#"+r.firstDriver.value+"'>" +r.nomGrandPrix.value+" <br></a>";

        });
    } else {
        document.getElementById("firstDriver").remove();
    }

}
function afficherResultTeamMates(data){
    if (data.results.bindings[0]){
        document.getElementById("teamMate").innerHTML = "<h1><strong> Teammates  :</strong></h1>";
        data.results.bindings.forEach(r=>{
            document.getElementById("teamMate").innerHTML += " <a href ='pilote.html#"+r.teamMate.value+"'>" +r.nomTeamMate.value+" <br></a>";
        });   
    }
}

function afficherResultPiloteFastestDriver(data) {
    if  (data.results.bindings[0]?.fastestDriver){
        document.getElementById("labelFastestDriver").innerHTML = "<p class='categorie'> <img src='../assets/fast.png' class='icone'/> Is fastest driver of  :</p>";
        data.results.bindings.forEach(r=>{
            document.getElementById("fastestDriver").innerHTML += " <a href = 'grandprixyear.html#"+r.fastestDriver.value+"'>" +r.nomGrandPrix.value+" <br></a>";

        });
    } else {
        document.getElementById("fastestDriver").remove();
    }
    
}
function dateToHtml(/** @type Date */ date) {
    const formatMachine = date.toISOString().slice(0, 10)
    const formatHumain = date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    return formatHumain
}
function nullableDate(string) {
    return string === null || string === undefined ? null : new Date(string)
}

function requetePiloteBiographie(urlDbPedia) {
    return `SELECT ?description ?image ?nomComplet ?birthDate ?birthPlace ?nationality WHERE {
        ?pilote rdf:type dbo:Person.
        ?pilote rdf:type dbo:FormulaOneRacer.
        FILTER(
            ?pilote=<${urlDbPedia}>
        )
        OPTIONAL {
            ?pilote dbo:abstract ?description.
            FILTER(langMatches(lang(?description),"EN"))
        }
        OPTIONAL {
        ?pilote dbo:thumbnail ?image.
        }
        OPTIONAL {
          ?pilote dbp:name ?nomComplet.
          FILTER(langMatches(lang(?nomComplet),"EN"))
        }
        OPTIONAL {
            ?pilote dbp:birthDate ?birthDate.
        }
        OPTIONAL {
            ?pilote dbp:birthPlace ?birthPlace.
            FILTER(langMatches(lang(?birthPlace),"EN"))
  
        }
        OPTIONAL {
            ?pilote dbp:nationality ?nationality.
            FILTER(langMatches(lang(?nationality),"EN"))
        }
    }`
}

function requetePiloteChampionnat(urlDbPedia) {
    return `SELECT DISTINCT  ?championships ?firstRace ?team ?wikiPageID ?lastWin ?nomLastWin ?lastSeason ?nomTeam ?nomRace WHERE {
        ?pilote rdf:type dbo:Person.
        ?pilote rdf:type dbo:FormulaOneRacer.
        ?pilote rdfs:label ?nom.
        FILTER(
            ?pilote=<${urlDbPedia}>
            && langMatches(lang(?nom),"EN")
        )
        OPTIONAL {
            {?pilote dbo:championships ?championships.}
            UNION
            {?pilote dbp:championships ?championships.}
        }
        OPTIONAL {
            ?pilote dbo:firstRace ?firstRace.
            ?firstRace rdfs:label ?nomRace.
            FILTER(langMatches(lang(?nomRace),"EN"))
        }
        OPTIONAL {
            ?pilote dbp:2022Team ?team.
            ?team rdfs:label ?nomTeam.
            FILTER(langMatches(lang(?nomTeam),"EN"))

        }
        OPTIONAL {
            ?pilote dbo:wikiPageID ?wikiPageID.
        }
        OPTIONAL {
            {?pilote dbo:lastWin ?lastWin.}
            UNION
            {?pilote dbp:lastWin ?lastWin.}
            ?lastWin rdfs:label ?nomLastWin.
            FILTER(langMatches(lang(?nomLastWin),"EN"))
        }
        OPTIONAL {
            ?pilote dbp:lastSeason ?lastSeason.
        }
    }`
}
function requeteTeamMates(urlDbPedia){
    return ` SELECT ?teamMate ?nomTeamMate WHERE {
        ?pilote1 rdf:type dbo:Person.
        ?pilote1 rdf:type dbo:FormulaOneRacer.
        ?pilote1 rdfs:label ?nom1.
        ?teamMate rdf:type dbo:Person.
        ?teamMate rdf:type dbo:FormulaOneRacer.
        ?teamMate rdfs:label ?nomTeamMate.
        FILTER(?pilote1=<${urlDbPedia}> && langMatches(lang(?nom1),"EN") && langMatches(lang(?nomTeamMate),"EN"))
        ?pilote1 dbp:2022Team ?team1.
        ?teamMate dbp:2022Team ?team2.
        FILTER(  ?team1=?team2 && ?teamMate!= ?pilote1)   
}`
}

function requetePiloteFirstDriver(urlDbPedia) {
    return `SELECT DISTINCT ?firstDriver ?nomGrandPrix ?year WHERE {
        ?pilote rdf:type dbo:Person.
        ?pilote rdf:type dbo:FormulaOneRacer.
        ?pilote rdfs:label ?nom.
        FILTER(
                ?pilote=<${urlDbPedia}>
                && langMatches(lang(?nom),"EN")
            )
        OPTIONAL {
            ?pilote ^dbp:firstDriver ?firstDriver.
            ?firstDriver rdfs:label ?nomGrandPrix.
            ?firstDriver dbp:year ?year.
            FILTER(langMatches(lang(?nomGrandPrix),"EN"))
        }

    }
    ORDER BY DESC (?year)`
}

function requetePiloteFastestDriver(urlDbPedia) {
    return `SELECT DISTINCT ?fastestDriver ?nomGrandPrix ?year WHERE {
        ?pilote rdf:type dbo:Person.
        ?pilote rdf:type dbo:FormulaOneRacer.
        ?pilote rdfs:label ?nom.
        FILTER(
            ?pilote=<${urlDbPedia}>
            && langMatches(lang(?nom),"EN")
        )
        OPTIONAL {
            ?pilote ^dbo:fastestDriver ?fastestDriver.
            ?fastestDriver rdfs:label ?nomGrandPrix.
            ?fastestDriver dbp:year ?year.
            FILTER(langMatches(lang(?nomGrandPrix),"EN"))
        }
    }
    ORDER BY DESC (?year)`
}