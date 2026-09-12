import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Recycle, ArrowUpRight, MapPin, Building, ShieldCheck, Plus, Sparkles, X, CheckCircle2 } from 'lucide-react';
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
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newQuantity, setNewQuantity] = useState('15');
  const [newCategory, setNewCategory] = useState('Plastics & Polymers');
  const [newLocation, setNewLocation] = useState('Pune Industrial Area, MH');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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
      setListings((prev) => [apiResult.data, ...prev]);
    } else {
      // Local fallback for AI By-Product Matcher
      const fallbackItem = {
        id: `L-${Date.now()}`,
        materialName: newProductName,
        seller: 'Apex Packaging Pvt. Ltd. (Facility Input)',
        quantity: `${newQuantity} Tons / Month`,
        pricePerTon: '₹22,000 / Ton',
        carbonOffsetPotential: '1.7 tCO₂e / Ton',
        matchScore: 95,
        location: newLocation,
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
    <Card className="mb-8">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className="w-5 h-5 text-emerald-500" />
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
              className="flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add By-Product for AI Match</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Add By-Product AI Match Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
                  <h3 className="text-lg font-bold font-heading text-white">
                    Add Industrial By-Product / Scrap
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">
                    By-Product / Scrap Material Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PET Flakes, Fly Ash, Off-Cut Poly Film, Metal Shavings..."
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">
                      Monthly Volume (Tons/month)
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={newQuantity}
                      onChange={(e) => setNewQuantity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Material Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
                  <label className="block text-slate-300 font-bold mb-1">Facility Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold flex items-center space-x-1 mb-1">
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

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={item.matchScore > 90 ? 'normal' : 'info'}>
                    {item.matchScore}% AI Match
                  </Badge>
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {item.pricePerTon}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 dark:text-white text-base mb-1 font-heading">
                  {item.materialName}
                </h4>

                <p className="text-xs text-slate-500 flex items-center space-x-1 mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.seller}</span>
                </p>

                <div className="space-y-2 py-3 border-y border-slate-200/80 dark:border-slate-700/60 text-xs">
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
                      <span>{item.location}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-emerald-500 font-semibold">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>

                {/* AI Recipient Industry Analysis Box */}
                {item.aiAnalysis && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      <span>AI Recipient Industry Match</span>
                      <span>{item.aiAnalysis.landfillDiversionPct}</span>
                    </div>
                    <p className="font-bold text-white text-xs font-heading">
                      ➔ {item.aiAnalysis.recipientIndustry}
                    </p>
                    <div className="flex justify-between text-[11px] pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Scrap Sales Revenue:</span>
                      <span className="text-emerald-400 font-bold">{item.aiAnalysis.annualRevenueDisplay}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Avoided Disposal Fee:</span>
                      <span className="text-cyan-300 font-bold">{item.aiAnalysis.annualLandfillFeeSavedDisplay}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2">
                <Button variant="primary" size="sm" className="w-full flex items-center justify-center space-x-1">
                  <span>Initiate B2B Circular Trade</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
