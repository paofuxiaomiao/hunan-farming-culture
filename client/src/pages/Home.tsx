import { useState } from 'react';
import Header from '@/components/Header';
import StatsBar from '@/components/StatsBar';
import MapSection from '@/components/MapSection';
import BottomModules from '@/components/BottomModules';
import Footer from '@/components/Footer';

export default function Home() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>('ancient-1');
  const [layers, setLayers] = useState({
    ancient: true,
    modern: true,
    red: true,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StatsBar />
      <MapSection
        selectedPoint={selectedPoint}
        setSelectedPoint={setSelectedPoint}
        layers={layers}
        setLayers={setLayers}
      />
      <BottomModules />
      <Footer />
    </div>
  );
}
