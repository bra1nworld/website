$(document).ready(function() {
    var dom = document.getElementById("sections");
    $("#sections").fullpage({
        controlArrows: false,
        navigation: true,
        navigationColor: '#fff',
        easingcss3: 'cubic-bezier(0.950, 0.050, 0.795, 0.035)',
        // anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        scrollingSpeed: 1000,
    });
});