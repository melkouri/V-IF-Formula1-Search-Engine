window.addEventListener('load', rechercherGrandPrixAnnuel);

function rechercherGrandPrixAnnuel() {
  rechercherGrandPrixAnnuelInfos()
  rechercherGrandPrixAnnuelRanking()
}

function rechercherGrandPrixAnnuelInfos() {
  const urlDbPedia = document.location.hash.slice(1);
  console.log(urlDbPedia);
  var query = requeteGrandPrixAnnuelInfos(urlDbPedia);

  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

  // Requête HTTP et affichage des résultats
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var results = JSON.parse(this.responseText);
      console.log(results)
      afficherResultatsGrandPrix(results);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function rechercherGrandPrixAnnuelRanking() {
  const urlDbPedia = document.location.hash.slice(1);
  console.log(urlDbPedia);
  var query = requeteGrandPrixAnnuelRanking(urlDbPedia);

  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(query) + "&format=json";

  // Requête HTTP et affichage des résultats
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var results = JSON.parse(this.responseText);
      console.log(results)
      afficherResultatsRanking(results);
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultatsGrandPrix(data) {
    document.getElementById("name").innerHTML = data.results.bindings[0].nomPrix.value;
    if(data.results.bindings[0].thumbnail){
      document.getElementById("thumbnail").src = data.results.bindings[0].thumbnail.value;
    }
    if(data.results.bindings[0].nomOfficiel) {
      document.getElementById("nomofficiel").innerHTML = "<nobr class='property'>Official Name : </nobr>"+data.results.bindings[0].nomOfficiel.value;
    }
    if(data.results.bindings[0].description) {
      document.getElementById("description").innerHTML = data.results.bindings[0].description.value;
    }
    if(data.results.bindings[0].annee) {
      document.getElementById("annee").innerHTML = "<nobr class='property'>Year : </nobr>"+data.results.bindings[0].annee.value;
    }
    if(data.results.bindings[0].pays){
      document.getElementById("pays").innerHTML = "<nobr class='property'>Country : </nobr>"+data.results.bindings[0].pays.value;
    }
    if(data.results.bindings[0].distance){
      document.getElementById("distance").innerHTML = "<nobr class='property'>Distance : </nobr>"+data.results.bindings[0].distance.value;
    }
    if(data.results.bindings[0].anSuivant){
      document.getElementById("anSuivant").innerHTML = "<nobr class='property'>Next Year's edition : </nobr>"+data.results.bindings[0].anSuivant.value;
    }
    if(data.results.bindings[0].race){
      document.getElementById("grandprixgeneral").innerHTML = "<nobr class='property'>Grand Prix : </nobr>"+"<a href='grandprix.html#"+data.results.bindings[0].race.value+"'>" + data.results.bindings[0].nameRace.value + "</a>";
    }
}

function afficherResultatsRanking(data) {
  if (data.results.bindings.length != 0) {
    document.getElementById("ranking").hidden = false;  

    if (data.results.bindings[0].firstDriverLink) {
      document.getElementById("firstDriver").innerHTML = "<nobr class='property'>Driver : </nobr>" + "<a href='pilote.html#" + data.results.bindings[0].firstDriverLink.value + "'>" + data.results.bindings[0].firstDriver.value + "</a>";
    }
    if (data.results.bindings[0].secondDriverLink) {
      document.getElementById("secondDriver").innerHTML = "<nobr class='property'>Driver : </nobr>" + "<a href='pilote.html#" + data.results.bindings[0].secondDriverLink.value + "'>" + data.results.bindings[0].secondDriver.value + "</a>";
    }
    if (data.results.bindings[0].thirdDriverLink) {
      document.getElementById("thirdDriver").innerHTML = "<nobr class='property'>Driver : </nobr>" + "<a href='pilote.html#" + data.results.bindings[0].thirdDriverLink.value + "'>" + data.results.bindings[0].thirdDriver.value + "</a>";
    }
    if (data.results.bindings[0].thirdDriverLink) {
      document.getElementById("poleDriver").innerHTML = "<nobr class='property'>Pole Driver : </nobr>" + "<a href='pilote.html#" + data.results.bindings[0].poleDriverLink.value + "'>" + data.results.bindings[0].poleDriver.value + "</a>";
    }
    document.getElementById("firstDriverTeam").innerHTML = "<nobr class='property'>Team : </nobr>" + "<a href='ecurie.html#" + data.results.bindings[0].firstTeamLink.value + "'>" + data.results.bindings[0].firstTeam.value + "</a>";
    document.getElementById("secondDriverTeam").innerHTML = "<nobr class='property'>Team : </nobr>" + "<a href='ecurie.html#" + data.results.bindings[0].secondTeamLink.value + "'>" + data.results.bindings[0].secondTeam.value + "</a>";
    document.getElementById("thirdDriverTeam").innerHTML = "<nobr class='property'>Team : </nobr>" + "<a href='ecurie.html#" + data.results.bindings[0].thirdTeamLink.value + "'>" + data.results.bindings[0].thirdTeam.value + "</a>";
  }
}

function requeteGrandPrixAnnuelInfos(urlDbPedia) {
  return `SELECT DISTINCT ?nomPrix ?nomOfficiel ?annee ?pays ?distance ?anSuivant ?description ?thumbnail ?race ?nameRace WHERE {
      {?course a dbo:GrandPrix.}
      UNION
      {?course a dbp:type.}
      ?course rdfs:label ?nomPrix;
      dbp:officialName ?nomOfficiel.
      FILTER (langMatches(lang(?nomPrix),"EN") && langMatches(lang(?nameRace),"EN") && ?course=<${urlDbPedia}>)
      OPTIONAL {
      ?course dbp:nameOfRace ?race;
      dbp:nameOfRace/rdfs:label ?nameRace.
      FILTER(langMatches(lang(?nameRace),"EN") && ?course=<${urlDbPedia}>)
    }
      OPTIONAL {
        ?course dbo:thumbnail ?thumbnail.
      }
      OPTIONAL {
        ?course dbo:abstract ?description.
        FILTER(lang(?description) = 'en')
        }
      OPTIONAL {
        ?course dbp:year ?annee.
      }
      OPTIONAL {
        ?course <http://dbpedia.org/property/nextYear'sRace> ?anSuivant.
      }
      OPTIONAL {
      ?course dbp:distanceKm ?distance.
      }
      OPTIONAL {
      ?course dbp:country ?pays.
      }
      }
    `
}

function requeteGrandPrixAnnuelRanking(urlDbPedia) {
  return `SELECT ?course ?firstTeam ?firstTeamLink ?secondTeam ?secondTeamLink ?thirdTeam ?thirdTeamLink ?firstDriver ?firstDriverLink ?secondDriver ?secondDriverLink ?thirdDriver ?thirdDriverLink ?poleDriver ?poleDriverLink WHERE {
    ?course a dbo:GrandPrix;
    dbo:firstDriverTeam/rdfs:label ?firstTeam;
    dbo:firstDriverTeam ?firstTeamLink;
    dbo:secondTeam/rdfs:label ?secondTeam;
    dbo:secondTeam ?secondTeamLink;
    dbo:thirdTeam/rdfs:label ?thirdTeam;
    dbo:thirdTeam ?thirdTeamLink;
    dbo:firstDriver/rdfs:label ?firstDriver;
    dbo:firstDriver ?firstDriverLink;
    dbo:secondDriver/rdfs:label ?secondDriver;
    dbo:secondDriver ?secondDriverLink;
    dbo:thirdDriver/rdfs:label ?thirdDriver;
    dbo:thirdDriver ?thirdDriverLink;
    dbo:poleDriver/rdfs:label ?poleDriver;
    dbo:poleDriver ?poleDriverLink.
    
    
    FILTER(?course=<${urlDbPedia}> &&
      langMatches(lang(?firstTeam),"EN") &&
      langMatches(lang(?secondTeam),"EN") &&
      langMatches(lang(?thirdTeam),"EN") &&
      langMatches(lang(?firstDriver),"EN") &&
      langMatches(lang(?secondDriver),"EN") &&
      langMatches(lang(?thirdDriver),"EN") &&
      langMatches(lang(?poleDriver),"EN")
      )
    }
    `
}
