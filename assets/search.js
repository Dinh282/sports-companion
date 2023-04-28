// js to allow search form to appear 5s after page loads
const searchForm = document.getElementById("search-form");
 setTimeout(()=>{
    searchForm.style.display="block";
 },5000);


$(function() {


   $('#submit-btn').on("click", function(event){
        event.preventDefault();

    // var teamName = $('#search-input').val();
    // id 1 = football, id 2 = tennis, id 3 = basketball, id 4 hockey, id 5 = volleyball, id 6 = handball.
    var selectedTeam = $('#team-selection').val();

    // console.log(teamName);
    console.log(selectedTeam);

    if(selectedTeam === null){
        selectTeamModal();
    }else{
        //  retrieveData(selectedTeam);
        renderTeam(selectedTeam);
    }
});

//     function retrieveData(selectedTeam){
  
//     const settings = {
//         async: true,
//         crossDomain: true,
//         // https://sportscore1.p.rapidapi.com/teams/search?page=1&name=${teamName}&locale=en&is_national=0&sport_id=${teamID}
//         url: `https://sportscore1.p.rapidapi.com/teams/${selectedTeam}`,
//         method: 'GET',
//         headers: {
//             'content-type': 'application/octet-stream',
//             'X-RapidAPI-Key': '9645f86db6mshd04ff3feb630999p10f16cjsnc4bb4d59410b',
//             'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
//         }
//     };
    
//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         if(response.data.length === 0){
//             //TODO: modal alerting user their search yielded no results.
//             noResultsModal();
//         }else{
//             // getTeamID(response);
//             renderTeam(response);
//         }
//     });

//     console.log(selectedTeam)
// };


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
       
    
        console.log(response);
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
                        </div>
                    </div>
                </div>
                `
                $("#teams-list").append(teamCard);
            
        }
    });


};

function noResultsModal (){
console.log("no results");

};

function selectTeamModal() {
console.log("please select a team!");

}

// function getTeamID(response) {
//     var teamID = (response.data[0].id)
//     renderTeam(teamID);
//     console.log(teamID)
// }


})