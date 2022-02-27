const parent =document.getElementById('player-container')
const detailContainer = document.getElementById('details-container')
const allPlayers = () =>{
    parent.innerHTML =''
    detailContainer.innerHTML = ''
    document.getElementById('spinner').style.display ="block"
    const searchValue =document.getElementById('search-box').value
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}
    `
    fetch(url)
    .then(res => res.json())
    .then(data => showPlayer(data.player))
}

const showPlayer = players =>{
  for(const player of players){
    const div =document.createElement('div')
    div.innerHTML=` 
        <div class="card border">
        <div class="pro-pic">
          <img class="w-100" src="${player.strThumb}" alt="" />
        </div>
        <h2>Name: ${player.strPlayer}</h2>
        <h5>Country:${player.strNationality}</h5>
        <p></p>
        <div class="allbutton">
          <button class="btn delete-btn btn-danger">Delete</button>
          <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
        </div>
      </div>
      `
      parent.appendChild(div)
      const allButtons =document.getElementsByClassName('delete-btn')
      for(const button of allButtons){
        button.addEventListener('click',function(e){
          e.target.parentNode.parentNode.style.display ='none'
        })
      }
      //   console.log(player)
    }
    document.getElementById('spinner').style.display ="none"
}

const details = (id) =>{
    const url =`https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
    .then(res =>res.json())
    .then(data =>setDetails(data.players[0]))
}

const setDetails = info =>{

    if (info.strGender == "Male") {
        document.getElementById("female").style.display = "none";
        document.getElementById("male").style.display = "block";
        console.log(info.strGender);
      } else {
        document.getElementById("female").style.display = "block";
        document.getElementById("male").style.display = "none";
        console.log(info.strGender);
      }

    detailContainer.innerHTML = `
    <div class="card">
    <div class="image">
        <img class="w-100" src="${info.strRender}" alt="">
    </div>
    <div class="card-body">
        <h2>Name:${info.strPlayer}</h2>
        <h4>Team:${info.strTeam2}</h4>
        <h5>Club:${info.strTeam}</h5>
    </div>
</div>
    `
}