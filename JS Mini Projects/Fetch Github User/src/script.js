const inputBox = document.getElementById('searchbar')
const searchbtn = document.getElementById('btnsearch')
const card = document.getElementById('mainCard')


function showUserCard(value){
    card.innerHTML = 
    ` <div class="h-[60vh] w-[60vw] bg-black rounded-xl text-white flex flex-col justify-evenly">
    <div class="flex justify-evenly items-center">
        <div class="flex gap-5 text-xl">
            <div>
                <img class="w-[10vw] h-[10vh]" src="${value.avatar_url}" alt="Profile Pic">
            </div>
            <div>
                <h2>${value.login}</h2>
                <h2>${value.name}</h2>
            </div>
        </div>
        <div>
            <a href = "${value.html_url}"><button class="rounded-2xl bg-blue-200 text-black p-3" >Check Profile</button></a>
        </div>
    </div>
    <div class="flex flex-col gap-2 items-center">
        <div>
            <h1 class="text-xl pl-3">About</h1>
        </div>
        <div>
            <h1>${value.bio}</h1>
        </div>
    </div>
    <div class="flex justify-evenly items-center text-center">
        <div >
            <h1 >${value.followers}</h1>
            <h1>Followers</h1>
        </div>
        <div>
            <h1>${value.following}</h1>
            <h1>Following</h1>
        </div>
        <div>
            <h1>${value.public_repos}</h1>
            <h1>Repos</h1>
        </div>
    </div>
</div>
</div>`
}


searchbtn.addEventListener('click',(e)=>{
    let userName = inputBox.value
    let apiLink = `https://api.github.com/users/${userName}`

    try{
        fetch(apiLink)
        .then((response)=>{
            return response.json();
        })
        .then((value)=>{
            showUserCard(value);
        })
    }
    catch(err){
       console.log(err)
    }
})