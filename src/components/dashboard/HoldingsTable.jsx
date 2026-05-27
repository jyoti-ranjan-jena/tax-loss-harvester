// import React, { useState, useMemo } from 'react';
// import { useDashboardData } from '../../hooks/useDashboardData';
// import { formatCurrency, formatCrypto, getColorClass } from '../../utils/formatters';
// import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';
// import { motion } from 'framer-motion';

// export default function HoldingsTable() {
//   const { holdings, selectedHoldings, toggleHolding, toggleAll } = useDashboardData();
  
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [sortField, setSortField] = useState(null);
//   const [sortDirection, setSortDirection] = useState('desc');

//   const processedHoldings = useMemo(() => {
//     let items = [...holdings];
//     if (sortField) {
//       items.sort((a, b) => {
//         const valA = a[sortField]?.gain || 0;
//         const valB = b[sortField]?.gain || 0;
//         return sortDirection === 'asc' ? valA - valB : valB - valA;
//       });
//     }
//     return items;
//   }, [holdings, sortField, sortDirection]);

//   const visibleHoldings = isExpanded ? processedHoldings : processedHoldings.slice(0, 4);
//   const visibleIds = visibleHoldings.map(h => h.id);

//   const isAllVisibleSelected = useMemo(() => {
//     if (visibleIds.length === 0) return false;
//     return visibleIds.every(id => selectedHoldings.includes(id));
//   }, [visibleIds, selectedHoldings]);

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
//     } else {
//       setSortField(field);
//       setSortDirection('desc');
//     }
//   };

//   return (
//     /* Added min-h-[460px] so the page height never collapses during sorts, preventing page-jump */
//     <div className="bg-card border border-border rounded-xl shadow-lg flex flex-col min-h-[460px]">
      
//       {/* Strict overflow control: horizontal scroll for mobile, vertical strictly hidden to kill animation scrollbars */}
//       <div className="overflow-x-auto overflow-y-hidden flex-1">
//         <table className="w-full text-left text-sm text-white min-w-[950px] border-collapse">
          
//           {/* THE HEADER: Static, no hover effects, perfectly clean */}
//           <thead className="bg-[#1C1C24] text-textGray font-medium border-b border-border">
//             <tr>
//               <th className="w-[5%] p-4 text-center">
//                 <input
//                   type="checkbox"
//                   className="w-4 h-4 rounded accent-cardBlue cursor-pointer"
//                   checked={isAllVisibleSelected}
//                   onChange={() => toggleAll(visibleIds)}
//                 />
//               </th>
//               <th className="w-[22%] p-4 font-semibold">Asset</th>
//               <th className="w-[15%] p-4 font-semibold text-right">Holdings</th>
//               <th className="w-[15%] p-4 font-semibold text-right">Current Price</th>
              
//               <th 
//                 className="w-[15%] p-4 font-semibold text-right cursor-pointer select-none hover:text-white transition-colors"
//                 onClick={() => handleSort('stcg')}
//               >
//                 <div className="flex items-center justify-end gap-1">
//                   <span>Short-Term Gain</span>
//                   <span className="w-4 flex justify-center">
//                     {sortField === 'stcg' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
//                   </span>
//                 </div>
//               </th>
              
//               <th 
//                 className="w-[15%] p-4 font-semibold text-right cursor-pointer select-none hover:text-white transition-colors"
//                 onClick={() => handleSort('ltcg')}
//               >
//                 <div className="flex items-center justify-end gap-1">
//                   <span>Long-Term Gain</span>
//                   <span className="w-4 flex justify-center">
//                     {sortField === 'ltcg' && (sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
//                   </span>
//                 </div>
//               </th>
//               <th className="w-[13%] p-4 font-semibold text-right">Amount to Sell</th>
//             </tr>
//           </thead>
          
//           {/* THE BODY: Staggered, fast, glowing rows */}
//           <tbody key={`${sortField}-${sortDirection}-${isExpanded}`} className="divide-y divide-border/60 relative z-0">
//             {visibleHoldings.map((row, index) => {
//               const isChecked = selectedHoldings.includes(row.id);
              
//               return (
//                 <motion.tr 
//                   key={row.id} 
                  
//                   /* Smoother, faster animation logic */
//                   initial={{ opacity: 0, filter: "blur(6px)" }}
//                   animate={{ opacity: 1, filter: "blur(0px)" }}
//                   transition={{ duration: 0.2, delay: index * 0.025, ease: "easeOut" }}
                  
//                   /* Premium Glow Hover: Adds a soft white light and elevates the z-index so the glow doesn't get clipped by other rows */
//                   className={`transition-all duration-300 cursor-pointer relative hover:z-10 hover:bg-white/[0.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.04)] ${isChecked ? 'bg-cardBlue/5' : ''}`}
//                   onClick={() => toggleHolding(row.id)}
//                 >
//                   <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 rounded accent-cardBlue cursor-pointer transition-transform hover:scale-110"
//                       checked={isChecked}
//                       onChange={() => toggleHolding(row.id)}
//                     />
//                   </td>
                  
//                   <td className="p-4 font-medium truncate">
//                     <div className="flex items-center gap-3 overflow-hidden">
//                       <img src={row.logo} alt={row.coin} className="w-7 h-7 rounded-full bg-white/10 object-contain shrink-0" />
//                       <div className="truncate">
//                         <div className="font-semibold text-white">{row.coin}</div>
//                         <div className="text-xs text-textGray truncate">{row.coinName}</div>
//                       </div>
//                     </div>
//                   </td>
                  
//                   <td className="p-4 text-right whitespace-nowrap">
//                     <div className="text-white font-medium">{formatCrypto(row.totalHolding)}</div>
//                     <div className="text-xs text-textGray">Avg: {formatCurrency(row.averageBuyPrice)}</div>
//                   </td>
                  
//                   <td className="p-4 text-right font-medium text-white whitespace-nowrap">
//                     {formatCurrency(row.currentPrice)}
//                   </td>
                  
//                   <td className={`p-4 text-right font-medium whitespace-nowrap ${getColorClass(row.stcg.gain)}`}>
//                     <div>{formatCurrency(row.stcg.gain)}</div>
//                     <div className="text-xs text-textGray font-normal">{formatCrypto(row.stcg.balance, row.coin)}</div>
//                   </td>
                  
//                   <td className={`p-4 text-right font-medium whitespace-nowrap ${getColorClass(row.ltcg.gain)}`}>
//                     <div>{formatCurrency(row.ltcg.gain)}</div>
//                     <div className="text-xs text-textGray font-normal">{formatCrypto(row.ltcg.balance, row.coin)}</div>
//                   </td>
                  
//                   <td className="p-4 text-right font-semibold text-white whitespace-nowrap">
//                     {isChecked ? (
//                       <span className="inline-block text-cardBlue font-medium bg-cardBlue/10 border border-cardBlue/20 px-2 py-1 rounded text-xs">
//                         {formatCrypto(row.totalHolding, row.coin)}
//                       </span>
//                     ) : (
//                       <span className="inline-block text-textGray/40 font-normal text-xs">
//                         —
//                       </span>
//                     )}
//                   </td>
//                 </motion.tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* VIEW ALL BUTTON */}
//       {processedHoldings.length > 4 && (
//         <div className="border-t border-border p-3 bg-[#14141A] flex justify-center relative z-20">
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="flex items-center gap-2 text-sm font-semibold text-cardBlue hover:text-blue-400 transition-colors py-1 px-4 rounded-lg hover:bg-cardBlue/5"
//           >
//             {isExpanded ? (
//               <>
//                 <EyeOff size={16} />
//                 <span>Show Less</span>
//               </>
//             ) : (
//               <>
//                 <Eye size={16} />
//                 <span>View All ({processedHoldings.length} Assets)</span>
//               </>
//             )}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useMemo } from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import { formatCurrency, formatCrypto, getColorClass } from '../../utils/formatters';
import { ChevronUp, ChevronDown, Eye, EyeOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HoldingsTable() {
  const { holdings, selectedHoldings, toggleHolding, toggleAll } = useDashboardData();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('desc');

  const processedHoldings = useMemo(() => {
    let items = [...holdings];
    if (sortField) {
      items.sort((a, b) => {
        const valA = a[sortField]?.gain || 0;
        const valB = b[sortField]?.gain || 0;
        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
    }
    return items;
  }, [holdings, sortField, sortDirection]);

  const visibleHoldings = isExpanded ? processedHoldings : processedHoldings.slice(0, 4);
  const visibleIds = visibleHoldings.map(h => h.id);

  const isAllVisibleSelected = useMemo(() => {
    if (visibleIds.length === 0) return false;
    return visibleIds.every(id => selectedHoldings.includes(id));
  }, [visibleIds, selectedHoldings]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-lg flex flex-col min-h-[460px]">
      
      <div className="overflow-x-auto overflow-y-hidden flex-1">
        <table className="w-full text-left text-sm text-white min-w-[950px] border-collapse">
          
          <thead className="bg-[#1C1C24] text-textGray font-medium border-b border-border">
            <tr>
              <th className="w-[5%] p-4 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-cardBlue cursor-pointer"
                  checked={isAllVisibleSelected}
                  onChange={() => toggleAll(visibleIds)}
                />
              </th>
              <th className="w-[22%] p-4 font-semibold">Asset</th>
              <th className="w-[15%] p-4 font-semibold text-right">Holdings</th>
              <th className="w-[15%] p-4 font-semibold text-right">Current Price</th>
              
              {/* Short-Term Gain Header with Reset Pill */}
              <th 
                className="w-[15%] p-4 font-semibold text-right cursor-pointer select-none transition-colors group"
                onClick={() => handleSort('stcg')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span className="group-hover:text-white transition-colors">Short-Term Gain</span>
                  
                  {/* Stable width container so the header text never jumps */}
                  <div className="flex items-center justify-end w-[46px] min-h-[24px]">
                    <AnimatePresence>
                      {sortField === 'stcg' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-0.5 bg-white/5 pl-1 pr-0.5 py-0.5 rounded-full border border-white/10 shadow-sm"
                        >
                          <span className="text-cardBlue">
                            {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation(); // Stops the column from re-sorting
                              setSortField(null);
                            }}
                            className="bg-transparent hover:bg-red-500/20 text-textGray hover:text-red-400 rounded-full p-0.5 transition-all"
                            title="Clear Filter"
                          >
                            <X size={10} strokeWidth={3} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </th>
              
              {/* Long-Term Gain Header with Reset Pill */}
              <th 
                className="w-[15%] p-4 font-semibold text-right cursor-pointer select-none transition-colors group"
                onClick={() => handleSort('ltcg')}
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span className="group-hover:text-white transition-colors">Long-Term Gain</span>
                  
                  <div className="flex items-center justify-end w-[46px] min-h-[24px]">
                    <AnimatePresence>
                      {sortField === 'ltcg' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 0.5, filter: "blur(2px)" }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center gap-0.5 bg-white/5 pl-1 pr-0.5 py-0.5 rounded-full border border-white/10 shadow-sm"
                        >
                          <span className="text-cardBlue">
                            {sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSortField(null);
                            }}
                            className="bg-transparent hover:bg-red-500/20 text-textGray hover:text-red-400 rounded-full p-0.5 transition-all"
                            title="Clear Filter"
                          >
                            <X size={10} strokeWidth={3} />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </th>
              
              <th className="w-[13%] p-4 font-semibold text-right">Amount to Sell</th>
            </tr>
          </thead>
          
          <tbody key={`${sortField}-${sortDirection}-${isExpanded}`} className="divide-y divide-border/60 relative z-0">
            {visibleHoldings.map((row, index) => {
              const isChecked = selectedHoldings.includes(row.id);
              
              return (
                <motion.tr 
                  key={row.id} 
                  initial={{ opacity: 0, filter: "blur(6px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.2, delay: index * 0.025, ease: "easeOut" }}
                  className={`transition-all duration-300 cursor-pointer relative hover:z-10 hover:bg-white/[0.03] hover:shadow-[0_0_20px_rgba(255,255,255,0.04)] ${isChecked ? 'bg-cardBlue/5' : ''}`}
                  onClick={() => toggleHolding(row.id)}
                >
                  <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-cardBlue cursor-pointer transition-transform hover:scale-110"
                      checked={isChecked}
                      onChange={() => toggleHolding(row.id)}
                    />
                  </td>
                  
                  <td className="p-4 font-medium truncate">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img src={row.logo} alt={row.coin} className="w-7 h-7 rounded-full bg-white/10 object-contain shrink-0" />
                      <div className="truncate">
                        <div className="font-semibold text-white">{row.coin}</div>
                        <div className="text-xs text-textGray truncate">{row.coinName}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="text-white font-medium">{formatCrypto(row.totalHolding)}</div>
                    <div className="text-xs text-textGray">Avg: {formatCurrency(row.averageBuyPrice)}</div>
                  </td>
                  
                  <td className="p-4 text-right font-medium text-white whitespace-nowrap">
                    {formatCurrency(row.currentPrice)}
                  </td>
                  
                  <td className={`p-4 text-right font-medium whitespace-nowrap ${getColorClass(row.stcg.gain)}`}>
                    <div>{formatCurrency(row.stcg.gain)}</div>
                    <div className="text-xs text-textGray font-normal">{formatCrypto(row.stcg.balance, row.coin)}</div>
                  </td>
                  
                  <td className={`p-4 text-right font-medium whitespace-nowrap ${getColorClass(row.ltcg.gain)}`}>
                    <div>{formatCurrency(row.ltcg.gain)}</div>
                    <div className="text-xs text-textGray font-normal">{formatCrypto(row.ltcg.balance, row.coin)}</div>
                  </td>
                  
                  <td className="p-4 text-right font-semibold text-white whitespace-nowrap">
                    {isChecked ? (
                      <span className="inline-block text-cardBlue font-medium bg-cardBlue/10 border border-cardBlue/20 px-2 py-1 rounded text-xs">
                        {formatCrypto(row.totalHolding, row.coin)}
                      </span>
                    ) : (
                      <span className="inline-block text-textGray/40 font-normal text-xs">
                        —
                      </span>
                    )}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {processedHoldings.length > 4 && (
        <div className="border-t border-border p-3 bg-[#14141A] flex justify-center relative z-20">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm font-semibold text-cardBlue hover:text-blue-400 transition-colors py-1 px-4 rounded-lg hover:bg-cardBlue/5"
          >
            {isExpanded ? (
              <>
                <EyeOff size={16} />
                <span>Show Less</span>
              </>
            ) : (
              <>
                <Eye size={16} />
                <span>View All ({processedHoldings.length} Assets)</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}