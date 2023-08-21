const timeout = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'timeout')
    })
}
// js常见编码风格

console.log(`async前`);

(async () => {
    console.log('进入async')
    // const func = await fun()
    await timeout(2000).then((val) => {
        console.log(val)
    })
   
    console.log(`异步后面的`)


})()

console.log(`async函数后面的`)