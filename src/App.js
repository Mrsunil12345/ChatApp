
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Chat from "./component/chat/Chat.jsx";
import Join from './component/join/Join.jsx'
function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </BrowserRouter>,
    </div>
  );
}

export default App;
