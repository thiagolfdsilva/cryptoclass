import React, { useState } from 'react';
import { ArrowDownUp, Plus, Minus, Info } from 'lucide-react';

export default function LiquidityPoolDemo() {
  // Configuration state
  const [showSettings, setShowSettings] = useState(true);
  const [feePercent, setFeePercent] = useState(0.3);
  
  // Token names
  const [tokenAName, setTokenAName] = useState('TKA');
  const [tokenBName, setTokenBName] = useState('TKB');
  
  // Initial values for reset
  const [initialPoolTokenA, setInitialPoolTokenA] = useState(1000);
  const [initialPoolTokenB, setInitialPoolTokenB] = useState(2000);
  const [initialUserTokenA, setInitialUserTokenA] = useState(500);
  const [initialUserTokenB, setInitialUserTokenB] = useState(1000);
  
  // Pool state (using constant product formula: x * y = k)
  const [poolTokenA, setPoolTokenA] = useState(1000);
  const [poolTokenB, setPoolTokenB] = useState(2000);
  
  // User balances
  const [userTokenA, setUserTokenA] = useState(500);
  const [userTokenB, setUserTokenB] = useState(1000);
  const [userLPTokens, setUserLPTokens] = useState(0);
  
  // Input states
  const [swapInputA, setSwapInputA] = useState('');
  const [swapInputB, setSwapInputB] = useState('');
  const [swapDirection, setSwapDirection] = useState('AtoB'); // 'AtoB' or 'BtoA'
  const [addLiquidityA, setAddLiquidityA] = useState('');
  const [addLiquidityB, setAddLiquidityB] = useState('');
  const [removeLiquidity, setRemoveLiquidity] = useState('');
  const [activeTab, setActiveTab] = useState('swap');
  
  // Activity log
  const [activityLog, setActivityLog] = useState([]);

  // Calculate constant product
  const k = poolTokenA * poolTokenB;
  
  // Calculate price
  const priceAinB = poolTokenB / poolTokenA;
  const priceBinA = poolTokenA / poolTokenB;

  // Calculate total LP tokens (simplified: sqrt(k))
  const totalLPTokens = Math.sqrt(poolTokenA * poolTokenB);

  // Swap calculation with configurable fee
  const calculateSwapOutput = (inputAmount, inputReserve, outputReserve) => {
    const inputAmountWithFee = inputAmount * (1 - feePercent / 100);
    const numerator = inputAmountWithFee * outputReserve;
    const denominator = inputReserve + inputAmountWithFee;
    return numerator / denominator;
  };

  const startDemo = () => {
    setPoolTokenA(initialPoolTokenA);
    setPoolTokenB(initialPoolTokenB);
    setUserTokenA(initialUserTokenA);
    setUserTokenB(initialUserTokenB);
    setUserLPTokens(0);
    setSwapInputA('');
    setSwapInputB('');
    setAddLiquidityA('');
    setAddLiquidityB('');
    setRemoveLiquidity('');
    setActivityLog([]);
    setShowSettings(false);
  };

  const resetDemo = () => {
    setPoolTokenA(initialPoolTokenA);
    setPoolTokenB(initialPoolTokenB);
    setUserTokenA(initialUserTokenA);
    setUserTokenB(initialUserTokenB);
    setUserLPTokens(0);
    setSwapInputA('');
    setSwapInputB('');
    setAddLiquidityA('');
    setAddLiquidityB('');
    setRemoveLiquidity('');
    setActivityLog([]);
  };

  const addLog = (type, message, details) => {
    const timestamp = new Date().toLocaleTimeString();
    setActivityLog(prev => [{
      id: Date.now(),
      type,
      message,
      details,
      timestamp
    }, ...prev].slice(0, 50)); // Keep last 50 logs
  };

  const handleSwap = () => {
    if (swapDirection === 'AtoB') {
      const input = parseFloat(swapInputA);
      if (!input || input <= 0 || input > userTokenA) return;
      
      const output = calculateSwapOutput(input, poolTokenA, poolTokenB);
      const priceImpact = ((output / (poolTokenB / poolTokenA * input)) - 1) * -100;
      
      setPoolTokenA(poolTokenA + input);
      setPoolTokenB(poolTokenB - output);
      setUserTokenA(userTokenA - input);
      setUserTokenB(userTokenB + output);
      
      addLog('swap', `Swapped ${input.toFixed(4)} ${tokenAName} for ${output.toFixed(4)} ${tokenBName}`, {
        priceImpact: priceImpact.toFixed(2) + '%',
        fee: (input * feePercent / 100).toFixed(4) + ' ' + tokenAName
      });
      
      setSwapInputA('');
      setSwapInputB('');
    } else {
      const input = parseFloat(swapInputB);
      if (!input || input <= 0 || input > userTokenB) return;
      
      const output = calculateSwapOutput(input, poolTokenB, poolTokenA);
      const priceImpact = ((output / (poolTokenA / poolTokenB * input)) - 1) * -100;
      
      setPoolTokenB(poolTokenB + input);
      setPoolTokenA(poolTokenA - output);
      setUserTokenB(userTokenB - input);
      setUserTokenA(userTokenA + output);
      
      addLog('swap', `Swapped ${input.toFixed(4)} ${tokenBName} for ${output.toFixed(4)} ${tokenAName}`, {
        priceImpact: priceImpact.toFixed(2) + '%',
        fee: (input * feePercent / 100).toFixed(4) + ' ' + tokenBName
      });
      
      setSwapInputA('');
      setSwapInputB('');
    }
  };

  const handleSwapInputChange = (value, direction) => {
    if (direction === 'AtoB') {
      setSwapInputA(value);
      if (value && !isNaN(value)) {
        const output = calculateSwapOutput(parseFloat(value), poolTokenA, poolTokenB);
        setSwapInputB(output.toFixed(4));
      } else {
        setSwapInputB('');
      }
    } else {
      setSwapInputB(value);
      if (value && !isNaN(value)) {
        const output = calculateSwapOutput(parseFloat(value), poolTokenB, poolTokenA);
        setSwapInputA(output.toFixed(4));
      } else {
        setSwapInputA('');
      }
    }
  };

  const switchSwapDirection = () => {
    setSwapDirection(swapDirection === 'AtoB' ? 'BtoA' : 'AtoB');
    setSwapInputA('');
    setSwapInputB('');
  };

  const handleAddLiquidity = () => {
    const amountA = parseFloat(addLiquidityA);
    const amountB = parseFloat(addLiquidityB);
    
    if (!amountA || !amountB || amountA <= 0 || amountB <= 0) return;
    if (amountA > userTokenA || amountB > userTokenB) return;
    
    // Check if amounts maintain the ratio
    const ratio = poolTokenA / poolTokenB;
    const inputRatio = amountA / amountB;
    
    if (Math.abs(ratio - inputRatio) > 0.01) {
      alert('Amounts must maintain the current pool ratio!');
      return;
    }
    
    // Calculate LP tokens to mint
    const lpTokensToMint = (amountA / poolTokenA) * totalLPTokens;
    
    setPoolTokenA(poolTokenA + amountA);
    setPoolTokenB(poolTokenB + amountB);
    setUserTokenA(userTokenA - amountA);
    setUserTokenB(userTokenB - amountB);
    setUserLPTokens(userLPTokens + lpTokensToMint);
    
    addLog('add', `Added ${amountA.toFixed(4)} ${tokenAName} + ${amountB.toFixed(4)} ${tokenBName}`, {
      lpTokensReceived: lpTokensToMint.toFixed(4),
      poolShare: ((lpTokensToMint / (totalLPTokens + lpTokensToMint)) * 100).toFixed(2) + '%'
    });
    
    setAddLiquidityA('');
    setAddLiquidityB('');
  };

  const handleRemoveLiquidity = () => {
    const lpAmount = parseFloat(removeLiquidity);
    if (!lpAmount || lpAmount <= 0 || lpAmount > userLPTokens) return;
    
    const shareOfPool = lpAmount / totalLPTokens;
    const amountA = poolTokenA * shareOfPool;
    const amountB = poolTokenB * shareOfPool;
    
    setPoolTokenA(poolTokenA - amountA);
    setPoolTokenB(poolTokenB - amountB);
    setUserTokenA(userTokenA + amountA);
    setUserTokenB(userTokenB + amountB);
    setUserLPTokens(userLPTokens - lpAmount);
    
    addLog('remove', `Removed ${lpAmount.toFixed(4)} LP tokens`, {
      received: `${amountA.toFixed(4)} ${tokenAName} + ${amountB.toFixed(4)} ${tokenBName}`,
      shareRemoved: (shareOfPool * 100).toFixed(2) + '%'
    });
    
    setRemoveLiquidity('');
  };

  const updateAddLiquidityA = (valueA) => {
    setAddLiquidityA(valueA);
    if (valueA && !isNaN(valueA)) {
      const requiredB = (parseFloat(valueA) / poolTokenA) * poolTokenB;
      setAddLiquidityB(requiredB.toFixed(4));
    } else {
      setAddLiquidityB('');
    }
  };

  const updateAddLiquidityB = (valueB) => {
    setAddLiquidityB(valueB);
    if (valueB && !isNaN(valueB)) {
      const requiredA = (parseFloat(valueB) / poolTokenB) * poolTokenA;
      setAddLiquidityA(requiredA.toFixed(4));
    } else {
      setAddLiquidityA('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Liquidity Pool Demo
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Experience automated market making with constant product formula (x × y = k)
        </p>

        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Demo Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Token Names</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Token A Symbol</label>
                      <input
                        type="text"
                        value={tokenAName}
                        onChange={(e) => setTokenAName(e.target.value.toUpperCase())}
                        maxLength={10}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="TKA"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Token B Symbol</label>
                      <input
                        type="text"
                        value={tokenBName}
                        onChange={(e) => setTokenBName(e.target.value.toUpperCase())}
                        maxLength={10}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="TKB"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Pool Initial Liquidity</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Token A</label>
                      <input
                        type="number"
                        value={initialPoolTokenA}
                        onChange={(e) => setInitialPoolTokenA(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Token B</label>
                      <input
                        type="number"
                        value={initialPoolTokenB}
                        onChange={(e) => setInitialPoolTokenB(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Your Initial Balances</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Token A</label>
                      <input
                        type="number"
                        value={initialUserTokenA}
                        onChange={(e) => setInitialUserTokenA(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">Token B</label>
                      <input
                        type="number"
                        value={initialUserTokenB}
                        onChange={(e) => setInitialUserTokenB(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-4">Fee Settings</h3>
                  <div>
                    <label className="text-sm text-gray-600 mb-2 block">
                      Swap Fee (%)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={feePercent}
                      onChange={(e) => setFeePercent(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Common values: 0.3% (Uniswap v2), 0.05% (low), 1% (high)
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 text-sm text-gray-700">
                  <div className="font-semibold mb-2">Preview:</div>
                  <div>Pool: {tokenAName}/{tokenBName}</div>
                  <div>Initial Price: 1 {tokenAName} = {(initialPoolTokenB / initialPoolTokenA).toFixed(4)} {tokenBName}</div>
                  <div>Constant Product (k): {(initialPoolTokenA * initialPoolTokenB).toFixed(0)}</div>
                </div>

                <button
                  onClick={startDemo}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Start Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {!showSettings && (
          <>
            <div className="mb-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Settings
              </button>
              <button
                onClick={resetDemo}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Reset Demo
              </button>
            </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Pool Status */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-500" />
              Pool Status
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Token A in Pool</div>
                <div className="text-2xl font-bold text-blue-600">
                  {poolTokenA.toFixed(2)} {tokenAName}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Token B in Pool</div>
                <div className="text-2xl font-bold text-purple-600">
                  {poolTokenB.toFixed(2)} {tokenBName}
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Constant Product (k)</div>
                <div className="text-xl font-bold text-gray-800">
                  {k.toFixed(0)}
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Current Price</div>
                <div className="text-sm font-semibold text-green-700">
                  1 {tokenAName} = {priceAinB.toFixed(4)} {tokenBName}
                </div>
                <div className="text-sm font-semibold text-green-700">
                  1 {tokenBName} = {priceBinA.toFixed(4)} {tokenAName}
                </div>
              </div>
            </div>
          </div>

          {/* User Balances */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Wallet</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Token A Balance</div>
                <div className="text-2xl font-bold text-blue-600">
                  {userTokenA.toFixed(2)} {tokenAName}
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Token B Balance</div>
                <div className="text-2xl font-bold text-purple-600">
                  {userTokenB.toFixed(2)} {tokenBName}
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">LP Tokens</div>
                <div className="text-2xl font-bold text-amber-600">
                  {userLPTokens.toFixed(2)}
                </div>
                {userLPTokens > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {((userLPTokens / totalLPTokens) * 100).toFixed(2)}% of pool
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Panel */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('swap')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'swap'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Swap
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'add'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Add Liquidity
            </button>
            <button
              onClick={() => setActiveTab('remove')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'remove'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Remove Liquidity
            </button>
          </div>

          {/* Swap Tab */}
          {activeTab === 'swap' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  {swapDirection === 'AtoB' ? `From (${tokenAName})` : `From (${tokenBName})`}
                </label>
                <input
                  type="number"
                  value={swapDirection === 'AtoB' ? swapInputA : swapInputB}
                  onChange={(e) =>
                    handleSwapInputChange(e.target.value, swapDirection)
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Balance:{' '}
                  {swapDirection === 'AtoB'
                    ? userTokenA.toFixed(2)
                    : userTokenB.toFixed(2)}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={switchSwapDirection}
                  className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition-colors"
                >
                  <ArrowDownUp className="w-6 h-6 text-blue-600" />
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  {swapDirection === 'AtoB' ? `To (${tokenBName})` : `To (${tokenAName})`}
                </label>
                <input
                  type="number"
                  value={swapDirection === 'AtoB' ? swapInputB : swapInputA}
                  onChange={(e) =>
                    handleSwapInputChange(e.target.value, swapDirection === 'AtoB' ? 'BtoA' : 'AtoB')
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="0.0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Balance:{' '}
                  {swapDirection === 'AtoB'
                    ? userTokenB.toFixed(2)
                    : userTokenA.toFixed(2)}
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-yellow-50 p-3 rounded">
                Fee: {feePercent}% | Slippage will occur based on trade size
              </div>

              <button
                onClick={handleSwap}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Swap
              </button>
            </div>
          )}

          {/* Add Liquidity Tab */}
          {activeTab === 'add' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  {tokenAName} Amount
                </label>
                <input
                  type="number"
                  value={addLiquidityA}
                  onChange={(e) => updateAddLiquidityA(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="0.0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Balance: {userTokenA.toFixed(2)} {tokenAName}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  {tokenBName} Amount
                </label>
                <input
                  type="number"
                  value={addLiquidityB}
                  onChange={(e) => updateAddLiquidityB(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="0.0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Balance: {userTokenB.toFixed(2)} {tokenBName}
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
                Current ratio: 1 {tokenAName} = {priceAinB.toFixed(4)} {tokenBName}
              </div>

              <button
                onClick={handleAddLiquidity}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Liquidity
              </button>
            </div>
          )}

          {/* Remove Liquidity Tab */}
          {activeTab === 'remove' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <label className="text-sm text-gray-600 mb-2 block">
                  LP Tokens to Remove
                </label>
                <input
                  type="number"
                  value={removeLiquidity}
                  onChange={(e) => setRemoveLiquidity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="0.0"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Balance: {userLPTokens.toFixed(2)} LP
                </div>
              </div>

              {removeLiquidity && !isNaN(removeLiquidity) && (
                <div className="bg-blue-50 rounded-lg p-4 text-sm">
                  <div className="font-semibold mb-2">You will receive:</div>
                  <div>
                    {((parseFloat(removeLiquidity) / totalLPTokens) * poolTokenA).toFixed(4)} {tokenAName}
                  </div>
                  <div>
                    {((parseFloat(removeLiquidity) / totalLPTokens) * poolTokenB).toFixed(4)} {tokenBName}
                  </div>
                </div>
              )}

              <button
                onClick={handleRemoveLiquidity}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Minus className="w-5 h-5" />
                Remove Liquidity
              </button>
            </div>
          )}
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Activity Log</h2>
          {activityLog.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No activity yet. Start trading or adding liquidity!</p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {activityLog.map((log) => (
                <div
                  key={log.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    log.type === 'swap'
                      ? 'bg-blue-50 border-blue-500'
                      : log.type === 'add'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-800 capitalize">
                      {log.type === 'swap' ? '🔄 Swap' : log.type === 'add' ? '➕ Add Liquidity' : '➖ Remove Liquidity'}
                    </span>
                    <span className="text-xs text-gray-500">{log.timestamp}</span>
                  </div>
                  <div className="text-sm text-gray-700 mb-2">{log.message}</div>
                  {log.details && (
                    <div className="text-xs text-gray-600 space-y-1">
                      {Object.entries(log.details).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </>
        )}
      </div>
    </div>
  );
}