// const anime = "Bleach";
const button = document.querySelector("#search-box button");

const backgroundImage = document.querySelector("#background-image img");
const activeImage = document.querySelector("#active-image img");
const titleAnime = document.querySelector("#active-image h4")
const rateAnime = document.querySelector("#rate");
const episodeAnime = document.querySelector("#episodes");
const studioAnime = document.querySelector("#studio");
const aboutAnime = document.querySelector("#synopsis");
const listAnime = document.querySelector("#animeList");

const pageAnime = document.querySelector('.pagination');

// button.addEventListener('click',()=>{
//     const anime = document.getElementById("searchBox").value;
//     const url =`https://api.jikan.moe/v4/anime?q=${anime}&limit=1`;
//     fetch(url)
//     .then((object)=>{
//         return object.json()
//     })
//     .then((data)=>{
//         const dataObject = data['data'][0];
//         backgroundImage.src = dataObject.images.jpg.large_image_url;
//         activeImage.src = dataObject.images.jpg.large_image_url;
//         titleAnime.textContent = dataObject.title_english;
//         rateAnime.textContent = dataObject.score;
//         episodeAnime .textContent= dataObject.episodes;
//         studioAnime.textContent = dataObject.studios[0].name;
//         aboutAnime.textContent = dataObject.synopsis;
//     })
// })


button.addEventListener('click', () => {
    listAnime.innerHTML = '';
    pageAnime.innerHTML = '';
    const anime = document.getElementById("searchBox").value;
    const url = `https://api.jikan.moe/v4/anime?q=${anime}`;
    fetch(url)
        .then((object) => {
            return object.json()
        })
        .then((data) => {
            const dataArray = data['data'];
            const pages = data['pagination'];
            console.log(pages);
            for (let i = 0; i < dataArray.length; i++) {
                const listItem = document.createElement('div');
                listItem.classList.add('col');
                listItem.innerHTML = `
                <div class="card">
                    <img src="${dataArray[i].images.jpg.image_url}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${dataArray[i].title}</h5>
                    </div>
                </div>`;
                listAnime.appendChild(listItem);
                listItem.addEventListener('click',()=>{
                    backgroundImage.src = dataArray[i].images.jpg.large_image_url;
                    activeImage.src = dataArray[i].images.jpg.large_image_url;
                    titleAnime.textContent = dataArray[i].title_english;
                    rateAnime.textContent = dataArray[i].score;
                    episodeAnime .textContent= dataArray[i].episodes;
                    studioAnime.textContent = dataArray[i].studios[0].name;
                    aboutAnime.textContent = dataArray[i].synopsis;

                })
            }
            //pagination logic
            const no_of_pages = data['pagination'].last_visible_page;
            // console.log(data['pagination']);
            const prevButton = document.createElement('li');
            prevButton.classList.add('page-item');
            prevButton.innerHTML = `
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>`;
            
            pageAnime.appendChild(prevButton);
            
            for(let i = 0; i<no_of_pages; i++){
                const pageButton = document.createElement('li');
                pageButton.classList.add('page-item');
                pageButton.innerHTML = `<a class="page-link" href="#">${i+1}</a>`;
                pageAnime.appendChild(pageButton);
            }
            
            const nextButton = document.createElement('li');
            nextButton.classList.add('page-item');
            nextButton.innerHTML = `
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>`;
            
            pageAnime.appendChild(nextButton);
        })
})
