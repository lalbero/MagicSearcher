$(document).ready(function () {
    var count = 0;
    $("#btn_search").click(function(e) {
        var card = jQuery("input#card").val();
        //console.log(encodeURIComponent(card));
        $.ajax({
            url: "https://api.magicthegathering.io/v1/cards?name="+encodeURIComponent(card)+"&language=portuguese%20(Brazil)",
            success: function(data){
                console.log(data);
                var found = false;
                if(data.cards.length != 0){
                    for(var i = 0; i < data.cards.length; i++){
                        for(var j = 0; j < data.cards[i].foreignNames.length; j++) {
                            if(data.cards[i].foreignNames[j].name.toUpperCase() == card.toUpperCase() && data.cards[i].imageUrl != null){
                                $("#cardslist").append("<div id='carta_"+count+"'>"+data.cards[i].name+"</div><img id='cardImg' src='"+ data.cards[i].imageUrl +"'>");
                                count++;
                                $("input#card").val("");
                                return false;
                            }
                        }
                    }
                    $("#cardslist").append("<div id='carta_"+count+"'>"+data.cards[0].name+"</div><img id='cardImg' src='"+ data.cards[0].imageUrl +"'>");
                    count++;
                    $("input#card").val("");
                }else{
                    alert("not found");
                }
            }
        });
    });
});