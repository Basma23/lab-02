'use strict';
let imgs = [];
let keywords = [];

function Img(image_url, title, description, keyword, horns){
    this.url = image_url;
    this.title = title;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    imgs.push(this);
};

$.ajax('./data/page-1.json')
.then(data =>{
    data.forEach(value =>{
        new Img(value.image_url, value.title, value.description, value.keyword, value.horns);
    })
    
    imgs.forEach(img =>{
        let photos = $('section');
        let clonePhotos = photos.clone();
        clonePhotos.attr('id', `${img.keyword}`);
        clonePhotos.attr('class', 'info');
        clonePhotos.children('h2').text(img.title);
        clonePhotos.children('img').attr('src', `${img.url}`);
        clonePhotos.children('p').text(img.description);
        $('main').append(clonePhotos[0]);
        if(!keywords.includes(img.keyword)) {
            keywords.push(img.keyword);
        }
    });
    
    keywords.forEach(keyword =>{
        let options = $('option');
        let cloneOptions = options.clone();
        cloneOptions.attr('value', keyword);
        cloneOptions.text(keyword);
        $('select').append(cloneOptions[0]);
    });
    
    $('select').change(event =>{
        $('section').each(function(){
            $(this).show();
            if($(this).attr('id') !== event.target.value){
                $(this).hide();
            }if($(this).attr('class') === event.target.value){
                $(this).toggle();
            }
        });
    });
});



