import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate
} from "react-router-dom";
import UserProfile from "./components/UserProfile";
import Products from "./components/Products";


// Home Page Component
const Home = () => {
    const navigate = useNavigate();

    return (
        <section>
            <h2>Home Page</h2>
            <button onClick={() => navigate("/user-profile")}>Go to User Profile</button>
            <button onClick={() => navigate("/products")}>Go to Products List</button>
        </section>
    );
};

function App() {
    return (
        <BrowserRouter>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/user-profile">User Profile</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                </ul>
            </nav>
            {/*Implementing Routes for respective Path */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;