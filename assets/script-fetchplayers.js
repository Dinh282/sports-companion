var fetchbutton = document.querySelector("#clickme");
var oddstable = document.querySelector("#players");
var returnbtn = document.querySelector("#return-button");

var memberCard =   `

`

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

    // var searchParams = "?q=Golden%20State%20Warriors";
    var searchParams = document.location.search;
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

    var teammeburl = "https://api.sportsdata.io/v3/nba/scores/json/Players/" + abbrevationname + "?key=c1092eb212894df2a85118d2e6e7ed22";
    fetch(teammeburl)
        .then(function(response){
        if (response.ok){    
        return  response.json().then(function(data){
            // console.log(data);
            if(data.length !== 0){

            var tablerow = document.createElement('tr');
            var tableheader = document.createElement('th');
            var jerseynum = document.createElement('th');
            var position = document.createElement('th');
            tableheader.innerHTML = "Players";
            jerseynum.innerHTML = "Jersey #";
            position.innerHTML = "Position";
            tablerow.append(tableheader);
            tablerow.append(jerseynum);
            tablerow.append(position);
            oddstable.appendChild(tablerow);
            for (var i = 0; i < data.length; i++){
            var datarow = document.createElement('tr');
            var tabledata = document.createElement('td');
            var jerseydata = document.createElement('td');
            var positiondata = document.createElement('td');
            var photo = document.createElement('td');
            var image = document.createElement('img');
            tabledata.innerHTML = data[i].FirstName + " " + data[i].LastName
            jerseydata.innerHTML = data[i].Jersey;
            positiondata.innerHTML = data[i].Position;
            image.setAttribute('src',data[i].PhotoUrl)
            datarow.append(tabledata);
            datarow.append(jerseydata);
            datarow.append(positiondata);
            photo.append(image);
            datarow.append(photo);
            oddstable.append(datarow);
            tabledata.setAttribute('style','border: 2px solid black ;');
            jerseydata.setAttribute('style','border: 2px solid black ;');
            positiondata.setAttribute('style','border: 2px solid black ;');
            }
            oddstable.setAttribute('style',"border: 2px solid black;");
            }else{
                var ptag = document.createElement('p');
                ptag.textContent= "No Player Data Available";
                oddstable.append(ptag);
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