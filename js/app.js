'use strict';
let imgs = [];
let keywords = [];
let butt = true;
let butt1 = false;

function Img(image_url, title, description, keyword, horns){
    this.url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    imgs.push(this);
};

//lab-02
// $.ajax('./data/page-1.json')
// .then(data =>{
//     data.forEach(value =>{
//         new Img(value.image_url, value.title, value.description, value.keyword, value.horns);
//     })
    
//     imgs.forEach(img =>{
//         let photos = $('section');
//         let clonePhotos = photos.clone();
//         clonePhotos.attr('id', `${img.keyword}`);
//         clonePhotos.attr('class', 'info');
//         clonePhotos.children('h2').text(img.title);
//         clonePhotos.children('img').attr('src', `${img.url}`);
//         clonePhotos.children('p').text(img.description);
//         $('main').append(clonePhotos[0]);
//         if(!keywords.includes(img.keyword)) {
//             keywords.push(img.keyword);
//         }
//     });
    
//     keywords.forEach(keyword =>{
//         let options = $('option');
//         let cloneOptions = options.clone();
//         cloneOptions.attr('value', keyword);
//         cloneOptions.text(keyword);
//         $('select').append(cloneOptions[0]);
//     });
    
//     $('select').change(event =>{
//         $('section').each(function(){
//             $(this).show();
//             if(event.target.value == 'default'){
//                 $(this).show();
//             }else if($(this).attr('id') !== event.target.value){
//                 $(this).hide();
//             }if($(this).attr('class') === event.target.value){
//                 $(this).toggle();
//             }
//         });
//     });
// });

//lab-03
function gallery(num){
    $.ajax(`./data/page-${num}.json`).then(data =>{
        data.forEach(value =>{
            let newGallery = new Img(value.image_url, value.title, value.description, value.keyword, value.horns);
            newGallery.galleryRender();
            newGallery.galleryFilter();
        });
    })
};
gallery(1);

Img.prototype.galleryRender = function(){
    let temp = $('#template').html();
    let newObj = Mustache.render(temp, this);
    $('#photo-template').append(newObj);
}

Img.prototype.galleryFilter = function(){
    if(keywords.includes(this.keyword) === false){
        let options = $('<option></option>').text(this.keyword);
        options.attr('value', this.keyword);
        $('#select').append(options);
        keywords.push(this.keyword);
    }
}
$('#select').on("change", function (event) {
    $("#photo-template").empty();
    if(event.target.value === 'default'){
        gallery(1);
    }
    let choosed = $(this).val();
    if (choosed === 'Filter by Keyword') {
        if (gallery(1)) {
            $("#photo-template").empty();
        } else if (gallery(2)) {
            $("#photo-template").empty();
            $('#secondPage').trigger('click');
        }
    }
    imgs.forEach(item => {
        let category = item.keyword;
        if (choosed === category) {
            let musTemplate = $('#template').html();
            let newObj = Mustache.render(musTemplate, item);
            $('#photo-template').append(newObj);
        }
    })
});

$('#select1').change(function () {
    $("#photo-template").empty();
    let sorted = $(this).val();

    if (sorted === 'tit') {
        imgs.sort((a, b) => {
            if (a.title > b.title) {
                return 1;
            }
            else if (a.title < b.title) {
                return -1;
            }
            else {
                return 0;
            }

        });

    };
    if (sorted === 'num') {
        imgs.sort((a, b) => {
            if (a.horns > b.horns) {
                return 1;
            }
            else if (a.horns < b.horns) {
                return -1;
            }
            else {
                return 0;
            }

        });

    }
    imgs.forEach(item => {
        let musTemplate = $('#template').html();
         let newObj = Mustache.render(musTemplate, item);
         $('#photo-template').append(newObj);
    });
})


$('#firstPage').on('click', () =>{
    $('#photo-template').empty();
    gallery(1);
});

$('#secondPage').on('click', () =>{
    $('#photo-template').empty();
    gallery(2);
});

