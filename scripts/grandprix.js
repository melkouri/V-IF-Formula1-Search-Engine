window.addEventListener('load', rechercherGrandPrix);

function rechercherGrandPrix() {
    rechercherGrandprixInfosGeneral();
    rechercherGrandPrixEvtAnnuels();
    rechercherGrandPrixMostWins();
}
function rechercherGrandprixInfosGeneral() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requeteGrandprixInfosGeneral(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherGrandPrixInfosGeneral(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function rechercherGrandPrixEvtAnnuels() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requeteGrandPrixEvtAnnuels(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherGrandPrixEvtAnnuels(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function rechercherGrandPrixMostWins() {
    const urlDbPedia = document.location.hash.slice(1);
    console.log(urlDbPedia);
    var query = requeteGrandPrixMostWins(urlDbPedia);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherGrandPrixMostWins(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function afficherGrandPrixInfosGeneral(data) {
    document.getElementById("name").innerHTML = data.results.bindings[0].label.value + "<br><br>";
    document.getElementById("image").src = data.results.bindings[0].thumbnail.value;
    document.getElementById("description").innerHTML = data.results.bindings[0].description.value;
    document.getElementById("firstHeld").innerHTML = "<nobr class='property'>First held in: </nobr>" + data.results.bindings[0].firstHeld.value + "<br>";
    if (data.results.bindings[0].lat) {
        document.getElementById("lat").innerHTML = "<nobr class='property'>Latitude: </nobr>" + data.results.bindings[0].lat.value + "<br>";
    }
    if (data.results.bindings[0].long) {
        document.getElementById("long").innerHTML = "<nobr class='property'>Longitude: </nobr>" + data.results.bindings[0].long.value + "<br>";
    }
    document.getElementById("timesHeld").innerHTML = "<nobr class='property'>Number of times held: </nobr>" + data.results.bindings[0].timesHeld.value + "<br>";
}
function afficherGrandPrixEvtAnnuels(data) {
    if (data.results.bindings[0].race) {
        data.results.bindings.forEach(r => {
            var newElement = document.createElement("li");
            newElement.innerHTML = "<a href='grandprixyear.html#" + r.race.value + "'>" + r.raceLabel.value + "</a>";
            document.getElementById("raceList").appendChild(newElement);
        });
    } else {
        document.getElementById("raceList").remove();
    }
}
function afficherGrandPrixMostWins(data) {
    if (data.results.bindings[0].constructor) {
        document.getElementById("mostWinsConstructor").innerHTML = "<nobr class='property'>Most winning constructor: </nobr>" + "<a href='ecurie.html#" + data.results.bindings[0].constructor.value + "'>" + data.results.bindings[0].constructorName.value + "</a>" + "<br>";
    }
    if (data.results.bindings[0].driver) {
        document.getElementById("mostWinsDriver").innerHTML = "<nobr class='property'>Most winning driver: </nobr>" + "<a href='pilote.html#" + data.results.bindings[0].driver.value + "'>" + data.results.bindings[0].driverName.value + "</a>" + "<br>";
    }
}


// Requete_grandPrix_infos_général
function requeteGrandprixInfosGeneral(urlDbPedia) {
    return `SELECT DISTINCT ?label ?description ?thumbnail ?firstHeld ?timesHeld ?lat ?long WHERE {
      ?course a dbo:SportsEvent;
      rdfs:label ?label.
      FILTER(
        langMatches(lang(?label),"EN") && 
        ?course=<${urlDbPedia}>
      )
        OPTIONAL {
            ?course dbo:thumbnail ?thumbnail.
        }OPTIONAL{
            ?course dbo:abstract ?description.
            FILTER(langMatches(lang(?description),"EN")) 
        }OPTIONAL{
            ?course dbp:firstHeld ?firstHeld.      
        }OPTIONAL{
            ?course dbp:timesHeld ?timesHeld.
        }OPTIONAL{
            ?course geo:lat ?lat.      
        }OPTIONAL{
            ?course geo:long ?long.      
        }
    }`
}

// Liste des grandprix annuels par grandprix général
function requeteGrandPrixEvtAnnuels(urlDbPedia) {
    return `SELECT DISTINCT ?raceLabel ?race WHERE {
      {?grandPrix a dbo:SportsEvent.}
      UNION
        {?grandPrix gold:hypernym dbr:Race.}
      ?grandPrix rdfs:label ?label;
      ^dbp:nameOfRace ?race.
      ?race dbp:year ?year;
      rdfs:label ?raceLabel.
      FILTER (
        langMatches(lang(?label),"EN") && 
        ?grandPrix=<${urlDbPedia}> && 
        langMatches(lang(?raceLabel),"EN")
      )
    }
    ORDER BY DESC (?year)`
}

// Racing in grandPrix mostWinsConstructor mostWinsDriver
function requeteGrandPrixMostWins(urlDbPedia) {
    return `SELECT DISTINCT ?constructorName ?constructor ?driverName ?driver WHERE {
        {?grandPrix a dbo:SportsEvent.}
        UNION
        {?grandPrix gold:hypernym dbr:Race.}
        ?grandPrix rdfs:label ?label;
        dbp:mostWinsConstructor ?constructorName;
        dbp:mostWinsDriver ?driverName.

        FILTER(
          ?grandPrix=<${urlDbPedia}> &&
          langMatches(lang(?label),"EN") && 
          langMatches(lang(?constructorName),"EN") && 
          langMatches(lang(?driverName),"EN")
        )
        OPTIONAL{
            ?constructor a dbo:SportsTeam.
            {?constructor rdfs:label ?constructorName.}
            UNION
            {?constructor dbp:constructorName ?constructorName.}
            FILTER(langMatches(lang(?constructorName),"EN"))
        }
        OPTIONAL{
            ?driver a dbo:Person;
            a dbo:FormulaOneRacer;
            rdfs:label ?driverName.
            FILTER(langMatches(lang(?driverName),"EN"))
        }
      }`
}