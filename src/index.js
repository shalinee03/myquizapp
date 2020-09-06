import React, {Component} from "react";
import "./assets/style.css"; //this import help to download all the necessary components in css //
import ReactDOM from "react-dom"; //to show our app to web page
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class Quiz extends Component {
   //creating state variable now with an array question bank //
   //where those 5 question from quizservice will be stored once we pull them in from the API//
    state={
        questionBank : [],
        score:0,
        responses:0
    };
   
    getQuestions = () => {
        quizService().then(question => {
            this.setState({  
                questionBank: question
            });
        });
    };
    computeAnswer = (answer,correctAnswer)=> {
        if (answer === correctAnswer){
            this.setState({
                score:this.state.score+1
            });
        }
        this.setState({
            responses : this.state.responses < 5 ? this.state.responses+1 :5 
        });
    };

    playAgain = () => {
        this.getQuestions();
        this.setState({
            score:0,
            responses: 0
        });
    };
    //now to run we will use componendidmount and invoke this.getquestions inside it.//


    componentDidMount(){
        this.getQuestions();
    }
    render() { 
        return (
        <div className="container">
            <div className="title">Quizz</div>
            {/* now we have data to use so now to we have to render the data
            for this we simply check to see if our question bank array have data to render
            this will ensure attempt to data only when it is availiable
            we then used a map function where i will use destructuring of the question bucket 
            any changes made to question bank array will automatically signal an update causing
            component to re render with the updated data*/ }
            { this.state.questionBank.length > 0 && 
            this.state.responses<5 &&
            this.state.questionBank.map(
                ({question,answers,correct,questionId})=>(
                <QuestionBox 
                    question={question}
                    options={answers} 
                    key={questionId}
                    selected={answer => this.computeAnswer(answer, correct)}
                    />
                )
            )}
            {this.state.responses === 5 ? 
            (<Result score={this.state.score}
            playAgain={this.playAgain}/>):null}
        </div>
        );
    }
}

ReactDOM.render(<Quiz/>,document.getElementById("root"));