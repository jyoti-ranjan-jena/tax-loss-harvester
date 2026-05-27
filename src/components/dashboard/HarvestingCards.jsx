import React from "react";
import { useDashboardData } from "../../hooks/useDashboardData";
import { formatCurrency } from "../../utils/formatters";
import AnimatedNumber from "../bits/AnimatedNumber";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

export default function HarvestingCards() {
  const { metrics } = useDashboardData();

  if (!metrics) return null;

  const { pre, post, taxSavings } = metrics;

  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
      {/* PRE-HARVESTING CARD (Static Baseline) */}
      <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        {" "}
        <h2 className="text-lg font-semibold text-white mb-6">
          Pre Harvesting
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 text-sm text-textGray pb-2 border-b border-border/50">
            <div></div>
            <div className="text-right">Short-term</div>
            <div className="text-right">Long-term</div>
          </div>

          <div className="grid grid-cols-3 text-sm">
            <div className="text-textGray">Profits</div>
            <div className="text-right text-white">
              {formatCurrency(pre.stcg.profits)}
            </div>
            <div className="text-right text-white">
              {formatCurrency(pre.ltcg.profits)}
            </div>
          </div>

          <div className="grid grid-cols-3 text-sm">
            <div className="text-textGray">Losses</div>
            <div className="text-right text-white">
              {formatCurrency(pre.stcg.losses)}
            </div>
            <div className="text-right text-white">
              {formatCurrency(pre.ltcg.losses)}
            </div>
          </div>

          <div className="grid grid-cols-3 text-sm font-medium pt-2">
            <div className="text-textGray">Net Capital Gains</div>
            <div className="text-right text-white">
              {formatCurrency(pre.netST)}
            </div>
            <div className="text-right text-white">
              {formatCurrency(pre.netLT)}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-textGray font-medium">
              Realised Capital Gains:
            </span>
            <span className="text-xl font-bold text-white">
              {formatCurrency(pre.realized)}
            </span>
          </div>
        </div>
      </div>

      {/* AFTER-HARVESTING CARD (Reactive & Animated) */}
      <div className="flex-1 bg-cardBlue rounded-xl p-6 shadow-[0_0_40px_rgba(10,74,236,0.15)] relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(10,74,236,0.3)]">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        <h2 className="text-lg font-semibold text-white mb-6 relative z-10">
          After Harvesting
        </h2>

        <div className="space-y-4 relative z-10">
          <div className="grid grid-cols-3 text-sm text-blue-200 pb-2 border-b border-blue-400/30">
            <div></div>
            <div className="text-right">Short-term</div>
            <div className="text-right">Long-term</div>
          </div>

          <div className="grid grid-cols-3 text-sm">
            <div className="text-blue-100">Profits</div>
            <AnimatedNumber
              className="text-right text-white"
              value={post.stcg.profits}
            />
            <AnimatedNumber
              className="text-right text-white"
              value={post.ltcg.profits}
            />
          </div>

          <div className="grid grid-cols-3 text-sm">
            <div className="text-blue-100">Losses</div>
            <AnimatedNumber
              className="text-right text-white"
              value={post.stcg.losses}
            />
            <AnimatedNumber
              className="text-right text-white"
              value={post.ltcg.losses}
            />
          </div>

          <div className="grid grid-cols-3 text-sm font-medium pt-2">
            <div className="text-blue-100">Net Capital Gains</div>
            <AnimatedNumber
              className="text-right text-white"
              value={post.netST}
            />
            <AnimatedNumber
              className="text-right text-white"
              value={post.netLT}
            />
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-blue-400/30 relative z-10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-100 font-medium">
              Effective Capital Gains:
            </span>
            <AnimatedNumber
              className="text-xl font-bold text-white"
              value={post.realized}
            />
          </div>

          {/* Reactive Savings Banner */}
          <AnimatePresence>
            {taxSavings > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="flex items-center gap-2 text-sm text-successGreen font-medium bg-black/20 py-2 px-3 rounded-lg"
              >
                <Info size={16} />
                <span>
                  Your taxable capital gains are reduced by{" "}
                  {formatCurrency(taxSavings)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
