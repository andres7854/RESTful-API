function autoResize() {
    const textareas = document.querySelectorAll('textarea.auto-resize');
    textareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
    document.body.style.height = document.body.scrollHeight + 'px';
}

setInterval(() => {autoResize()}, 200);

(()=>{
    $('#carouselExampleControls').carousel({
        interval: false
    });
})();