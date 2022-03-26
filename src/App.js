import ReadComment from "./components/comment/ReadComment";
import WriteComment from "./components/comment/WriteComment";
import ReadPost from "./components/post/ReadPost";

function App() {
    return (
        <div>
            <ReadPost title="HW3 is given" text="Due date is tomorrow! Your homework will cost 5 pts at total" author="Lecturer"/>
            <ReadComment name="Student-1" text="Bruh moment"/>
            <WriteComment name="Student-2"/>
        </div>
    );
}

export default App;
