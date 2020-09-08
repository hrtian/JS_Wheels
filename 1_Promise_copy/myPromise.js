class TPromise {
	constructor(handle) {
		this.statue = "pendding";
		this.value = undefined;
		this.resolvedQueue = [];
		this.rejectedQueue = [];
		handle(this._resolve.bind(this), this._reject.bind(this));
	}

	_resolve(val) {
		this.statue = "resolve";
		this.value = val;

		// 制造微任务，让其在其他宏任务中的微任务前执行
		let observer = new MutationObserver(() => {
			let cb;
			while ((cb = this.resolvedQueue.shift())) {
				cb(val);
			}
		});
		
		observer.observe(document.body, {
			attributes: true,
		});
		document.body.setAttribute("reslove", 0);
	}

	_reject(err) {
		this.statue = "reject";
		this.value = err;
		let observer = new MutationObserver(() => {
			let cb;
			while ((cb = this.rejectedQueue.shift())) {
				cb(err);
			}
		});
		observer.observe(document.body, {
			attributes: true,
		});
		document.body.setAttribute("reject", -1);
	}

	then(onResolved, onRejected) {
		return new TPromise((reslove, reject) => {
			this.resolvedQueue.push((val) => {
				val = onResolved && onResolved(val);
				if (val instanceof TPromise) {
					return val;
				}
				reslove(val);
			});

			this.rejectedQueue.push((err) => {
				onRejected && onRejected(err);
				reject(err);
			});
		});
	}

	catch(onRejected) {
		this.then(undefined, onRejected);
	}

	finally(callback) {
		// let p = this.constructor();
		return this.then(
			(value) => {
				callback();
				console.log("success");
				return this._resolve(value);
			},
			(reason) => {
				callback();
				console.log("failed");
				throw reason;
			}
		);
	}

	static reslove(value) {
		return new TPromise((reslove) => {
			reslove(value);
		});
	}

	static reject(value) {
		return new TPromise((resolve, reject) => {
			reject(value);
		});
	}

	static all(arr) {
		return new TPromise((resolve, reject) => {
			let ret = [];
			let num = 0;
			arr.forEach((p) => {
				p.then(
					(res) => {
						num++;
						ret.push(res);
					},
					(ret) => {
						reject(ret);
					}
				);
			});
			if (num !== ret.length) {
				reject(ret);
			} else {
				resolve(ret);
			}
		});
	}
}
