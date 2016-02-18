$(document).ready(function() {
    //Events fired on the draggable target (the source element)
    $(".singBoxSign").bind('dragstart', function(event) {
        $('.gameWrap').data("dragid", $(this).attr('id'));
    });

    $('.singBox').bind('drop dragdrop', function(event) {
        var data = $('.gameWrap').data("dragid");
        var $this = $(this);
        if ($this.hasClass('zero') || $this.hasClass('cross')) {
            alert("Please drag & drop in an empty slot");
            return;
        }
        $this.addClass(data);
        data === 'cross' ? $this.attr('data-text', "X") : data === 'zero' ? $this.attr('data-text', "O") : $this.attr('data-text', "N");
        var winner = checkForWinLoseTie();
        if (winner === "continueGame")
            setFocusOnPlayerInfo();
        else if (winner === "nobody")
        {
            var restart = confirm("Draw!!!! Restart the game?");
            if (restart)
                resetGame();
        }
        else
        {
            var restart = confirm(winner + " is winner. Play again?");
            if (restart)
                resetGame();
        }
    });

    $('.singBox').bind('dragenter', function(event) {
        event.preventDefault();
    });

    $('.singBox').bind('dragleave', function(event) {
        event.preventDefault();
    });

    $('.singBox').bind('dragover', function(event) {
        event.preventDefault();
    });

    $('#resetGame').bind("click", function(event) {
        resetGame();

    });

    //added to fix new window loading issue in ff
    window.addEventListener("dragover", function(e) {
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener("drop", function(e) {
        e = e || event;
        e.preventDefault();
    }, false);
});


function setFocusOnPlayerInfo() {
    $('.singBoxSign').toggleClass('playerInfoHighigher');
    $(".singBoxSign").attr('draggable', false);
    $(".singBoxSign.playerInfoHighigher").attr('draggable', true);
    var player = $(".singBoxSign.playerInfoHighigher").data('text');
    $("#showMsg").text(" Current Player " + player);
}

function checkForWinLoseTie() {
    var wins = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [6, 4, 2]];
    var winner = "";
    $.each(wins, function(index, value) {
        var p = $('.singBox').eq(value[0]).attr('data-text') + $('.singBox').eq(value[1]).attr('data-text') + $('.singBox').eq(value[2]).attr('data-text');
        if (p === "XXX") {
            winner = "Player X";
            return winner;

        } else if (p === "OOO") {
            winner = "Player O";
            return winner;
        }
    });
    if (winner !== "")
        return winner;
    else if ($('.singBox[data-text="X"]').length === 5 || $('.singBox[data-text="O"]').length === 5)
        return "nobody";
    else
        return "continueGame";
}

function resetGame() {
    $(".singBox").each(function() {
        $(this).attr({"class": "singBox"}).removeAttr('data-text');
    });
    $(".singBoxSign").removeClass('playerInfoHighigher').attr('draggable', false);
    $(".singBoxSign.cross").addClass('playerInfoHighigher').attr('draggable', true);
    var player = $(".singBoxSign.playerInfoHighigher").data('text');
    $("#showMsg").text(" Current Player " + player);
}


