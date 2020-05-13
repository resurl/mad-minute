document.getElementById('other-answer').addEventListener('keyup', (e) => {
    if (e.keyCode == '13' && document.getElementById('other-answer').value)
        window.location.replace(window.location.pathname + '/' + document.getElementById('other-answer').value)
})