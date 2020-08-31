// proxy  vue3.x
class Tvue extends EventTarget {
	constructor(options) {
		super();
		this.$options = options;
		this._data = options.data;
		this.observer(this._data);
		this.compile();
	}

	observer(data) {
		let _this = this;
		this.$options.data = this._data = new Proxy(data, {
			get(target, key) {
				return target[key];
			},
			set(target, key, value) {
				// process data
				console.log("*** Proxy set ***");
				_this.dispatchEvent(new CustomEvent(key, { detail: value }));
				target[key] = value;
				return true;
			},
		});
	}
	
	compile() {
		let ele = document.querySelector(this.$options.ele);
		this.compileNodes(ele);
	}

	compileNodes(ele) {
		let childNodes = ele.childNodes;
		childNodes.forEach((node) => {
			if (node.nodeType == 1) {
				let attrs = node.attributes;
				[...attrs].forEach((attr) => {
					let attrName = attr.name.substr(2);
					let attrValue = attr.value;
					if (attrName === "text") {
						node.innerText = this._data[attrValue];
					} else if (attrName === "model") {
						node.value = this._data[attrValue];
						node.addEventListener("input", (e) => {
							this._data[attrValue] = e.target.value;
						});
					} else if (attrName === "html") {
						node.innerHTML = this._data[attrValue];
					}
				});

				if (node.childNodes.length > 0) {
					this.compileNodes(node);
				}
			} else if (node.nodeType == 3) {
				let reg = /{{\s*([^{}\s]+)\s*}}/g;
				let textContent = node.textContent;
				if (reg.test(textContent)) {
					let $1 = RegExp.$1;
					node.textContent = textContent.replace(reg, this._data[$1]);

					this.addEventListener($1, (e) => {
						let reg = new RegExp(this._data[$1], "g");
						node.textContent = node.textContent.replace(
							reg,
							e.detail
						);
					});
				}
			}
		});
	}
}
