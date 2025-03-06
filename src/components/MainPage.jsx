import { Footer } from "./shared/Footer"
import { Header } from "./shared/Header"
import { Introduction } from "./shared/Introduction"
import RecentPosts from "./shared/RecentPosts"
import RecentProjects from "./shared/RecentProjects"

export const MainPage = () => {
    return (
    <div className="App bg-slate-900 text-gray-100">
        <Header />
        <Introduction />
        <RecentProjects />
        <RecentPosts />
        <Footer />
    </div>
    );
}