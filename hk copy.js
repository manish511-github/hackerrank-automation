const puppeteer=require('puppeteer')
const { answers } = require('./code')
const codeObj=require('./code')
const loginLink='https://www.hackerrank.com/auth/login'
const email='youremailid@gmail.com'     //email
const password='yourpassword'       //password
let browserOpen=puppeteer.launch({
    headless:false,
    args:['--start=maximised'],
    defaultViewport:null
})
let page
browserOpen.then(function(browserObj)
{
    let browserOPenPromise=browserObj.newPage()
    return browserOPenPromise;

}).then(function(newTab)
{
    page=newTab
    let hackerRankOpenPromise=newTab.goto(loginLink)
    return hackerRankOpenPromise

}).then(function()
{
    let emailIsEntered=page.type("input[id='input-1']",email,{delay:50})
    return emailIsEntered
}).then(function()
{
    let passwordIsEntered=page.type("input[type='password']",password,{delay:50})
    return passwordIsEntered

}).then(function()
{
    let loginButtonClicked=page.click('button[data-analytics="LoginPassword"]',{delay:50})
    return loginButtonClicked
}).then (function()
{
let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
return clickOnAlgoPromise
}).then(function()
{
    let getToWarmUp=waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
}).then (function()
{
    let allChallengesPromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    return allChallengesPromise

})
.then (function(questionsArr)

{
console.log('number of questions',questionsArr.length)
let quesitonWillBeSolved=questionSolver(page,questionsArr[0],codeObj.answers[0])
return quesitonWillBeSolved
})





function waitAndClick(selector,cPage)
{
    return new Promise(function(resolve,reject){
        let waitForModelPromise=cPage.waitForSelector(selector)
        waitForModelPromise.then(function()
        {
            let clickModal=cPage.click(selector)
            return clickModal

        }).then (function()
        {
            resolve()

        })
        .catch(function(err)
        {
            reject()

        })
    })
}
function questionSolver(page,question,answer)
{
    return new Promise(function (resolve,reject){
        let questionWillBeClicked=question.click()
         questionWillBeClicked.then(function()
         {
                let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.mac.vs',page)
                return EditorInFocusPromise
         })
         .then(function()
         {
             return waitAndClick('.checkbox-input',page)
         }).then(function()
         {
return page.waitForSelector('textarea.custominput',page)
         })
        .then(function()
        {
return page.type('textarea.custominput',answer,{delay:10})
        })
        .then(function(){
            let ctrlIsPressed=page.keyboard.down('Cmd')
            return ctrlIsPressed
        })
        .then(function(){
           let AisPressed=page.keyboard.press('A',{delay:100})
          return  AisPressed 
        })
        .then (function()
        {
            let XisPressed=page.keyboard.press('X',{delay:100})
            return XisPressed
        })
        .then(function(){
            let ctrlIsUnPressed=page.keyboard.up('Cmd')
            return ctrlIsUnPressed
        })
             .then(function(){
                let MainEditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.mac.vs',page)
                return MainEditorInFocusPromise
             })
             .then(function(){
                let ctrlIsPressed=page.keyboard.down('Cmd')
                return ctrlIsPressed
            })
            .then(function(){
                let AisPressed=page.keyboard.press('A',{delay:100})
               return  AisPressed 
             })
             .then(function(){
                let VisPressed=page.keyboard.press('V',{delay:100})
               return  VisPressed 
             })
             .then(function(){
                let ctrlIsUnPressed=page.keyboard.up('Cmd')
                return ctrlIsUnPressed
            })
            .then(function()
            {
return page.click('.hr-monaco_run-code',{delay:50})

            })
            .then(function()
            {
resolve()
            })
            .catch(function(err)
            {
                reject()
            })

    })
}