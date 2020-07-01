'use strict';
let imgs = [];
let keywords = [];

function Img(image_url, title, description, keyword, horns) {
    this.url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    imgs.push(this);
};


$.ajax(`./data/page-1.json`).then(data => {
    data.forEach(value => {
        new Img(value.image_url, value.title, value.description, value.keyword, value.horns);
        galleryRender();
    });
    keywords.forEach(keyword => {
        let options = $('option');
        let cloneOptions = options.clone();
        cloneOptions.attr('value', keyword);
        cloneOptions.text(keyword);
        $('select').append(cloneOptions[0]);
    });
    
    $('#select').change(event => {
        $('section').each(function () {
            $(this).show();
            if (event.target.value == 'default') {
                $(this).show();
            } else if ($(this).attr('id') !== event.target.value) {
                $(this).hide();
            } if ($(this).attr('class') === event.target.value) {
                $(this).toggle();
            }
        });
    });
});

$.ajax(`./data/page-2.json`).then(data => {
    data.forEach(value => {
        new Img(value.image_url, value.title, value.description, value.keyword, value.horns);
        galleryRender();
    });
    keywords.forEach(keyword => {
        let options = $('option');
        let cloneOptions = options.clone();
        cloneOptions.attr('value', keyword);
        cloneOptions.text(keyword);
        $('select').append(cloneOptions[0]);
    });
    
    $('#select').change(event => {
        $('section').each(function () {
            $(this).show();
            if (event.target.value == 'default') {
                $(this).show();
            } else if ($(this).attr('id') !== event.target.value) {
                $(this).hide();
            } if ($(this).attr('class') === event.target.value) {
                $(this).toggle();
            }
        });
    });
});

function galleryRender() {
    $('#photo-template').html('');
    imgs.forEach(items => {
        $('#photo-template').append(Mustache.render($('#template').html(), items))
    });
    // keywords.forEach(keys => {
    //     $('#select').append(Mustache.render(`<option value="${keyword}">${keyword}</option>`.html(), keys))
    //     console.log(keywords);

    // });
}



$('button').on('click', (event) => {
    if (event.target.id === '#firstPage') {
        $.ajax(`./data/page-1.json`).then(data => {
            data.forEach(value => {
                new Img(value.image_url, value.title, value.description, value.keyword, value.horns, i);
                galleryRender();
            });
        });
    }
    if (event.target.id === '#secondPage') {
        $.ajax(`./data/page-2.json`).then(data => {
            data.forEach(value => {
                new Img(value.image_url, value.title, value.description, value.keyword, value.horns, i);
                galleryRender();
            });
        });
    }
});

$('#select1').change(function (event) {
    if (event.target.value === 'tit') {
        imgs.sort((a, b) => {
            if (a.title < b.title) {
                return -1;
            }
            if (a.title > b.title) {
                return 1;
            }
            return 0;
        });
    };
    if (event.target.value === 'num') {
        imgs.sort((a, b) => {
            return a.horns - b.horns;
        });
    }
});


// imgs.forEach(img =>{
//     let photos = $('section');
//     let clonePhotos = photos.clone();
//     clonePhotos.attr('id', `${img.keyword}`);
//     clonePhotos.attr('class', 'info');
//     clonePhotos.children('h2').text(img.title);
//     clonePhotos.children('img').attr('src', `${img.url}`);
//     clonePhotos.children('p').text(img.description);
//     $('main').append(clonePhotos[0]);
//     if(!keywords.includes(img.keyword)) {
//         keywords.push(img.keyword);
//     }
// });

// keywords.forEach(keyword => {
//     let options = $('option');
//     let cloneOptions = options.clone();
//     cloneOptions.attr('value', keyword);
//     cloneOptions.text(keyword);
//     $('select').append(cloneOptions[0]);
// });

// $('#select').change(event => {
//     $('section').each(function () {
//         $(this).show();
//         if (event.target.value == 'default') {
//             $(this).show();
//         } else if ($(this).attr('id') !== event.target.value) {
//             $(this).hide();
//         } if ($(this).attr('class') === event.target.value) {
//             $(this).toggle();
//         }
//     });
// });
// });




