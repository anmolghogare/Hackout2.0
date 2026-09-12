import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Recycle, ArrowUpRight, MapPin, Building, ShieldCheck, Plus, Sparkles, X, CheckCircle2, Handshake } from 'lucide-react';
import { analyzeByProduct } from '../../../lib/api';

export const CircularNetwork: React.FC = () => {
  const [listings, setListings] = useState<any[]>([
    {
      id: 'L1',
      materialName: 'Off-Cut Trim Scrap (LLDPE Polymer)',
      seller: 'Apex Packaging Pvt. Ltd. (Current Facility)',
      quantity: '12 Tons / Month',
      pricePerTon: '₹25,000 / Ton',
      carbonOffsetPotential: '1.8 tCO₂e / Ton',
      matchScore: 98,
      location: 'Pune Industrial Belt, MH',
      isContracted: false,
      aiAnalysis: {
        recipientIndustry: 'Pipe & Conduit Manufacturers (Factory B)',
        buyerDiscount: '30% below virgin polymer',
        annualRevenueDisplay: '+₹3,00,000 / year',
        annualLandfillFeeSavedDisplay: '+₹2,16,000 / year',
        landfillDiversionPct: '85% Landfill Diversion',
        recommendation: 'Direct B2B supply of off-cut trim scrap to Factory B replaces virgin resin at 30% discount while generating ₹3.0L/yr scrap sales revenue.',
      },
    },
    {
      id: 'L2',
      materialName: 'Clean Industrial Biomass Briquettes',
      seller: 'GreenFuel Eco Solutions',
      quantity: '50 Tons / Month',
      pricePerTon: '₹6,800 / Ton',
      carbonOffsetPotential: '2.4 tCO₂e / Ton (vs Heavy Fuel)',
      matchScore: 94,
      location: 'Chakan Industrial Zone, MH',
      isContracted: false,
    },
    {
      id: 'L3',
      materialName: 'Post-Consumer Recycled (PCR) HDPE Granules',
      seller: 'ResinTech Circular Synthetics',
      quantity: '25 Tons / Month',
      pricePerTon: '₹48,000 / Ton',
      carbonOffsetPotential: '1.4 tCO₂e / Ton',
      matchScore: 89,
      location: 'Vapi Industrial Area, GJ',
      isContracted: false,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tradeModalItem, setTradeModalItem] = useState<any | null>(null);
  const [tradeVolume, setTradeVolume] = useState('12');
  const [tradeRate, setTradeRate] = useState('25000');

  const [newProductName, setNewProductName] = useState('');
  const [newQuantity, setNewQuantity] = useState('15');
  const [newCategory, setNewCategory] = useState('Plastics & Polymers');
  const [newLocation, setNewLocation] = useState('Pune Industrial Area, MH');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleOpenTradeModal = (item: any) => {
    setTradeModalItem(item);
    setTradeVolume(item.quantity ? item.quantity.split(' ')[0] : '12');
    setTradeRate(item.pricePerTon ? item.pricePerTon.replace(/[^0-9]/g, '') : '25000');
  };

  const handleConfirmTrade = () => {
    if (tradeModalItem) {
      setListings((prev) =>
        prev.map((item) =>
          item.id === tradeModalItem.id ? { ...item, isContracted: true } : item
        )
      );
      setTradeModalItem(null);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    setIsAnalyzing(true);

    const apiResult = await analyzeByProduct({
      name: newProductName,
      quantity: `${newQuantity} Tons / Month`,
      category: newCategory,
      location: newLocation,
    });

    if (apiResult && apiResult.data) {
      setListings((prev) => [{ ...apiResult.data, isContracted: false }, ...prev]);
    } else {
      const fallbackItem = {
        id: `L-${Date.now()}`,
        materialName: newProductName,
        seller: 'Apex Packaging Pvt. Ltd. (Facility Input)',
        quantity: `${newQuantity} Tons / Month`,
        pricePerTon: '₹22,000 / Ton',
        carbonOffsetPotential: '1.7 tCO₂e / Ton',
        matchScore: 95,
        location: newLocation,
        isContracted: false,
        aiAnalysis: {
          recipientIndustry: 'Regional Secondary Processing & Construction Mfrs',
          buyerDiscount: '30% below virgin raw materials',
          annualRevenueDisplay: `+₹${(parseFloat(newQuantity) * 22000 * 12).toLocaleString('en-IN')} / year`,
          annualLandfillFeeSavedDisplay: `+₹${(parseFloat(newQuantity) * 1500 * 12).toLocaleString('en-IN')} / year`,
          landfillDiversionPct: '85% Landfill Waste Diversion',
          recommendation: `AI Matcher recommends routing ${newQuantity}T/mo of ${newProductName} as secondary feedstock. Eliminates landfill dumping fees and yields recurring sales revenue.`,
        },
      };
      setListings((prev) => [fallbackItem, ...prev]);
    }

    setIsAnalyzing(false);
    setIsAddModalOpen(false);
    setNewProductName('');
  };

  return (
    <Card className="mb-8 theme-transition">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>AI-Powered Waste-to-Resource Circular Network</span>
            </CardTitle>
            <CardDescription>
              Analyze industrial by-products with AI, match recipient industries, calculate landfill diversion & monetize scrap.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              variant="primary"
              className="flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add By-Product for AI Match</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all duration-300 ${
                item.isContracted
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/50 shadow-sm'
                  : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.matchScore}% AI Match
                  </span>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {item.pricePerTon}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                  {item.materialName}
                </h4>

                <p className="text-xs text-slate-500 flex items-center space-x-1 mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{item.seller}</span>
                </p>

                <div className="space-y-2 py-3 border-y border-slate-100 dark:border-slate-700/60 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Available Volume</span>
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Carbon Abatement</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {item.carbonOffsetPotential}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[150px]">{item.location}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>

                {/* AI Recipient Industry Analysis Box */}
                {item.aiAnalysis && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">
                      <span>AI Recipient Match</span>
                      <span>{item.aiAnalysis.landfillDiversionPct}</span>
                    </div>
                    <p className="font-bold text-slate-900 dark:text-white text-xs font-heading">
                      ➔ {item.aiAnalysis.recipientIndustry}
                    </p>
                    <div className="flex justify-between text-[11px] pt-1 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 dark:text-slate-400">Scrap Revenue:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{item.aiAnalysis.annualRevenueDisplay}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Avoided Fee:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-bold">{item.aiAnalysis.annualLandfillFeeSavedDisplay}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2">
                <Button
                  variant={item.isContracted ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleOpenTradeModal(item)}
                  className="w-full flex items-center justify-center space-x-1 font-bold"
                >
                  {item.isContracted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Trade Active & Contracted</span>
                    </>
                  ) : (
                    <>
                      <span>Initiate B2B Circular Trade</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Initiate B2B Trade Modal */}
        {tradeModalItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Handshake className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Initiate B2B Circular Trade Contract
                  </h3>
                </div>
                <button
                  onClick={() => setTradeModalItem(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-slate-500">Target By-Product:</div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">
                    {tradeModalItem.materialName}
                  </div>
                  <div className="text-slate-500 font-mono text-[11px]">
                    Seller: {tradeModalItem.seller}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                      Monthly Volume (Tons/mo)
                    </label>
                    <input
                      type="number"
                      value={tradeVolume}
                      onChange={(e) => setTradeVolume(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                      Contract Rate (₹ / Ton)
                    </label>
                    <input
                      type="number"
                      value={tradeRate}
                      onChange={(e) => setTradeRate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span>Projected Annual Revenue:</span>
                    <span>₹{(parseFloat(tradeVolume || '0') * parseFloat(tradeRate || '0') * 12).toLocaleString('en-IN')} / year</span>
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Avoids ₹1,500/Ton municipal landfill dumping fee & earns Scope 3 circularity credits.
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline" size="sm" onClick={() => setTradeModalItem(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleConfirmTrade} className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Sign B2B Trade</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Add By-Product AI Match Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <h3 className="text-lg font-bold font-heading text-slate-900 dark:text-white">
                    Add Industrial By-Product / Scrap
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                    By-Product / Scrap Material Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PET Flakes, Fly Ash, Off-Cut Poly Film, Metal Shavings..."
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">
                      Monthly Volume (Tons/month)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Material Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Plastics & Polymers">Plastics & Polymers</option>
                      <option value="Combustion Ash & Minerals">Combustion Ash & Minerals</option>
                      <option value="Metals & Alloy Off-cuts">Metals & Alloy Off-cuts</option>
                      <option value="Chemicals & Spent Solvents">Chemicals & Spent Solvents</option>
                      <option value="Textiles & Fibers">Textiles & Fibers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Facility Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 text-[11px] font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1 mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>AI Industry Matching Engine</span>
                  </span>
                  AI will analyze recipient industries, calculate secondary feedstock discounts (30%), landfill diversion fees saved (₹1,500/T), and annual sales revenue.
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={isAnalyzing}>
                    {isAnalyzing ? (
                      <span className="flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Analyzing AI Match...</span>
                      </span>
                    ) : (
                      <span>Run AI Industry Matcher</span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
