import { async } from 'rxjs';
import{ Status} from './gamestatus';

export class Gamelogic {

    gamefield: Array<number>=[];

    currentTurn!: number;

    gameStatus: Status;
    
    winSituationsOne: Array <Array <number>> = [

    
        [1, 1, 1, 0 ,0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1 ,0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 1, 0, 1, 0, 0],
        [1, 1, 0, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 0, 1, 1, 0],
        [0, 0, 1, 0, 1, 0, 1, 1, 0]
    ];

    winSituationsTwo :Array< Array <number>> = [

        
        [2, 2, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 2, 0, 0, 2, 0, 0],
        [0, 2, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 2, 0, 0, 2, 0, 0, 2],
        [0, 0, 2 ,0, 2, 0, 2, 0, 0],
        [2, 0, 0, 0, 2, 0, 0, 0, 2],
        [0, 0, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 2, 0, 2, 2, 2, 0, 2],
        [2, 0, 0, 2, 2, 0, 2, 0, 0],
        [2, 2, 0, 0, 2, 0, 0, 2, 0],
        [2, 0, 2, 0, 0, 2, 0, 0, 2],
        [0, 2, 0, 0, 2, 2, 0, 2, 0],
        [2, 0, 2, 2, 0, 0, 2, 2, 0],
        [0, 0, 2, 0, 2, 0, 2, 2, 0],

    ];


    


    public constructor(){
        this.gameStatus = Status.STOP; 
        this.gamefield = [0,0,0,0,0,0,0,0,0];


    }

    gameStart(){
        this.gamefield=[0,0,0,0,0,0,0,0,0];
        this.currentTurn= this.randomPlayerStart();
        console.log(this.currentTurn);
        this.gameStatus = Status.START;
    }
    
    
    randomPlayerStart(): number{
        const startPlayer = Math.floor(Math.random() * 2) + 1;
        return startPlayer;  
    }
    
    
    setField(position: number,value: number): void{
    this.gamefield[position]= value;                   /* setting box value to player 1 or player 2*/
    }
    
    getPlayercolorClass() : string {
        
        const colorClass = (this.currentTurn === 2) ? "player-two" : "player-one";
        return colorClass;
    }
    
    changePlayer(): void{
        
        this.currentTurn = (this.currentTurn === 2) ? 1 : 2;
    }

    arrayEquals (a:Array<any>,b:Array<any>):boolean{          /*check position value of two array are same & return true*/
        return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((value, index)=>value === b[index]);

    }


    async checkEndWinner(): Promise <boolean>{
        let isWinner = false;

        const checkarray=(this.currentTurn === 1)?this.winSituationsOne : this.winSituationsTwo;
        const currentarray: number[]=[];                   /*creating new array*/

        this.gamefield.forEach( (subfield, index) => {    /*iterating all the game fields*/

            if(subfield !== this.currentTurn){      /*for each player getting the no in console each time not 2nd player*/
                currentarray[index] = 0;

            }

            else{
                currentarray[index] = subfield;
            }

        }
        );

        checkarray.forEach((checkfield,checkindex)=>{   /*check checkarray and the currentarray*/
            if(this.arrayEquals(checkfield,currentarray))
            {
                isWinner = true;

            }
        });

            
        
        console.log(currentarray);

        if(isWinner)
        {
            this.gameEnd();
            return true;

        }

        else{

            return false;
        }

    }
    
    
    async checkGameEndFull(): Promise <boolean> {
    let isfull = true; /*isfull a variable*/
    if(this.gamefield.includes(0))
    {
            isfull = false;
    }
    
    if(isfull)
        
        {
            this.gameEnd();
            return true;
        }
        
        else{
            return false;
        }
    }
    
    
    
    gameEnd()
    {
        this.gameStatus = Status.STOP;
    }
    
}



