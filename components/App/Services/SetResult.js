class SetResult {

static result=0;
static playerName='Unkown';
constructor() {}
static set(result){
    this.result=result;
}
static get(){
    return this.result;
}

static setPlayerName(nname){
    this.playerName=nname;
}
static getPlayerName(){
    return this.playerName;
}
}
export default SetResult;