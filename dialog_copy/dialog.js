// import myEvent from "./myEvent.js"

export default class Dialog extends EventTarget {
	constructor(options) {
		super();
		let opts = {
			width: "30%",
			height: "250px",
			title: "测试标题",
			content: "测试内容",
			dragable: true, //是否可拖拽
			maskable: true, //是否有遮罩
			isCancel: false, //是否有取消
			cancel: function () {},
			success: function () {},
		};

        for(let k in options) {
            opts[k] = options[k]
        }
        this.newOpts = opts;
        console.log(this.newOpts)
		// this.newOpts = Object.assign(opts, options);
		this.init();
	}

	init() {
		this.createHtml();
		if (!this.newOpts.maskable) {
			this.dialogEle.querySelector(".k-wrapper").style.display = "none";
		}

		this.addEventListener("success", this.newOpts.success);
		this.closeListener();
		if (this.newOpts.dragable) {
			this.drag();
		}
	}

	sure(value) {
		this.dispatchEvent(new CustomEvent("success", { detail: value }));
	}

	closeListener() {
		// 事件委托（为了多个点击避免相同操作）
		/*
            this 指定某一个对话框，避免document的全关闭
            this.dialogEle.querySelector(".k-close").onclick =  () => {close();}
        */
		let kDialog = this.dialogEle.querySelector(".k-dialog");
		kDialog.addEventListener("click", (e) => {
			let className = e.target.className;
			switch (className) {
				case "k-close":
					this.close();
					break;
				case "k-default":
					this.newOpts.cancel();
					this.close();
					break;
				case "k-primary":
					this.sure();
					this.close();
					break;
				default:
					break;
			}
		});
	}

	createHtml() {
		let dialogEle = document.createElement("div");
		dialogEle.innerHTML = `
            <div class="k-wrapper"></div>
            <div class="k-dialog" style="width:${this.newOpts.width};height:${
			this.newOpts.height
		}">
                <div class="k-header">
                    <span class="k-title">${this.newOpts.title}</span>
                    <span class="k-close">X</span>
                </div>
                <div class="k-body">
                    <span>${this.newOpts.content}</span>
                </div>
                <div class="k-footer">
                    ${
						this.newOpts.isCancel
							? `<span class="k-default">取消</span>`
							: ``
					}
                    <span class="k-primary">确定</span>
                </div>
            </div>`;
		dialogEle.style.display = "none";
		this.dialogEle = dialogEle;
		document.querySelector("body").appendChild(dialogEle);
	}

	open() {
		this.dialogEle.style.display = "block";
	}

	close() {
		this.dialogEle.style.display = "none";
	}

	drag() {
		let kDialog = this.dialogEle.querySelector(".k-dialog");
		kDialog.onmousedown = (e) => {
			let x = e.clientX - kDialog.offsetLeft;
			let y = e.clientY - kDialog.offsetTop;

			kDialog.onmousemove = (e) => {
				let xx = e.clientX - x;
				let yy = e.clientY - y;
				kDialog.style.left = xx + "px";
				kDialog.style.top = yy + "px";
			};
		};
		kDialog.onmouseup = () => {
			kDialog.onmousemove = null;
		};
	}
}

export class ExtendsDialog extends Dialog {
	constructor(options) {
		super(options);
	}

	createHtml() {
		super.createHtml();
		let myInput = document.createElement("input");
		this.myInput = myInput;
		myInput.classList.add("input-inner");
		this.dialogEle.querySelector(".k-body").appendChild(myInput);
	}

	sure() {
		let value = this.myInput.value;
		super.sure(value);
		this.myInput.value = "";
	}
}

class ShowDialog extends HTMLElement {
	constructor() {
		super();
		this.innerHTML = `<button>${this.innerText}</button>`;
		let dialog = new Dialog(
            {
                title: this.title
            }
        );
		this.onclick = () => {
			dialog.open();
		}
    }
    get title() {
        return this.getAttribute("title") || "default title";
    }
}

customElements.define("show-dialog", ShowDialog);
