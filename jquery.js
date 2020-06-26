$(document).ready(function () {
    var count = 0;
	$("input#card").keypress(function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            $("#btn_search").click();
        }
    });
    $("#btn_search").click(function(e) {
        var card = jQuery("input#card").val();
        //console.log(encodeURIComponent(card));
        $.ajax({
            url: "https://api.scryfall.com/cards/named?fuzzy="+encodeURIComponent(card),
            success: function(data){
                console.log(data); 
                $("#cardslist").append("<div id='carta_"+count+"'>"+data.name+"</div><img id='cardImg' src='"+ data.image_uris.small +"'>");
                count++;
                $("input#card").val("");
                $("input#card").focus();
            },
			error: function(data){
				console.log(data);
				alert("Error: "+data.responseJSON.details);
			}
        });
    });
});
