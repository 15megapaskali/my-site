const $welcome = $('.welcome');
const $welcomeContent = $('.welcome-content')
const $gallery = $('.gallery-list');
const apiURL = 'https://api.nasa.gov/planetary/apod';
const apiEarth = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'
const apiKey = 'CFqiX0Y9giTvbbuAgceAZm6aY2GKFHWR4yGats2K';
const $button = $('.load-button');
const apiMars = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos'


function loadBG() {
    $.ajax({
        url : apiURL,
        dataType:"json",
        // error: function(){
        //     alert('Nie działa API Nasa')
        // },
        timeout: 2500,
        data: {
            api_key: apiKey
        }
    }).done(res => {
        console.log(res);
        $welcome.css({"background-image": 'url('+res.url+')', 'background-size': ''})
        const $wideo = $(`
            <iframe src="${res.url}" 
frameborder="0" allowfullscreen class="video"></iframe>
</div>
        `)
        const $title = $(`
        <p>${res.title}</p>
        <div class="scroll-down"> </div>
`)
        $welcomeContent.append($title);
        if (/youtube/.test('${res.url}')){
            $welcomeContent.append($wideo);
        }



            }).fail(()=>{alert('NASA API Astronomy Picture of the Day is not responding.')})




}
loadBG();

function loadMars() {
    const min = 0;
    const max = 40;
    let pageNum = Math.floor(Math.random() * (max - min + 1) + min);
    // console.log(pageNum);
    $.ajax({
        method: 'GET',
        url : apiMars,
        dataType:"json",
        timeout: 3000,
        // error: function(){
        //     alert('Nie działa API Nasa')
        // },
        data: {
            sol:1000,
            camera:  [ "CHEMCAM", "FHAZ", "MARDI", "RHAZ","NAVCAM","PANCAM"],
            page: pageNum,
            api_key: apiKey
        }
    }).done(res => {
        insertMarsPhoto(res.photos);
        }).fail(()=>{
        alert('api nasa is not responding')
    })
        // insertMarsPhoto(res.photos)


    }



function insertMarsPhoto(photo) {

    const min = 0;
    const max = 19;
    for (let i = 0; i < 6; i++) {
        let random = Math.floor(Math.random() * (max - min + 1) + min);
        random = random + i;
        if (random <= 23) {
            random = random + Math.floor(Math.random());
        }
        else{
            random = random - 1;
        }
        const $li = $(`
                         <li>
                            <img src="${photo[random].img_src}" alt="${random}">
                         </li>


                    `);
        // console.log(random);
        $gallery.append($li);
    }

}


//druga opcja

$button.click(function () {
    LoadAPI()



});

function LoadAPI(){
    loadMars();
    const $loader = $(`<div class="loader"></div>`);
    $gallery.append($loader);
    setTimeout(function () {
        $loader.remove();

        const elementyListy = document.querySelectorAll('li');

        elementyListy.forEach(function (el) {
            el.addEventListener('click',function () {
                const adresObrazka = this.querySelector('img').getAttribute('src');
                const atrybutObrazka = this.querySelector('img').getAttribute('alt');
                console.log("Atrybut orbazka:  "+atrybutObrazka);
                const $divFullScreen = $(`
                    <div class="fullScreen">
                        <img src="${adresObrazka}" alt="${atrybutObrazka}">   
                        <button class="close">CLOSE</button>
                    </div>               
                    `);

                $('body').append($divFullScreen);

                $('.close').on('click',function () {
                    $('.fullScreen').remove();
                });
            })
        });
    },1200);
}


$(window).scroll(function () {
    // console.log("$(window).height(): " + $(window).height());
    // console.log("$(window).scrollTop(): " + $(window).scrollTop());
    // console.log("$(window).scrollTop() + $(window).height(): "+ parseInt($(window).scrollTop() + $(window).height()));
    // console.log("$(document).height(): "+  $(document).height());
    if($(window).scrollTop() + $(window).height() > $(document).height() - 56) {
        LoadAPI()
    }
});


setTimeout(function () {
    $('.scroll-down').on("click", () => {
        console.log("działa klik")
        LoadAPI();
        window.scrollTo(0,500);
    });
},1500);
