// js to allow search form to appear 3s after page loads
const searchForm = document.getElementById("search-form");
const teamHistoryContainer = document.getElementById("team-history-container");
 setTimeout(() => {
    searchForm.style.display = "block";
    teamHistoryContainer.style.display = "flex";
 },3000);


$(function() {
    renderTeamHistory();

   $('#submit-btn').on("click", function(){
        //since we are using a modal to display alerts as well a team stats, we need to clear out previous data
        // so new data does not just get added on.
        $(".modal-body").empty();  
        $(".modal-header").empty();

    var selectedTeam = $('#team-selection').val();

    if(selectedTeam === null){
        selectTeamModal();
    }else if(selectedTeam == 0){
        noResultsModal();
    }
    else{
        //this function checks if users already searched up a team recently
        checkLocalStorage(selectedTeam);
    }
});

function checkLocalStorage(selectedTeam) {
    if (!localStorage.getItem('teamHistory')) {
        localStorage.setItem('teamHistory', '[]');
    }

    //we take the teamHistory from local storage and parse it.
    var localTeamData = localStorage.getItem(`teamHistory`);
    var parsedLocalData = JSON.parse(localTeamData);
    
    //we use this find() array method to check if the select team id is exists in our array
    var matchedTeam = parsedLocalData.find(function(obj){
        return obj.data.id == selectedTeam;
    });

    //if there is no match, then we call our API to get the data, else we just have the data rendered
    //with the renderTeam() function.
    if(matchedTeam === undefined){
        retrieveTeamData(selectedTeam);
    }else{
        renderTeamHistory();
        renderTeam(selectedTeam);
    }
}

//this function retrieves data on the selected team.
function retrieveTeamData(selectedTeam) {
   
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
       //after successfully getting a response with the team data, we save it to localStorage. This helps
       //cut down on API calls, since we can take team data from local storage if user wants to go back and look at 
       //previous teams

       var teamHistory = JSON.parse(localStorage.getItem("teamHistory"));
       //we push our retrieved data to our teamHistory array and set to local storage
       teamHistory.push(response);
       localStorage.setItem(`teamHistory`, JSON.stringify(teamHistory));
       renderTeam(selectedTeam);
       renderTeamHistory();
   })
   .fail(function(){
    errorModal();
   });

}

function renderTeam(selectedTeam) {
            $(".modal-body").empty();
            
            //we retrieve our array of teams from local storage
            var localTeamData = localStorage.getItem(`teamHistory`);
            var parsedLocalData = JSON.parse(localTeamData);
            
            //we grab the team that has id value that matches with what user selected(selectedTeam)
            var matchedTeam = parsedLocalData.find(function(obj){
                return obj.data.id == selectedTeam;
            })
          
                //we create an object with all the data we want to display about the team
                var data = {
                    teamName:matchedTeam.data.name, 
                    logo:matchedTeam.data.logo, 
                    stadium:matchedTeam.data.venue.stadium.en,
                    city:matchedTeam.data.venue.city.en,
                    manager:matchedTeam.data.manager.name,
                    managerDOB:matchedTeam.data.manager.date_birth,
                    managerPhoto:matchedTeam.data.manager.photo,
                    managerNationality:matchedTeam.data.manager.nationality_code}
                
                //if certain data category is unavailable, the value comes back as null. this for loop goes through our
                //data object to check for this possibility and converts all nulls to N/A so user can understand that the info is 
                //not Available.
                for (let key in data) {
                    if( data[key] === null){
                        data[key] = "N/A";
                    }
                }

                //template literal so we can easily create a team card.
                var teamCard = `
                <div class= "grid container content-center bg-slate-300 rounded-md"
                <div class= "grid place-content-center"
                    <div class="">
                        <div class="flex flex-wrap justify-center m-6 items-center">
                            <h2 class=" text-5xl lg:text-8xl md:text-6xl  p-3 font-extrabold text-center text-orange-600"> ${data.teamName}</h2>                         
                            <img class="" src= ${data.logo}>
                        </div>
                        <p class=" text-xl lg:text-3xl md:text-2xl text-center text-orange-400 p-1">Stadium: ${data.stadium}</p>
                        <p class="text-xl lg:text-3xl md:text-2xl text-center text-orange-400">City: ${data.city}</p>
                        <h3 class="text-xl lg:text-4xl md:text-3xl text-bold text-zinc-700 text-center mt-3">Coach: ${data.manager}</h3>
                        <div class="flex justify-center items-center p-3">
                            <img src= ${data.managerPhoto}>
                        </div>
                        <h4 class="text-base lg:text-2xl md:text-1xl text-center text-zinc-600">Date of Birth: ${data.managerDOB}</h4>
                        <p class="text-base lg:text-2xl md:text-1xl text-center text-zinc-600">Nationality: ${data.managerNationality}</p>
                        <div class="justify-center items-center text-center">
                        <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg inline-flex hover:no-underline text-white bg-orange-400 hover:bg-orange-600 mt-5 mb-5" id="roster-btn">Click Here to See Team Roster</button>
                        </div>
                    </div>
                </div>
            </div>
                `
                $(".modal-body").append(teamCard);
                $('#roster-btn').on("click", function(event){
                    event.preventDefault();
                    var queryString = './results.html?q=' + data.teamName;
                    location.assign(queryString);
                }); 
};

//handles the message to be displayed on modal if user selects team that API has no data for.
function noResultsModal (){
$(".modal-header").text("We're Sorry!");
$(".modal-body").text("There is currently no information on this team. Please try again in the future!");
};

//handles message to be displayed on modal if user does not select a team before clicking search button.
function selectTeamModal() {
$(".modal-header").text("Hi there!");
$(".modal-body").text("You have forgotten to select a team.");
}

function errorModal(){
$(".modal-header").text("We're Sorry!");
$(".modal-body").text("There must be an internal error!");
}

//function to render any team that user have selected previous. team data taken from local storage.
function renderTeamHistory() {

    //checks if local storage has the teamHistory key is there, if not then to set it and give it a value of an empty array.
    if (!localStorage.getItem('teamHistory')) {
        localStorage.setItem('teamHistory', '[]');
    }

    //empty out the container so new data doesn't stack on previous data.
    $("#team-history-container").empty();
    var localTeamData = localStorage.getItem(`teamHistory`);
    var parsedLocalData = JSON.parse(localTeamData);

    //we go through each item of teamHistory to create a button for each team and append it to the container.
    for(var i = 0; i < parsedLocalData.length; i ++){
        var logo = parsedLocalData[i].data.logo;
        var teamName = parsedLocalData[i].data.name;
        var teamID = parsedLocalData[i].data.id;
        var teamIcon = `
            <label for="my-modal" data-id="${teamID}" id="team-btn-${i}" class=" bg-image bg-cover content-center" >
                <div class="flex flex-wrap w-24 h-24 items-center justify-center mask mask-decagon bg-gray-200 rounded-md transition duration-500 transform hover:scale-110" >
                    <img src = ${logo} alt = "${teamName}'s team logo" class="object-cover h-full w-full ">
                </div>
            </label>
        `

        $("#team-history-container").append(teamIcon);

        //we add an event listener to each of the team button, when fired we call the renderTeam function to render the team
        //info for the specific team by passing on the data value of the team id. we set in the teanIcon card in the previous
        // for loop
        $(`#team-btn-${i}`).on("click", function(){
        var teamID = $(this).data("id");
        renderTeam(teamID);
       });
    }
}

})