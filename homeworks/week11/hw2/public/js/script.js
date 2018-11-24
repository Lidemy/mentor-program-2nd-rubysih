$(document).ready(() => {
    $(".btn-submit").click(() => {
        const longURL = $("#longURL").val();

        //check url
        $.ajax({
            url: longURL, 
            type: 'GET',
            complete: function (response) {
                if (response.status === 404) {
                    alert('請輸入有效 URL');
                }else{
                    sendRequest(longURL);
                }
            }
        });


    });
});

const sendRequest = (longURL) => {
    let request = $.ajax({
        url: '/',
        type: 'POST',
        data: {longURL},
        dataType: "text"
    });
    request.done(function( result ) {
        let result_obj = JSON.parse(result); 
        if(result_obj.msg === 'success'){
            console.log(result_obj,'success');
            //append short URL
            const url = result_obj.host+result_obj.short_URL
            $(".shortURL a").text(url);
            $(".shortURL a").attr('href',url);
        }
        
    });
    request.fail(function( jqXHR, textStatus) {
        // console.log(errorThrown);
        alert( "Request failed: " + textStatus );
    });
}