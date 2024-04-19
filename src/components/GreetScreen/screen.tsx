import Footer from "./footer";
import Greeter from "./greet";
import Start from "./start";
import Stats from "./stats";
import Team from "./team";
import Trusted from "./trust";

export default function HomePage() {
    return (
        <div>
            <Greeter />
            <Stats />
            <Trusted />
            <Team />
            <Start />
            <Footer />
        </div>
    );
}