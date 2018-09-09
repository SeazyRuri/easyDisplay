import compiler from './compiler.js';
// var fs=require("fs");
test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('index.css');
  const output = stats.toJson().modules[0].source;
    // console.log(output);
    // fs.writeFile("./output.html",output,(err)=>{
    //     if(err){
    //         throw err;
    //     }
    //     console.log("Saved");
    // })
  expect(output).toBe('export default "Hey Alice!\"');
});