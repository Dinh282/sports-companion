// js to allow search form to appear 5s after page loads
const searchForm = document.getElementById("search-form");
 setTimeout(()=>{
    searchForm.style.display="block";
 },5000);


$(function() {

   $('#submit-btn').on("click", function(event){
        event.preventDefault();

    var selectedTeam = $('#team-selection').val();

    if(selectedTeam === null){
        selectTeamModal();
    }else if (selectedTeam === 0){
        noResultsModal();
    }
    else{
        // calls renderTeam() function retrieveData(selectedTeam);
        renderTeam(selectedTeam);
    }
});

function renderTeam(selectedTeam) {
    $("#teams-list").empty();

    const settings = {
        async: true,
        crossDomain: true,
        url: `https://sportscore1.p.rapidapi.com/teams/${selectedTeam}`,
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': '9645f86db6mshd04ff3feb630999p10f16cjsnc4bb4d59410b',
            'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
        }
    };
    
    $.ajax(settings).done(function (response) {
        if(response.data.length === 0){
            //TODO: modal alerting user their search yielded no results.
            noResultsModal();
        }else{
                var data = {
                    teamName:response.data.name, 
                    logo:response.data.logo, 
                    stadium:response.data.venue.stadium.en,
                    city:response.data.venue.city.en,
                    manager:response.data.manager.name,
                    managerDOB:response.data.manager.date_birth,
                    managerPhoto:response.data.manager.photo,
                    managerNationality:response.data.manager.nationality_code}
                
                //if certain data category is unavailable, the value comes back as null. This for loop goes through our
                //data object to check for this possible and converts null to N/A so user can understand that the info is 
                // Not Available.
                for (let key in data) {
                    if( data[key] === null){
                        data[key] = "N/A";
                    }
                }
                //template literal so we can create a team card.
                var teamCard = `
                <div class= ""
                    <div class= ""
                        <div class= "">
                            <h2 class= ""> ${data.teamName}</h2>
                            <img src= ${data.logo}>
                            <p class= "">Stadium: ${data.stadium}</p>
                            <p class="">City: ${data.city}</p>
                            <h3 class= "">Manager: ${data.manager}</h3>
                            <h4 class= "">Date of Birth: ${data.managerDOB}</h4>
                            <img src= ${data.managerPhoto}>
                            <p class= "">Nationality: ${data.managerNationality}</p>
                            <button class="" id="roster-btn">Click Here to See Team's Roster</button>
                        </div>
                    </div>
                </div>
                `
                $("#teams-list").append(teamCard);
            
                $('#roster-btn').on("click", function(event){
                    event.preventDefault();
                    var queryString = './results.html?q=' + data.teamName;
                    location.assign(queryString);

                });
        }
    });

};

function noResultsModal (){

console.log("no results");
};

function selectTeamModal() {
console.log("please select a team!");
}

})