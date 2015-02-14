
$.ajax({
    type    : 'POST',
    url     : "/puzzles",
    crossDomain: false,
    data    : { author : 'john' },
    success : function(data) {
        alert(data);
    }
});
