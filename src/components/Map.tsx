import React, { useEffect, useState } from 'react';

// ESRI / ArcGIS imports
import '@arcgis/core/assets/esri/themes/light/main.css';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer.js";
import { SimpleLineSymbol } from '@arcgis/core/symbols';

import Widget from './Widget';

interface TreatmentCode {
  name: string;
  code: string;
}

interface MapConfig {
  name: string;
  url: string;
  field: string;
  classBreakInfos: Array<{
    label: string;
    minValue: number;
    maxValue: number;
    symbol: { type: string; color: string; width: string };
  }>;
  uniqueValueInfos: Array<{
    value: string;
    label: string;
    symbol: SimpleLineSymbol;
  }>;
  defaultSymbol: { type: string; color: string; width: string };
}

const streetCenterlinesMap: MapConfig = {
  name: 'streetCenterlinesMap',
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
  uniqueValueInfos: [],
  defaultSymbol: {
    type: 'simple-line',
    color: 'gray',
    width: '2px',
  },
};

const treatmentMap: MapConfig = {
  name: 'treatmentMap',
  url: 'https://gis.horrocks.com/arcgis/rest/services/PavementDemo_MIL1/FeatureServer/1',
  field: 'Recommended_Treatment_Code',
  classBreakInfos: [],
  uniqueValueInfos: [
    {
      label: 'Crack Seal (R1)',
      value: 'R1',
      symbol: {
        type: 'simple-line',
        color: 'red',
        width: '2px',
      },
    },
    {
      label: 'FDR (0)',
      value: '0',
      symbol: {
        type: 'simple-line',
        color: 'blue',
        width: '2px',
      },
    },
    {
      label: 'HA5 (R2)',
      value: 'R2',
      symbol: {
        type: 'simple-line',
        color: 'green',
        width: '2px',
      },
    },
    {
      label: 'Crack Seal (R3)',
      value: 'R3',
      symbol: {
        type: 'simple-line',
        color: 'purple',
        width: '2px',
      },
    },
    {
      label: 'Crack Seal & Slurry Seal (R4)',
      value: 'R4',
      symbol: {
        type: 'simple-line',
        color: 'orange',
        width: '2px',
      },
    },
    {
      label: 'Mill & Fill (R5)',
      value: 'R5',
      symbol: {
        type: 'simple-line',
        color: 'pink',
        width: '2px',
      },
    },
    {
      label: 'HA5 (R6)',
      value: 'R6',
      symbol: {
        type: 'simple-line',
        color: 'brown',
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
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [treatmentCodes, setTreatmentCodes] = useState<TreatmentCode[]>([]);
  const [selectedTreatmentCode, setSelectedTreatmentCode] = useState<string>('');

  const handleSwitchChange = (checked: boolean) => {
    setIsSwitchOn(checked);
    const newMap = checked ? treatmentMap : streetCenterlinesMap;
    setCurrentMap(newMap);
  };

  const fetchTreatmentCodes = async (layer: FeatureLayer) => {
    try {
      await layer.load();
  
      const field = layer.fields.find(f => f.name === 'Recommended_Treatment_Code');

      console.log('Field:', field);
  
      if (field && field.domain) {
        // Extract both name and code
        const codes = field.domain.codedValues.map(cv => ({
          code: cv.code,
          name: cv.name
        }));
        setTreatmentCodes(codes);
      }
    } catch (error) {
      console.error('Error fetching treatment codes:', error);
    }
  };
  
  const applyParserFilter = () => {
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

  const applyDropdownChange = (selectedTreatmentCode: string) => {
    setSelectedTreatmentCode(selectedTreatmentCode);
    applyTreatmentFilter(selectedTreatmentCode); // Call the filter function
  };

  const applyTreatmentFilter = (selectedValue: string) => {
    if (featureLayer) {
      console.log('Applying renderer with selectedValue:', selectedValue);
  
      // If "Show All" is selected, use an empty uniqueValueInfos array to show all options
      if (selectedValue === 'Show All') {
        const updatedRenderer = new UniqueValueRenderer({
          field: currentMap.field,
          uniqueValueInfos: currentMap.uniqueValueInfos,
          defaultSymbol: currentMap.defaultSymbol,
        });
  
        featureLayer.renderer = updatedRenderer;
      } else {
        const selectedUniqueValueInfo = currentMap.uniqueValueInfos.find(
          info => info.value === selectedValue
        );
  
        if (selectedUniqueValueInfo) {
          const updatedRenderer = new UniqueValueRenderer({
            field: currentMap.field,
            uniqueValueInfos: [selectedUniqueValueInfo],
            defaultSymbol: currentMap.defaultSymbol, // Symbol for unmatched values (optional)
          });
  
          featureLayer.renderer = updatedRenderer;
        } 
      }
    }
  };
  

  const createRendererAndFeatureLayer = (currentMapConfig: MapConfig): FeatureLayer => {
    let renderer;

  if (currentMapConfig.classBreakInfos.length > 0) {
    renderer = new ClassBreaksRenderer({
      field: currentMapConfig.field,
      classBreakInfos: currentMapConfig.classBreakInfos,
      defaultSymbol: currentMapConfig.defaultSymbol,
    });
  } else if (currentMapConfig.uniqueValueInfos.length > 0) {
    renderer = new UniqueValueRenderer({
      field: currentMapConfig.field,
      uniqueValueInfos: currentMapConfig.uniqueValueInfos,
      defaultSymbol: currentMapConfig.defaultSymbol,
    });
  } else {
    throw new Error('No renderer configuration found in mapConfig.');
  }

  return new FeatureLayer({
    url: currentMapConfig.url,
    renderer: renderer,
  });
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

    view.map.add(layer);

    if (currentMap.name === 'treatmentMap') {
      fetchTreatmentCodes(layer);
    }

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
        onApplyClick={() => applyParserFilter()}
        isSwitchOn={isSwitchOn}
        handleSwitchChange={handleSwitchChange}
        treatmentCodes={treatmentCodes}
        onTreatmentSelection={(value) => applyDropdownChange(value)}
      />
    </div>
  );
};

export default MapComponent;
