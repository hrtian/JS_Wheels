// 发布订阅版本
class Tvue {
	constructor(options) {
		this.$option = options;
		this._data = options.data;
		this.observer(this._data);
		this.compile();
	}

	observer(data) {
		Object.keys(data).forEach((key) => {
			let value = data[key]; // 避免死递归
			this.defineReact(data, key, value);
		});
	}

	defineReact(data, key, value) {
		let dep = new Dep();
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get() {
				if (Dep.target) {
					dep.addSub(Dep.target);
				}
				return value;
			},
			set(newValue) {
				dep.notify(newValue);
				value = newValue;
			},
		});
	}

	compile() {
		let ele = document.querySelector(this.$option.ele);
		let childNodes = ele.childNodes;
		this.compileNodes(childNodes);
	}

	compileNodes(childNodes) {
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
					this.compileNodes(node.childNodes);
				}
			} else if (node.nodeType == 3) {
				let textContent = node.textContent;
				let reg = /{{\s*([^{}\s]+)\s*}}/g;
				if (reg.test(textContent)) {
					let $1 = RegExp.$1;
					node.textContent = textContent.replace(
						reg,
						this.$option.data[$1]
					);

					new Watcher(this._data, $1, (newValue) => {
						let oldValue = this._data[$1];
						let reg = new RegExp(oldValue);
						node.textContent = node.textContent.replace(
							reg,
							newValue
						);
					});
				}
			}
		});
	}
}

class Dep {
	constructor() {
		this.subs = [];
	}

	addSub(sub) {
		this.subs.push(sub);
	}

	notify(newValue) {
		this.subs.forEach((sub) => {
			sub.update(newValue);
		});
	}
}

class Watcher {
	constructor(data, key, cb) {
        Dep.target = this;
        // 触发 Dep.addSub()
		data[key];
		this.cb = cb;
		Dep.target = null;
	}

	update(newValue) {
		console.log("update...");
		this.cb(newValue);
	}
}