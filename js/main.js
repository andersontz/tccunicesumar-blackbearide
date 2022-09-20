let numberElement = 0;
const fnCreateProject = async () => {
    const response = await window.versions.createProject()
    $('#dvPath').html(response.filePaths);
    $('#txt_path').val(response.filePaths);
    fnMenu();
    fnListFiles($('#txt_path').val());
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}

function fnAddComp(s) {
    numberElement++;
    if (s == 'button') {
        copyFunction('<button id="button' + numberElement + '">Button ' + numberElement + '</button>');
    }
    if (s == 'div') {
        copyFunction('<div id="div' + numberElement + '">Div ' + numberElement + '</div>');
    }
    if (s == 'radio') {
        copyFunction('<input type="radio" id="radio' + numberElement + '"/>');
    }
    if (s == 'checkbox') {
        copyFunction('<input type="checkbox" id="checkbox' + numberElement + '"/>');
    }
    if (s == 'text') {
        copyFunction('<input type="text" id="text' + numberElement + '"/>');
    }
    if (s == 'span') {
        copyFunction('<span id="span' + numberElement + '">Span ' + numberElement + '</span>');
    }
    if (s == 'table') {
        copyFunction(`<table id="table` + numberElement + `">
        <thead>
            <th>
                <td>Title</td>
            </th>
        </thead>
        <body>
            <tr>
                <td>Content</td>
            </tr>
        </body>
</table>`);
    }
    if (s == 'select') {
        copyFunction(`<select id="select` + numberElement + `">
            <option value="">Option 1</option>
            <option value="">Option 3</option>
</select>`);
    }
    if (s == 'hr') {
        copyFunction('<hr id="hr' + numberElement + '"/>');
    }
    if (s == 'form') {
        copyFunction(`<form id="form` + numberElement + `" src="" method="POST">
</form>`);
    }
    if (s == 'ul') {
        copyFunction(`<ul id="ul` + numberElement + `">
            <li></li>
            <li></li>
            <li></li>
</ul>`);
    }
    if (s == 'a') {
        copyFunction('<a href="" id="a' + numberElement + '"/>Link ' + numberElement + '</a>');
    }
    if (s == 'img') {
        copyFunction('<img src="" id="img' + numberElement + '"/>');
    }
}

function copyFunction(copyData) {
    var total = monaco.editor.getModels()[0].getValue() + copyData;
    monaco.editor.getModels()[0].setValue(total);
    fnLoadLayout()
}

function fnAtSource() {
    // var html = document.getElementById('layout').contentDocument.documentElement.outerHTML;
    var html = document.getElementById('layout').innerHTML;
    monaco.editor.getModels()[0].setValue(html)
}

function fnLoadLayout() {
    // document.getElementById('layout').src = 'file:///' + $('#txt_path').val() + '/' + $('#txt_file').val();
    document.getElementById('layout').innerHTML = monaco.editor.getModels()[0].getValue();
}

const fnListFiles = async (arg) => {

    var response = await window.versions.listFiles(arg)

    var html = '<ul>';
    for (i = 0; i < response.children.length; i++) {
        html = html + `<li onclick="fnClica('` + response.children[i].name + `')">` + response.children[i].name + `</li>`
    }

    html = html + '</ul>'

    $('#html1').html(html);
    $("#html1").jstree();
}

const fnCreateFile = async () => {

    var arg1 = $('#txt_path').val() + '/' + $('#nameFile').val();
    var arg2 = monaco.editor.getModels()[0].getValue();
    const response = await window.versions.createFile(arg1, arg2)
    fnListFiles($('#txt_path').val());
    $('#nameFile').val('');

}

const fnSaveFile = async () => {

    var arg1 = $('#txt_path').val() + '/' + $('#txt_file').val();
    var arg2 = monaco.editor.getModels()[0].getValue();
    const response = await window.versions.createFile(arg1, arg2)
    console.log(response, arg1, arg2)

}

const fnCreateFolder = async () => {
    var arg = 'C:/ProjetoTeste'
    const response = await window.versions.createFolder(arg)
    console.log(response)
}

function fnClica(s) {
    $('#txt_file').val(s)
    //document.getElementById('layout').src = 'file:///' + $('#txt_path').val() + '/' + $('#txt_file').val();
    document.getElementById('layout').innerHTML = monaco.editor.getModels()[0].getValue();
}

function fnChangeTab(s) {
    if (s == 'source') {
        fnAtSource();
        $('#layout').hide()
        $('#source').show()
        $('#btn-source').css('background-color', '#1e1e1e')
        $('#btn-layout').css('background-color', '#1d1d2e')

    }

    if (s == 'layout') {
        fnLoadLayout()
        $('#source').hide()
        $('#layout').show()
        $('#btn-source').css('background-color', '#1d1d2e')
        $('#btn-layout').css('background-color', '#1e1e1e')
    }

}

function fnCodeInit() {
    $("#container").height($('#source').height());
    $("#container").width($('#source').width());
    require.config({ paths: { vs: '/IDECss/vendor/monaco-editor/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        var editor = monaco.editor.create(document.getElementById('container'), {
            value: [''].join('\n'),
            automaticLayout: true,
            language: 'html',
            theme: 'vs-dark'
        });
    });
}



function fnAtSize() {
    $('#size_h_layout').val($('#size_h_layout').val().replace('px', '') + 'px');
    $('#size_v_layout').val($('#size_v_layout').val().replace('px', '') + 'px');
    $('#layout').css('height', $('#size_v_layout').val());
    $('#layout').css('width', $('#size_h_layout').val());
}

function fnAtPreSize(s) {
    if (s == '1') {
        var h = '1250';
        var v = '685';
    }
    if (s == '2') {
        var h = '380';
        var v = '720';
    }
    if (s == '3') {
        var h = '520';
        var v = '830';
    }

    $('#size_h_layout').val(h.replace('px', '') + 'px');
    $('#size_v_layout').val(v.replace('px', '') + 'px');

    fnAtSize();
}

function fnShowHideContent(s) {

    if ($('#' + s).is(":visible")) {
        $('#' + s).hide();
        $('#i_' + s).removeClass("fa-solid fa-caret-right");
        $('#i_' + s).addClass("fa-solid fa-sort-down");
    } else {
        $('#' + s).show();
        $('#i_' + s).removeClass("fa-solid fa-sort-down");
        $('#i_' + s).addClass("fa-solid fa-caret-right");
    }
}

function fnShowMenu() {
    $("#janelaModal").show();
}


function fnMenu() {

    if ($('#menu').is(":visible")) {
        $('#menu').hide()
    } else {
        $('#menu').show()
    }
}

function fnLoadProperties() {
    var idSel = $('#idSelectedElement').val();

    $('#color').val(rgb2hex($('#' + idSel).css('color')));
    $('#font-size').val($('#' + idSel).css('font-size'));
    $('#font-family').val($('#' + idSel).css('font-family'));
    $('#font-weight').val($('#' + idSel).css('font-weight'));
    $('#line-heigth').val($('#' + idSel).css('line-height'));
    $('#text-align').val($('#' + idSel).css('text-align'));
    $('#vertical-align').val($('#' + idSel).css('vertical-align'));

    $('#background-color').val(rgb2hex($('#' + idSel).css('background-color')));

    $('#padding-top').val($('#' + idSel).css('padding-top'));
    $('#padding-bottom').val($('#' + idSel).css('padding-bottom'));
    $('#padding-left').val($('#' + idSel).css('padding-left'));
    $('#padding-right').val($('#' + idSel).css('padding-right'));

    $('#width').val($('#' + idSel).css('width'));
    $('#heigth').val($('#' + idSel).css('height'));
    $('#min-width').val($('#' + idSel).css('min-width'));
    $('#min-heigth').val($('#' + idSel).css('min-height'));
    $('#max-width').val($('#' + idSel).css('max-width'));
    $('#max-heigth').val($('#' + idSel).css('max-height'));

    $('#position').val($('#' + idSel).css('position'));
    $('#top').val($('#' + idSel).css('top'));
    $('#left').val($('#' + idSel).css('left'));
    $('#margin-top').val($('#' + idSel).css('margin-top'));
    $('#margin-left').val($('#' + idSel).css('margin-left'));

    $('#opacity').val($('#' + idSel).css('opacity'));
    $('#display').val($('#' + idSel).css('display'));
    $('#cursor').val($('#' + idSel).css('cursor'));

    $('#border-top').val($('#' + idSel).css('border-top'));
    $('#border-top-style').val($('#' + idSel).css('border-top-style'));
    $('#border-top-color').val(rgb2hex($('#' + idSel).css('border-top-color')));
    $('#border-bottom').val($('#' + idSel).css('border-bottom'));
    $('#border-bottom-style').val($('#' + idSel).css('border-bottom-style'));
    $('#border-bottom-color').val(rgb2hex($('#' + idSel).css('border-bottom-color')));
    $('#border-left').val($('#' + idSel).css('border-left'));
    $('#border-left-style').val($('#' + idSel).css('border-left-style'));
    $('#border-left-color').val(rgb2hex($('#' + idSel).css('border-left-color')));
    $('#border-right').val($('#' + idSel).css('border-right'));
    $('#border-right-style').val($('#' + idSel).css('border-right-style'));
    $('#border-right-color').val(rgb2hex($('#' + idSel).css('border-right-color')));

    $('#border-top-left-radius').val($('#' + idSel).css('border-top-left-radius'));
    $('#border-top-right-radius').val($('#' + idSel).css('border-top-right-radius'));
    $('#border-bottom-left-radius').val($('#' + idSel).css('border-bottom-left-radius'));
    $('#border-bottom-right-radius').val($('#' + idSel).css('border-bottom-right-radius'));


}

function fnSetProperties() {
    var idSel = $('#idSelectedElement').val();

    $('#' + idSel).css('color', $('#color').val());
    $('#' + idSel).css('font-size', $('#font-size').val());
    $('#' + idSel).css('font-family', $('#font-family').val());
    $('#' + idSel).css('font-weight', $('#font-weight').val());
    $('#' + idSel).css('line-heigth', $('#line-heigth').val());
    $('#' + idSel).css('text-align', $('#text-align').val());
    $('#' + idSel).css('vertical-align', $('#vertical-align').val());

    $('#' + idSel).css('background-color', $('#background-color').val());

    $('#' + idSel).css('padding-top', $('#padding-top').val());
    $('#' + idSel).css('padding-bottom', $('#padding-bottom').val());
    $('#' + idSel).css('padding-left', $('#padding-left').val());
    $('#' + idSel).css('padding-right', $('#padding-right').val());

    $('#' + idSel).css('width', $('#width').val());
    $('#' + idSel).css('height', $('#height').val());
    $('#' + idSel).css('min-width', $('#min-width').val());
    $('#' + idSel).css('min-height', $('#min-height').val());
    $('#' + idSel).css('max-width', $('#max-width').val());
    $('#' + idSel).css('max-height', $('#max-height').val());

    $('#' + idSel).css('position', $('#position').val());
    $('#' + idSel).css('top', $('#top').val());
    $('#' + idSel).css('left', $('#left').val());
    $('#' + idSel).css('margin-top', $('#margin-top').val());
    $('#' + idSel).css('margin-left', $('#margin-left').val());
    

    $('#' + idSel).css('opacity', $('#opacity').val());
    $('#' + idSel).css('display', $('#display').val());
    $('#' + idSel).css('cursor', $('#cursor').val());

    $('#' + idSel).css('border-top', $('#border-top').val());
    $('#' + idSel).css('border-top-style', $('#border-top-style').val());
    $('#' + idSel).css('border-top-color', $('#border-top-color').val());
    $('#' + idSel).css('border-bottom', $('#border-bottom').val());
    $('#' + idSel).css('border-bottom-style', $('#border-bottom-style').val());
    $('#' + idSel).css('border-bottom-color', $('#border-bottom-color').val());
    $('#' + idSel).css('border-left', $('#border-left').val());
    $('#' + idSel).css('border-left-style', $('#border-left-style').val());
    $('#' + idSel).css('border-left-color', $('#border-left-color').val());
    $('#' + idSel).css('border-right', $('#border-right').val());
    $('#' + idSel).css('border-right-style', $('#border-right-style').val());
    $('#' + idSel).css('border-right-color', $('#border-right-color').val());

    $('#' + idSel).css('border-top-left-radius', $('#border-top-left-radius').val());
    $('#' + idSel).css('border-top-right-radius', $('#border-top-right-radius').val());
    $('#' + idSel).css('border-bottom-left-radius', $('#border-bottom-left-radius').val());
    $('#' + idSel).css('border-bottom-right-radius', $('#border-bottom-right-radius').val());



}

$("*").click(function (event) {
    var id = event.target.id;
    var x = document.getElementById(id).parentElement.id;
    if (x === 'layout') {
        $('#idSelectedElement').val(id);
        fnLoadProperties()
    }

});

$(document).ready(function () {
    $('#size_h_layout').val($('#layout').width() + 'px');
    $('#size_v_layout').val($('#layout').height() + 'px');
    //fnCodeInit();

    $("#container").height($('#source').height());
    $("#container").width($('#source').width());
    require.config({ paths: { vs: '/IDECss/vendor/monaco-editor/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        let editor = monaco.editor.create(document.getElementById('container'), {
            value: [''].join('\n'),
            automaticLayout: true,
            language: 'html',
            theme: 'vs-dark'
        });
    });


});

