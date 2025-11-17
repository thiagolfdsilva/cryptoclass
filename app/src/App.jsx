import React from 'react';
import { Book, Wrench, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold text-white mb-4">
            DeFi Learning Hub
          </h1>
          <p className="text-xl text-blue-200">
            Learn and experiment with decentralized finance concepts
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Documentation Card */}
          <a
            href="/docs"
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500/20 p-4 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                <Book className="w-8 h-8 text-blue-300" />
              </div>
              <h2 className="text-3xl font-bold text-white">Documentation</h2>
            </div>
            <p className="text-blue-100 mb-6 text-lg">
              Comprehensive guides, concepts, and tutorials to understand DeFi mechanics, liquidity pools, and automated market makers.
            </p>
            <div className="flex items-center text-blue-300 font-semibold group-hover:text-blue-200">
              Read the docs
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </a>

          {/* Toolkit Card */}
          <a
            href="/toolkit"
            className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/15 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-purple-500/20 p-4 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                <Wrench className="w-8 h-8 text-purple-300" />
              </div>
              <h2 className="text-3xl font-bold text-white">Interactive Toolkit</h2>
            </div>
            <p className="text-blue-100 mb-6 text-lg">
              Hands-on demos and simulations. Experiment with liquidity pools, swaps, and DeFi protocols in a safe environment.
            </p>
            <div className="flex items-center text-purple-300 font-semibold group-hover:text-purple-200">
              Try the tools
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </a>
        </div>

        {/* Features Section */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            What You'll Learn
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">💧</div>
              <h4 className="text-lg font-semibold text-white mb-2">Liquidity Pools</h4>
              <p className="text-blue-200 text-sm">
                Understand constant product formulas and automated market making
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h4 className="text-lg font-semibold text-white mb-2">Token Swaps</h4>
              <p className="text-blue-200 text-sm">
                Learn how decentralized exchanges execute trades without order books
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h4 className="text-lg font-semibold text-white mb-2">Live Simulations</h4>
              <p className="text-blue-200 text-sm">
                Practice with real-time calculators and interactive demonstrations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}