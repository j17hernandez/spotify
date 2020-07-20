(function () {
     
     function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

         var params = getHashParams();

        var access_token = params.access_token,
            refresh_token = params.refresh_token,
            error = params.error;

        if (error) {
          alert('There was an error during the authentication');
                } else {
          if (access_token) {
            // render oauth info
           /* oauthPlaceholder.innerHTML = oauthTemplate({
              access_token: access_token,
              refresh_token: refresh_token
            });*/

            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                 // userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                  $('#login').hide();
                  $('#loggedin').hide();
                }
            });
          }else{
              // render initial screen
              $('#login').show();
              $('#loggedin').hide();
              $('#contenedor_busqueda').hide();
              $('#contenedor_busqueda_C').hide();
              $('#release').hide();
                 
          }

          document.getElementById('obtain-new-token').addEventListener('click', function() {
            $.ajax({
              url: '/refresh_token',
              data: {
                'refresh_token': refresh_token
              }
            }).done(function(data) {
              access_token = data.access_token;
              oauthPlaceholder.innerHTML = oauthTemplate({
                access_token: access_token,
                refresh_token: refresh_token
              });
            });
          }, false);
        }

$('#searchA').on('keyup', function () {
  let busqueda = $("#searchA").val();// 'nampa basico';

 if(busqueda !=0){
   $.ajax({
                
                url: 'https://api.spotify.com/v1/search?q='+busqueda+'&type=artist',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(resp) {
                  let resultado = document.querySelector('#busqueda');
                  resultado.innerHTML = '';
                   resultado.innerHTML += `
                   <h1 class='text-center font-weight-bold'>Artistas</h1><hr>
                    <div class='row'> `
                  for(let item of resp.artists.items){
                    resultado.innerHTML += `
                    <div class='col-3' style='float:left;' > 
                    <div class='card'>
                    <img class='card-img-top' height='317px' width='317px' src='${item.images[0].url}'>
                    <small class='card-footer text-center font-weight-bold'>${item.name} </small> 
                    </div>
                    </div>
                    `
                  
                  }
                  resultado.innerHTML += `</div>`
                }
           });
   }else{
     $('#busqueda').hide();
     $('#release').show();
      
   }

});

}) ();