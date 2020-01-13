let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('xigua')
    }, 1000)
})

async function a() {
    let a = await p1;
    return a;
}

let result = a().then((res) => {
    console.log(res);
});



// babel转的
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { 
    try { 
        var info = gen[key](arg); 
        var value = info.value; 
    }  catch (error) { 
        reject(error); 
        return;
    }
     if (info.done) {
          resolve(value);
     } else {
        Promise.resolve(value).then(_next, _throw); 
    } 
}

function _asyncToGenerator(fn) {
    return function () {
        var self = this, args = arguments; 
        return new Promise(function (resolve, reject) { 
            var gen = fn.apply(self, args); 
            function _next(value) { 
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); 
            } 
            function _throw(err) { 
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }; 
            _next(undefined); 
        }); 
    }; 
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('xigua');
    }, 1000);
});

function a() {
    return _a.apply(this, arguments);
}

function _a() {
    _a = _asyncToGenerator(function* () {
        let a = yield p1;
        return a;
    });
    return _a.apply(this, arguments);
}

let result = a().then(res => {
    console.log(res);
});