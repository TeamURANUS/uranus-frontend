import ReadComment from "./components/comment/ReadComment";
import WriteComment from "./components/comment/WriteComment";

function App() {
    return (
        <div>
            <ReadComment name="Student-1" text="IE classes are fun"/>
            <WriteComment name="Student-2"/>
        </div>
    );
}

export default App;
