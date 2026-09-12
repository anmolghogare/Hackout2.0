import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../ui/Card';
import { Badge } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { Recycle, ArrowUpRight, MapPin, Building, ShieldCheck } from 'lucide-react';

export const CircularNetwork: React.FC = () => {
  const listings = [
    {
      id: 'L1',
      materialName: 'Off-Cut Trim Scrap (LLDPE Polymer)',
      seller: 'Apex Packaging Pvt. Ltd. (Current Facility)',
      quantity: '12 Tons / Month',
      pricePerTon: '₹25,000 / Ton',
      carbonOffsetPotential: '1.8 tCO₂e / Ton',
      matchScore: 98,
      location: 'Pune Industrial Belt, MH',
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
  ];

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Recycle className="w-5 h-5 text-emerald-500" />
              <span>B2B Circular Waste Exchange Network</span>
            </CardTitle>
            <CardDescription>
              Monetize industrial waste streams & match verified secondary raw material suppliers across Indian SME belts.
            </CardDescription>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold border border-cyan-500/20">
            Verified ESG Match Engine
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300 shadow-sm"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={item.matchScore > 90 ? 'normal' : 'info'}>
                    {item.matchScore}% Match
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
              </div>

              <div className="mt-4 pt-2">
                <Button variant="primary" size="sm" className="w-full flex items-center justify-center space-x-1">
                  <span>Initiate B2B Trade</span>
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
