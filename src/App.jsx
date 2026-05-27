import React from 'react';
import { useDashboardData } from './hooks/useDashboardData';
import BlurText from './components/bits/BlutText';
import HarvestingCards from './components/dashboard/HarvestingCards';
import HoldingsTable from './components/dashboard/HoldingsTable';
import { motion } from 'framer-motion'; // <-- Import motion here

function App() {
  const { isLoading, isError } = useDashboardData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center font-sans text-white">
        <BlurText text="Fetching Investment Portfolio & Tax Metrics..." className="text-xl font-medium text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center font-sans text-red-500">
        <p className="text-lg font-semibold">Error syncing portfolio parameters. Please refresh.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-4 md:p-12 font-sans antialiased selection:bg-cardBlue/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Animated Header */}
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-border/40"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-textGray bg-clip-text text-transparent">
              Tax Optimisation
            </h1>
            <p className="text-xs text-textGray mt-0.5">
              Simulate instant tax loss harvesting cycles over asset layers.
            </p>
          </div>
        </motion.header>

        <main className="space-y-8">
          {/* Animated Cards Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <HarvestingCards />
          </motion.div>
          
          {/* Animated Table Container */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center px-1">
              <h2 className="text-lg font-semibold text-white tracking-tight">Holdings Asset Registry</h2>
              <p className="text-xs text-textGray">Click headers to sort values</p>
            </div>
            <HoldingsTable />
          </motion.div>
        </main>
        
      </div>
    </div>
  );
}

export default App;