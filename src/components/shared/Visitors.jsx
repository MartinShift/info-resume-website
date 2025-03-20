import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Header } from './Header';
import { Footer } from './Footer';
import { get, onValue, ref, set } from 'firebase/database';
import { database } from '../../js/firebaseConfig';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const Visitors = () => {
    const [visitorData, setVisitorData] = useState({
        totalVisitors: 0,
        dailyVisits: []
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializeDatabase = async () => {
            try {
                const today = new Date().toISOString().split('T')[0];
                const visitsRef = ref(database, 'visits');
                const totalRef = ref(database, 'totalVisitors');
    
                // Check if structure exists
                const totalSnap = await get(totalRef);
                const visitsSnap = await get(visitsRef);
    
                // Initialize if empty
                if (!totalSnap.exists()) {
                    await set(totalRef, 0);
                }
                if (!visitsSnap.exists()) {
                    await set(visitsRef, {
                        [today]: 0
                    });
                }
    
                // Listen for changes
                const unsubscribe = onValue(visitsRef, async (snapshot) => {
                    try {
                        const visitsData = snapshot.val() || {};
                        const totalSnap = await get(totalRef);
                        
                        console.log('Database state:', {
                            visits: visitsData,
                            total: totalSnap.val()
                        });
    
                        const last30Days = Object.entries(visitsData)
                            .map(([date, visits]) => ({ date, visits }))
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .slice(0, 30);
    
                        setVisitorData({
                            totalVisitors: totalSnap.val() || 0,
                            dailyVisits: last30Days
                        });
                    } catch (err) {
                        console.error('Error fetching data:', err);
                        setError(err.message);
                    }
                });
    
                return () => unsubscribe();
            } catch (err) {
                console.error('Database initialization error:', err);
                setError(err.message);
            }
        };
    
        initializeDatabase();
    }, []);

      const chartData = {
    labels: visitorData.dailyVisits.map(day => new Date(day.date).toLocaleDateString()),
    datasets: [
      {
        data: visitorData.dailyVisits.map(day => day.visits),
        backgroundColor: 'rgba(56, 189, 248, 0.7)',
        borderColor: 'rgb(56, 189, 248)',
        borderWidth: 1,
        borderRadius: 4,
        barThickness: 32,
      }
    ]
  };


    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgb(51, 65, 85)',
                titleColor: 'rgb(226, 232, 240)',
                bodyColor: 'rgb(226, 232, 240)',
                borderColor: 'rgb(71, 85, 105)',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
                callbacks: {
                    title: (items) => 'Visitors',
                    label: (item) => item.formattedValue
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)'
                },
                ticks: {
                    color: 'rgb(148, 163, 184)',
                    font: {
                        size: 12
                    }
                }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    color: 'rgb(148, 163, 184)',
                    font: {
                        size: 12
                    }
                }
            }
        }
    };

    return (
        <div className="App bg-slate-900 text-gray-100">
            <Header />
            <div className="mx-auto max-w-screen-lg px-3 py-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">
                        Website <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Statistics</span>
                    </h1>
                    <div className="mt-3 text-gray-200">Track the website's visitor activity and engagement</div>
                </div>

                {/* Total Visitors Counter */}
                <div className="p-16 mb-6 text-center">
                    <h2 className="text-2xl text-gray-400 mb-6">Total Visitors</h2>
                    <div className="flex justify-center items-center">
                        <div className="font-mono text-[88px] font-bold tracking-wider bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text text-transparent">
                            {visitorData.totalVisitors}
                        </div>
                    </div>
                </div>
                {/* Chart Card */}
                <div className="rounded-lg bg-slate-800 p-6">
                    <h2 className="text-2xl font-bold mb-6">
                        Daily <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">Visits</span>
                    </h2>
                    <div className="h-[300px]">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className="mt-6 text-sm text-gray-400 text-center">
                    This website uses Firebase Analytics to track visits. Duplicate visits from the same user are filtered to ensure data accuracy.
                </div>
            </div>
            <Footer />
        </div>
    );
};