import React, { useEffect, useState } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';

import Widget from './Widget';

interface MapConfig {
  url: string;
  field: string;
  classBreakInfos: Array<{
    label: string;
    minValue: number;
    maxValue: number;
    symbol: { type: string; color: string; width: string };
  }>;
  defaultSymbol: { type: string; color: string; width: string };
}

// Define the initial map configuration
const streetCenterlinesMap: MapConfig = {
  url: 'https://gis.horrocks.com/arcgis/rest/services/PavementDemo_MIL1/FeatureServer/0',
  field: 'CURRENT_PASER',
  classBreakInfos: [
    {
      label: '1.0-1.99 (Very Poor)',
      maxValue: 1.99,
      minValue: 1.0,
      symbol: {
        type: 'simple-line',
        color: '#6E0000', // Dark Red
        width: '2px',
      },
    },
    {
      label: '2.0-2.99 (Poor)',
      maxValue: 2.99,
      minValue: 2.0,
      symbol: {
        type: 'simple-line',
        color: '#8B0000', // Red
        width: '2px',
      },
    },
    {
      label: '3.0-3.99 (Fair)',
      maxValue: 3.99,
      minValue: 3.0,
      symbol: {
        type: 'simple-line',
        color: '#B22222', // Firebrick
        width: '2px',
      },
    },
    {
      label: '4.0-4.99 (Average)',
      maxValue: 4.99,
      minValue: 4.0,
      symbol: {
        type: 'simple-line',
        color: '#CD5C5C', // Indian Red
        width: '2px',
      },
    },
    {
      label: '5.0-5.99 (Good)',
      maxValue: 5.99,
      minValue: 5.0,
      symbol: {
        type: 'simple-line',
        color: '#F08080', // Light Coral
        width: '2px',
      },
    },
    {
      label: '6.0-6.99 (Very Good)',
      maxValue: 6.99,
      minValue: 6.0,
      symbol: {
        type: 'simple-line',
        color: '#9ACD32', // Yellow Green
        width: '2px',
      },
    },
    {
      label: '7.0-7.99 (Excellent)',
      maxValue: 7.99,
      minValue: 7.0,
      symbol: {
        type: 'simple-line',
        color: '#6B8E23', // Olive Drab
        width: '2px',
      },
    },
    {
      label: '8.0-8.99 (Outstanding)',
      maxValue: 8.99,
      minValue: 8.0,
      symbol: {
        type: 'simple-line',
        color: '#228B22', // Forest Green
        width: '2px',
      },
    },
    {
      label: '9.0-10.0 (Exceptional)',
      maxValue: 10.0,
      minValue: 9.0,
      symbol: {
        type: 'simple-line',
        color: '#006400', // Dark Green
        width: '2px',
      },
    },
  ],
  defaultSymbol: {
    type: 'simple-line',
    color: 'gray',
    width: '2px',
  },
};

const MapComponent: React.FC = () => {
  const [currentMap, setCurrentMap] = useState<MapConfig>(streetCenterlinesMap);
  const [minValue, setMinValue] = useState<number>(1);
  const [maxValue, setMaxValue] = useState<number>(10);
  const [featureLayer, setFeatureLayer] = useState<FeatureLayer | null>(null);
  const [isSwitchOn, setSwitch] = useState<boolean>(false);
  const [treatmentCodes, setTreatmentCodes] = useState<string[]>([]);
  
  const applyRenderer = () => {
    if (featureLayer) {
      console.log('Applying renderer with minValue:', minValue, 'and maxValue:', maxValue);
      
      const updatedClassBreakInfos = currentMap.classBreakInfos.filter(info => 
        (minValue === undefined || info.maxValue >= minValue) && 
        (maxValue === undefined || info.minValue <= maxValue)
      );

      
      const updatedRenderer = new ClassBreaksRenderer({
        field: currentMap.field,
        classBreakInfos: updatedClassBreakInfos,
        defaultSymbol: currentMap.defaultSymbol,
      });

      featureLayer.renderer = updatedRenderer;
    }
  };

  const createRendererAndFeatureLayer = (mapConfig: MapConfig): FeatureLayer => {
    const renderer = new ClassBreaksRenderer({
      field: mapConfig.field,
      classBreakInfos: mapConfig.classBreakInfos,
      defaultSymbol: mapConfig.defaultSymbol
    });

    const featureLayer = new FeatureLayer({
      url: mapConfig.url,
      renderer: renderer,
    });

    return featureLayer;
  }

  // Initial Rendering of map
  useEffect(() => {
    const map = new Map({
      basemap: 'streets'
    });

    const layer = createRendererAndFeatureLayer(currentMap);

    setFeatureLayer(layer);

    const view = new MapView({
      container: 'mapViewDiv',
      map: map,
      center: [-111.576820, 40.136589],
      zoom: 14,
    });

    map.add(layer);

    // Cleanup on component unmount
    return () => {
      view.destroy();
    };
  }, [currentMap]);

  return (
    <div id="mapViewDiv" style={{ height: '100vh', width: '100vw' }}>
      <Widget
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        onClick={() => applyRenderer()} // Apply renderer when button is clicked
        isSwitchOn={isSwitchOn}
        setSwitch={setSwitch}
        treatmentCodes={treatmentCodes} // Pass down the treatment codes
      />
    </div>
  );
};

export default MapComponent;
