$(document).ready(function () {

    $('.table-row').click(function () {
        var constThis = $(this);
        $(this).toggleClass('select');
        var no = false;
        var yes = false;
        $('.select').each (function (i , elem) {
            if($(elem).children().eq(5).text() == "No") {

                no = true;
            } else {
                yes = true;
            }
        });
        ButtonCheck(yes, no);
    });

    $('#delete').click(function () {
        AllSelected("/delete", SendAjax);
        ButtonClick();
    });

    $('#block').click(function () {
        AllSelected("/block", SendAjax);
        ButtonClick();
    });
    $('#unblock').click(function () {
        AllSelected("/unblock", SendAjax);
        ButtonClick();
    });
});

function AllSelected(url,func) {
    var arrayOfId = [];
    let selectedElements = $('.select');
    selectedElements.each (function (i , elem) {
        arrayOfId[i] = $(elem).children().eq(0).text();
    });
    func(selectedElements, arrayOfId, url);
}

function SendAjax(selectedElements,arrayOfId,url) {

    jQuery.ajax({
        url: "http://localhost:3000" + url,
        type: "POST",
        data: JSON.parse(JSON.stringify({"id" : arrayOfId})),
        success: function(response) {
            AjaxResponseHandler(AjaxDelete, response.selfDestroy, selectedElements);
            AjaxResponseHandler(AjaxBlock, response.selfBlock, selectedElements);
            AjaxResponseHandler(AjaxUnblock, response.Unblock, selectedElements);
            CleanHtml(selectedElements);
        },
        error: function(response) {
        }
    });
}

function AjaxResponseHandler(AjaxFunction, responseAttribute, selectedElements) {
    if(responseAttribute != undefined) {
        AjaxFunction(responseAttribute, selectedElements)
    }
}

function AjaxDelete(responseAttribute, selectedElements) {
    selectedElements.remove();
    if (responseAttribute == true) {
        location.reload();
    }
}

function AjaxBlock (responseAttribute, selectedElements) {
    selectedElements.each (function (i , elem) {
        $(elem).children().eq(5).text("Yes");
    });
    if (responseAttribute == true) {
        location.reload();
    }
}

function AjaxUnblock (responseAttribute, selectedElements) {
    selectedElements.each (function (i , elem) {
        $(elem).children().eq(5).text("No");
    });
}

function CleanHtml(selectedElements) {
    selectedElements.each (function (i , elem) {
        $(elem).toggleClass('select');
    });
}

function ButtonClick() {
    $('#delete').css({'opacity': '0.7', 'pointer-events' : 'none',
        'cursor' : 'default', 'color' : 'darkgrey'});
    $('#block').css({'opacity': '0.7', 'pointer-events' : 'none',
        'cursor' : 'default', 'color' : 'darkgrey'});
    $('#unblock').css({'opacity': '0.7', 'pointer-events' : 'none',
        'cursor' : 'default', 'color' : 'darkgrey'});
}

function ButtonCheck(yes, no) {
    if (!yes && !no) {
        $('#block').css({'opacity': '0.7', 'pointer-events' : 'none',
            'cursor' : 'default', 'color' : 'darkgrey'});
        $('#unblock').css({'opacity': '0.7', 'pointer-events' : 'none',
            'cursor' : 'default', 'color' : 'darkgrey'});
        $('#delete').css({'opacity': '0.7', 'pointer-events' : 'none',
            'cursor' : 'default', 'color' : 'darkgrey'});
    }
    if (yes && no) {
        $('#block').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
        $('#unblock').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
        $('#delete').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
    }
    if (yes && !no) {
        $('#block').css({'opacity': '0.7', 'pointer-events' : 'none',
            'cursor' : 'default', 'color' : 'darkgrey'});
        $('#unblock').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
        $('#delete').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
    }
    if (!yes && no) {
        $('#block').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
        $('#unblock').css({'opacity': '0.7', 'pointer-events' : 'none',
            'cursor' : 'default', 'color' : 'darkgrey'});
        $('#delete').css({'opacity': '1', 'pointer-events' : 'auto',
            'cursor' : 'pointer', 'color' : '#007bff'});
    }
}