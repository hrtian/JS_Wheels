let data = [
    {
        id: 1599157678091,
        name: "Tom",
        content: "I am a american",
        checked: true
    },
    {
        id: 1599158678091,
        name: "Jenny",
        content: "I am a hero.",
        checked: false
    },
];

(function(){
    let local = JSON.parse(localStorage.getItem("data"));
    let inited = localStorage.getItem("inited");
    if(inited) {
        data = local;
    }
    localStorage.setItem("inited", true);
})();

export default data;