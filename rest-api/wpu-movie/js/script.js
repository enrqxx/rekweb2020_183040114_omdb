function searchMovie(){
    $('#movie-list').html('');
    $.ajax({
        url:'http://www.omdbapi.com',
        type: 'get',
        dataType:'json',
        data: {
            'apikey' : '749106e5',
            's' : $('#search-input').val()
        },
        success: function(result){
            if(result.Response == "True"){
                let movies = result.Search;
                console.log(movies);

                $.each(movies, function(i, data){
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">`+ data.Title +`</h5>
                                    <h6 class="card-subtitle mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">Lihat Detail</a>
                                </div>
                        </div>
                    </div>
                    `);
                });

                $('#search-input').val('');
                }else{
                    $('#moview-list').html(`
                    <div class="col">
                        <h1 class="text-center">`+ result.Error +`</h1>
                    </div>
                    `);
                }
            }
    });
}

$('#search-button').on('click', function(){
    searchMovie();
});

$('#search-input').on('keyup', function(event){
    if(event.keyCode == 13){
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function(){
    $.ajax({
        url:'http://www.omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : '749106e5',
            'i' : $(this).data('id')
        },
        success: function(movie){
            if( movie.Response == "True"){
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="`+ movies.Poster +`" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="col-md-8">
                                <li class="list-group-item"><h3>`+ movies.Title +`</h3></li>
                                <li class="list-group-item">Released : `+ movies.Released +`</li>
                                <li class="list-group-item">Genre : `+ movies.Genre +`</li>
                                <li class="list-group-item">Director : `+ movies.Director +`</li>
                                <li class="list-group-item">Actors : `+ movies.Actors +`</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `)
            }
        }
    });
});