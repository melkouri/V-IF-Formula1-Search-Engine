window.addEventListener('load', chercherTop);
function chercherTop(){
    chercherToppilotes();
    chercherTopecuries();
    chercherTopgrandPrix();
}
function chercherToppilotes(){
    var query = requeteTopPilotes();

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
            afficherTopPilotes(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function chercherTopecuries(){
    var query = requeteTopEcuries();

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
            afficherTopEcuries(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function chercherTopgrandPrix(){
    var query = requeteTopGrandPrix();

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
            afficherTopGrandPrix(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function afficherTopPilotes(data)
{
    data.results.bindings.forEach(r => {
        var newElement = document.createElement("article");
        newElement.setAttribute('class','home-card');
        newElement.innerHTML = "<img src='"+r.image.value+"' alt class='home-card__icon'>"+"<a href='pilote.html#"+r.pilote.value+"' class='home-card__title linkStart'>" + r.piloteName.value + "</a>";
        document.getElementById("toppilotes").appendChild(newElement);
    });
}
function afficherTopEcuries(data)
{
    data.results.bindings.forEach(r => {
        var newElement = document.createElement("article");
        newElement.setAttribute('class','home-card');
        newElement.innerHTML = "<img src='"+r.image.value+"' alt class='home-card__icon'>"+"<a href='ecurie.html#"+r.ecurie.value+"' class='home-card__title linkStart'>" + r.ecurieName.value + "</a>";
        document.getElementById("topecuries").appendChild(newElement);
    });
}
function afficherTopGrandPrix(data)
{
    data.results.bindings.forEach(r => {
        var newElement = document.createElement("article");
        newElement.setAttribute('class','home-card');
        newElement.innerHTML = "<img src='"+r.image.value+"' alt class='home-card__icon'>"+"<a href='grandPrix.html#"+r.grandPrix.value+"' class='home-card__title linkStart'>" + r.grandPrixName.value + "</a>";
        document.getElementById("topgrandsprix").appendChild(newElement);
    });
}

function requeteTopPilotes(){
    return ` SELECT ?pilote ?piloteName ?image WHERE {
        ?pilote a dbo:Person.
         ?pilote a dbo:FormulaOneRacer;
         rdfs:label ?piloteName.
         FILTER(langMatches(lang(?piloteName),"EN") && 
         (?pilote=<http://dbpedia.org/resource/George_Russell_(racing_driver)> || 
         ?pilote=<http://dbpedia.org/resource/Max_Verstappen> ||
         ?pilote=<http://dbpedia.org/resource/Fernando_Alonso> ||
         ?pilote=<http://dbpedia.org/resource/Lewis_Hamilton> ||
         ?pilote=<http://dbpedia.org/resource/Carlos_Sainz_Jr.> ||
         ?pilote=<http://dbpedia.org/resource/Esteban_Ocon> ||
         ?pilote=<http://dbpedia.org/resource/Lando_Norris>
         ))
         OPTIONAL{
            ?pilote dbo:thumbnail ?image.
         }
       }`
}

function requeteTopEcuries(){
    return ` SELECT ?ecurie ?ecurieName ?image WHERE {
        ?ecurie rdf:type dbo:FormulaOneTeam;
        rdfs:label ?ecurieName.
        FILTER(langMatches(lang(?ecurieName),"EN") && ?ecurie IN
        (<http://dbpedia.org/resource/McLaren>, 
        <http://dbpedia.org/resource/Mercedes-Benz_in_Formula_One>,
        <http://dbpedia.org/resource/Scuderia_Ferrari>,
        <http://dbpedia.org/resource/Red_Bull_Racing>,
        <http://dbpedia.org/resource/Alpine_F1_Team>,
        <http://dbpedia.org/resource/Alfa_Romeo_in_Formula_One>,
        <http://dbpedia.org/resource/Renault_in_Formula_One>))
        OPTIONAL{
            ?ecurie dbo:thumbnail ?image.
         }
        }`
}

function requeteTopGrandPrix(){
    return `SELECT DISTINCT ?grandPrix ?grandPrixName ?image WHERE {
        ?grandPrix a dbo:SportsEvent;
        dbo:wikiPageWikiLink dbc:Formula_One_Grands_Prix;
        rdfs:label ?grandPrixName.
        FILTER(
          langMatches(lang(?grandPrixName),"EN") && 
          (?grandPrix=<http://dbpedia.org/resource/Abu_Dhabi_Grand_Prix> || 
          ?grandPrix=<http://dbpedia.org/resource/Monaco_Grand_Prix> || 
          ?grandPrix=<http://dbpedia.org/resource/Italian_Grand_Prix> ||
          ?grandPrix=<http://dbpedia.org/resource/German_Grand_Prix> ||
          ?grandPrix=<http://dbpedia.org/resource/French_Grand_Prix> ||
          ?grandPrix=<http://dbpedia.org/resource/Belgian_Grand_Prix> ||
          ?grandPrix=<http://dbpedia.org/resource/United_States_Grand_Prix>)
        )
        OPTIONAL{
            ?grandPrix dbo:thumbnail ?image.
         }
      }`
}