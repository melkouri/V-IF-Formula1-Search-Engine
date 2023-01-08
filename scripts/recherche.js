var d = document.getElementById("requete");
d.addEventListener('keyup', rechercher);

function rechercher(){
    document.getElementById("grandprix").innerHTML ="";
    document.getElementById("grandprixyear").innerHTML ="";
    document.getElementById("Pilotes").innerHTML ="";
    document.getElementById("Ecuries").innerHTML ="";

    var contenu_requete = document.getElementById("requete").value;
    if(contenu_requete!=""){
      document.getElementById("results").style.display="block";
      rechercherGrandsPrix(contenu_requete);
      rechercherGrandsPrixAnnuels(contenu_requete);
      rechercherPilote(contenu_requete);
      rechercherEcuries(contenu_requete);
    }
}

function rechercherGrandsPrixAnnuels(contenuRequete) {
    var query = requeteGrandPrixAnnuelRecherche(contenuRequete);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";
    console.log(url)
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherResultats(results, "grandprixyear");
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function rechercherGrandsPrix(contenuRequete) {
    var query = requeteGrandPrixRecherche(contenuRequete);

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";
    console.log(url)
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            console.log(results)
            afficherResultats(results, "grandprix");
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
function rechercherPilote(contenuRequete) {
  var query = requetePiloteRecherche(contenuRequete);

  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";
  console.log(url)
  // Requête HTTP et affichage des résultats
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var results = JSON.parse(this.responseText);
          console.log(results)
          afficherResultatsPilote(results);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function rechercherEcuries(contenuRequete) {
  var query = requeteEcuriesRecherche(contenuRequete);

  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";
  console.log(url)
  // Requête HTTP et affichage des résultats
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          var results = JSON.parse(this.responseText);
          console.log("Ecuries");
          console.log(results)
          afficherResultatsEcuries(results);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultats(data,category) {
  if(data.results.bindings[0]){
    if(category=="grandprix"){
      document.getElementById(category).innerHTML ="<h3>Grand Prix</h3>";
    } else {
    document.getElementById(category).innerHTML ="<h3>Grand Prix Annuel</h3>";
    }
    data.results.bindings.forEach(r => {
        var newElement = document.createElement("div");
        newElement.innerHTML = "<a href='"+category+".html#"+r.grandPrix.value+"'>" + r.nomPrix.value + "</a>";
        document.getElementById(category).appendChild(newElement);
    });
  }
}
function afficherResultatsPilote(data) {
  if(data.results.bindings[0]){
    document.getElementById("Pilotes").innerHTML ="<h3>Pilotes</h3>";
    data.results.bindings.forEach(r => {
        var newElement = document.createElement("div");
        newElement.innerHTML = "<a href='pilote.html#"+r.pilote.value+"'>" + r.nom.value + "</a>";
        document.getElementById("Pilotes").appendChild(newElement);
    });
  }
}

function afficherResultatsEcuries(data) {
  if(data.results.bindings[0]){
    document.getElementById("Ecuries").innerHTML ="<h3>Ecuries</h3>";
    data.results.bindings.forEach(r => {
      var newElement = document.createElement("div");
      newElement.innerHTML = "<a href='ecurie.html#"+r.ecuries.value+"'>" + r.labelEcurie.value + "</a>";
      document.getElementById("Ecuries").appendChild(newElement);
    });
  }
  
}

function requeteGrandPrixAnnuelRecherche(nomGrandPrixAnnuel) {
  return `SELECT DISTINCT ?grandPrix ?nomPrix WHERE {
    ?grandPrix a dbo:GrandPrix;
    rdfs:label ?nomPrix;
    a wikidata:Q1656682;
    a dbo:SportsEvent.
    FILTER(
      langMatches(lang(?nomPrix),"EN") && 
      regex(?nomPrix, "${nomGrandPrixAnnuel}", "i")
    )
  } LIMIT(3)`
}

function requeteGrandPrixRecherche(nomGrandPrix) {
    return `SELECT DISTINCT ?grandPrix ?nomPrix WHERE {
        ?grandPrix a dbo:SportsEvent;
        dbo:wikiPageWikiLink dbc:Formula_One_Grands_Prix;
        rdfs:label ?nomPrix.
        FILTER(
          langMatches(lang(?nomPrix),"EN") && 
          regex(?nomPrix, "${nomGrandPrix}", "i") && 
          (! ?nomPrix = "Formula One racing"@en)
        )
      } LIMIT(3)`
}
function requetePiloteRecherche(nomPilote) {
  return `SELECT ?nom ?pilote WHERE {
    ?pilote rdf:type dbo:Person.
    ?pilote rdf:type dbo:FormulaOneRacer.
    ?pilote rdfs:label ?nom.
    FILTER(regex(?nom,"${nomPilote}", "i") && langMatches(lang(?nom),"EN"))
  }LIMIT(3)`
}

function requeteEcuriesRecherche(nomEcurie) {
  return `SELECT DISTINCT ?ecuries ?labelEcurie WHERE 
  { 
    ?ecuries rdf:type dbo:FormulaOneTeam;
    rdf:type dbo:SportsTeam;
    rdfs:label ?labelEcurie.
    FILTER(regex(?labelEcurie,"${nomEcurie}", "i") && langMatches(lang(?labelEcurie),"EN"))
  } LIMIT(3)`
}

