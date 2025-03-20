import { Link } from "react-router-dom";
import { useEffect } from "react";
import { ref, set, get, increment } from 'firebase/database';
import { database } from '../../js/firebaseConfig';


export const Header = () => {
  useEffect(() => {
    const trackVisit = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const hasVisitedToday = localStorage.getItem(`visited_${today}`);
        
        if (!hasVisitedToday) {
          const dailyRef = ref(database, `visits/${today}`);
          const totalRef = ref(database, 'totalVisitors');
          
          // Get current daily visits
          const dailySnap = await get(dailyRef);
          const currentDailyVisits = dailySnap.val() || 0;
          
          // Increment visits
          await set(dailyRef, currentDailyVisits + 1);
          await set(totalRef, increment(1));
          
          localStorage.setItem(`visited_${today}`, 'true');
          console.log('Visit tracked successfully');
        }
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisit();
  }, []);
  return (
    <div className="mx-auto max-w-screen-lg px-3 py-6">
      <div className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between">
        <Link to="/">
          <div className="flex items-center bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-xl font-bold text-transparent">
            <svg className="mr-1 h-10 w-10 stroke-cyan-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M0 0h24v24H0z" stroke="none"></path>
              <rect x="3" y="12" width="6" height="8" rx="1"></rect>
              <rect x="9" y="8" width="6" height="12" rx="1"></rect>
              <rect x="15" y="4" width="6" height="16" rx="1"></rect>
              <path d="M4 20h14"></path>
            </svg>
            Martin's Blog
          </div>
        </Link>
        <nav>
          <ul className="flex gap-x-3 font-medium text-gray-200">
            <li className="hover:text-white"><Link to="/info-resume-website/visitors">Stats</Link></li>
            <li className="hover:text-white"><Link to="/info-resume-website/posts">Posts</Link></li>
            <li className="hover:text-white"><a href="https://github.com/MartinShift?tab=repositories">GitHub</a></li>
            <li className="hover:text-white"><a href="https://www.linkedin.com/in/saprykin-martin-a96496249/">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
  