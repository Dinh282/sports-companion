var fetchbutton = document.querySelector("#clickme");
var cardsdisplay = document.querySelector("#cards");
var returnbtn = document.querySelector("#return-button");

var abbrevationarray = [
    {
        teamname: "Atlanta Hawks",
        abbrevation: "ATL"
    },
    {
        teamname: "Brooklyn Nets",
        abbrevation: "BKN"
    },
    {
        teamname: "Boston Celtics",
        abbrevation: "BOS"
    },
    {
        teamname: "Charlotte Hornets",
        abbrevation: "CHA"
    },
    {
        teamname: "Chicago Bulls",
        abbrevation: "CHI"
    },
    {
        teamname: "Cleveland Cavaliers",
        abbrevation: "CLE"
    },
    {
        teamname: "Dallas Mavericks",
        abbrevation: "DAL"
    },
    {
        teamname: "Denver Nuggets",
        abbrevation: "DEN"
    },
    {
        teamname: "Detroit Pistons",
        abbrevation: "DET"
    },
    {
        teamname: "Golden State Warriors",
        abbrevation: "GSW"
    },
    {
        teamname: "Houston Rockets",
        abbrevation: "HOU"
    },
    {
        teamname: "Indiana Pacers",
        abbrevation: "IND"
    },
    {
        teamname: "Los Angeles Clippers",
        abbrevation: "LAC"
    },
    {
        teamname: "Los Angeles Lakers",
        abbrevation: "LAL"
    },
    {
        teamname: "Memphis Grizzlies",
        abbrevation: "MEM"
    },
    {
        teamname: "Miami Heat",
        abbrevation: "MIA"
    },
    {
        teamname: "Milwaukee Bucks",
        abbrevation: "MIL"
    },
    {
        teamname: "Minnesota Timberwolves",
        abbrevation: "MIN"
    },
    {
        teamname: "New Orleans Pelicans",
        abbrevation: "NOP"
    },
    {
        teamname: "New York Knicks",
        abbrevation: "NYK"
    },
    {
        teamname: "Oklahoma City Thunder",
        abbrevation: "OKC"
    },
    {
        teamname: "Orlando Magic",
        abbrevation: "ORL"
    },
    {
        teamname: "Philadelphia 76ers",
        abbrevation: "PHI"
    },
    {
        teamname: "Phoenix Suns",
        abbrevation: "PHX"
    },
    {
        teamname: "Portland Trail Blazers",
        abbrevation: "POR"
    },
    {
        teamname: "Sacramento Kings",
        abbrevation: "SAC"
    },
    {
        teamname: "San Antonio Spurs",
        abbrevation: "SAS"
    },
    {
        teamname: "Toronto Raptors",
        abbrevation: "TOR"
    },
    {
        teamname: "Utah Jazz",
        abbrevation: "UTA"
    },
    {
        teamname: "Washington Wizards",
        abbrevation: "WAS"
    }
];

var fakeurl = "http://127.0.0.1:5500/group-projects/sports-companion/results.html?q=Chicago%20Bulls"
function getParams() {
    var searchParams = "?q=Boston%20Celtics";
    // var searchParams = document.location.search;
    var tempUrl = searchParams.replace(/%20/g," ");
    var searchparam = tempUrl.split('=').pop();
   
    fetchplayerinfo(searchparam);
    
  }
function fetchplayerinfo(teamname){

    for (var i = 0; i < abbrevationarray.length; i++){
        if (teamname === abbrevationarray[i].teamname){
            abbrevationname = abbrevationarray[i].abbrevation;
        }
    }
    // fetch from Sports API
    var teammeburl = "https://api.sportsdata.io/v3/nba/scores/json/Players/" + abbrevationname + "?key=c1092eb212894df2a85118d2e6e7ed22";
    fetch(teammeburl)
        .then(function(response){
        if (response.ok){    
        return  response.json().then(function(data){
            if(data.length!==0){
                for (var i=0;i<data.length;i++){
                    var divelement = document.createElement('div');
                    divelement.classList.add("card", "w-72", 'card-bordered', "card-compact", "lg:card-normal","basis-1/8","mx-4", "my-4","bg-primary-content", "text-black", "lg:basis-1/4");
                    var figureelement = document.createElement('figure');
                    var imageelement = document.createElement('img');
                    imageelement.setAttribute('src',data[i].PhotoUrl);
                    imageelement.classList.add("lg:w-40");
                    figureelement.append(imageelement);
                    divelement.append(figureelement);
                    var div2element = document.createElement('div');
                    div2element.classList.add("card-body");
                    var divheader= document.createElement('h2');
                    divheader.classList.add("card-title");
                    var divp1tag = document.createElement('p');
                    var divp2tag = document.createElement('p');
                    divheader.textContent = data[i].FirstName + " " + data[i].LastName;
                    divp1tag.textContent = "Jersey No - " + data[i].Jersey;
                    divp2tag.textContent = "Position - " +  data[i].Position;
                    divp1tag.classList.add("lg:text-xl");
                    divp2tag.classList.add("lg:text-xl");
                    div2element.append(divheader);
                    div2element.append(divp1tag);
                    div2element.append(divp2tag);
                    divelement.append(div2element);
                    cardsdisplay.append(divelement);
                }
            }else{
                var ptag = document.createElement('p');
                ptag.textContent= "No Player Data Available";
                cardsdisplay.append(ptag);
            }
        })
        }
    })
}

function returntomainpage(){
    window.location.href="index.html";
}
getParams();

returnbtn.addEventListener('click',returntomainpage);