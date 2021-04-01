import Board from './src/Board'
import * as p from './src/Pieces'
import clickFunctions from './src/ClickFunctions'

var board = new Board

function setPosition(pos) {
    switch (pos) {
        case 1:
            var kd = new p.King('d');var kw = new p.King('w');
            var qd = new p.Queen('d');var qw = new p.Queen('w');
            var bd1 = new p.Bishop('d');var bw1 = new p.Bishop('w');
            var bd2 = new p.Bishop('d');var bw2 = new p.Bishop('w');
            var nd1 = new p.Knight('d');var nw1 = new p.Knight('w');
            var nd2 = new p.Knight('d');var nw2 = new p.Knight('w');
            var rd1 = new p.Rook('d');var rw1 = new p.Rook('w');
            var rd2 = new p.Rook('d');var rw2 = new p.Rook('w');
            var pd1 = new p.Pawn('d');var pw1 = new p.Pawn('w');
            var pd2 = new p.Pawn('d');var pw2 = new p.Pawn('w');
            var pd3 = new p.Pawn('d');var pw3 = new p.Pawn('w');
            var pd4 = new p.Pawn('d');var pw4 = new p.Pawn('w');
            var pd5 = new p.Pawn('d');var pw5 = new p.Pawn('w');
            var pd6 = new p.Pawn('d');var pw6 = new p.Pawn('w');
            var pd7 = new p.Pawn('d');var pw7 = new p.Pawn('w');
            var pd8 = new p.Pawn('d');var pw8 = new p.Pawn('w');
            var wpawns = [pw1,pw2,pw3,pw4,pw5,pw6,pw7,pw8]
            var dpawns = [pd1,pd2,pd3,pd4,pd5,pd6,pd7,pd8]
            var dpieces = [rd1,nd1,bd1,qd,kd,bd2,nd2,rd2]
            var wpieces = [rw1,nw1,bw1,qw,kw,bw2,nw2,rw2]
            for(var x=0;x<8;x++){
                board.putOn(0,x,wpieces[x])
                board.putOn(1,x,wpawns[x])
                board.putOn(6,x,dpawns[x])
                board.putOn(7,x,dpieces[x])}
            break

        case 2:
            var kd = new p.King('d');var kw = new p.King('w');
            var pd1 = new p.Pawn('d');var pw1 = new p.Pawn('w');
            var pd2 = new p.Pawn('d');var pw2 = new p.Pawn('w');
            var bd1 = new p.Bishop('d');var bw1 = new p.Bishop('w');
            var qd = new p.Queen('d');var qw = new p.Queen('w');
            var rd1 = new p.Rook('d');var pw3 = new p.Pawn('w');
            board.putOn(3,0,kw)
            board.putOn(7,4,kd)
            board.putOn(6,1,pd1)
            board.putOn(2,0,pw1)
            board.putOn(3,1,pw2)
            board.putOn(2,1,bw1)
            board.putOn(7,3,qd)
            board.putOn(0,6,qw)
            board.putOn(4,2,pw1)
            board.putOn(7,1,rd1)
            break
        
        case 3:
            var kd = new p.King('d');var kw = new p.King('w');
            var qd = new p.Queen('d');var pw1 = new p.Pawn('w');
            var bw1 = new p.Bishop('w');var pw2 = new p.Pawn('w');
            var bd1 = new p.Bishop('d');
            board.putOn(7,0,kw)
            board.putOn(7,6,kd)
            board.putOn(6,0,pw2)
            board.putOn(6,1,pw1)
            board.putOn(0,5,qd)
            board.putOn(1,1,bw1)
            board.putOn(1,7,bd1)
            //board.putOn()
    }
}
setPosition(1)
board.update(0)

var clickObject = new clickFunctions
for(var i=0;i<8;i++){
    clickObject.saveB1[0][i]=[]
    clickObject.saveB2[0][i]=[]
    clickObject.varSaveState[0][i]=[]
    for(var j=0;j<8;j++){
        clickObject.saveB1[0][i][j] = board.b1[i][j]
        clickObject.saveB2[0][i][j] = board.b2[i][j].innerHTML
        if(board.b1[i][j]!=null){
            clickObject.varSaveState[0][i][j] = Object.assign({},board.b1[i][j])}
        else{clickObject.varSaveState[0][i][j] = board.b1[i][j]}
    }
}

function clickSq(elem) {
    clickObject.click(elem,board.b1,board.b2,board)
}

function setPlayState(turn) {
    clickObject.setState(turn,board.b1,board.b2)
}

function sqPromotion(elem) {
    clickObject.pawnPromotion(elem,board,p)
}

window.clickSq = clickSq
window.setPlayState = setPlayState
window.sqPromotion = sqPromotion
