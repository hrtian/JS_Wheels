let data = [
    {
        id: 1,
        title: "上方输入框添加事件👆", 
        done:false,
    },
    {
        id: 2,
        title: "👈完成事件，点击左侧框",
        done: false,
    },
    {
        id: 3,
        title: "删除事件，点击尾部👉",
        done: false,
    },
    {
        id: 4,
        title: "删除已完成事件， 点击 Clear ↘",
        done: true,
    }
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